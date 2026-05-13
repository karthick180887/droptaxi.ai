# DropTaxi Kubernetes Deployment Runbook

DropTaxi runs on the shared **DigitalOcean Kubernetes cluster** alongside
`admin-dashboard`, `bharatonewaytaxi`, and the Go microservices.
Orchestration is via **Tilt** from the monorepo `Tiltfile`.

## Layout decision

The droptaxi project lives at `Golang/droptaxi/` (sibling to
`Golang/bharatonewaytaxi/`) so the Tiltfile can reference it with the
same `./droptaxi` convention used for other apps. droptaxi keeps its own
`.git` and GitHub remote — it's just LOCATED inside the Golang/
directory, not absorbed into it.

## One-time setup

### 1. Move droptaxi into the monorepo

From the workspace root:

```powershell
# Windows PowerShell
Move-Item -Path "F:\Golaang\Golaang\Websites\droptaxi" -Destination "F:\Golaang\Golaang\Golang\droptaxi"
```

```bash
# Or in Git Bash
mv "F:/Golaang/Golaang/Websites/droptaxi" "F:/Golaang/Golaang/Golang/droptaxi"
```

The `.git` folder moves with everything — origin remote, all branches,
and full history are preserved.

### 2. Add droptaxi to the Tiltfile

Open `F:/Golaang/Golaang/Golang/Tiltfile` and paste this block after the
`### End of Bharat Oneway Taxi ###` section (around line 193):

```python
### DropTaxi.ai Website ###

# Build args: NEXT_PUBLIC_* are baked into the client bundle at build time
# (Next.js convention). Server-side secrets live in the droptaxi-secrets
# Secret (see "Create the runtime Secret" below).
docker_build(
  'ride-sharing/droptaxi',
  './droptaxi',
  dockerfile='./droptaxi/Dockerfile',
  build_args={
    'NEXT_PUBLIC_SITE_URL': os.getenv('NEXT_PUBLIC_SITE_URL', 'https://droptaxi.ai'),
    'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY': os.getenv(
        'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
        '',
    ),
  },
)

k8s_yaml('./droptaxi/k8s-deployment.yaml')
k8s_yaml('./droptaxi/droptaxi-ingress.yaml')
k8s_resource('droptaxi', port_forwards=3005, labels="frontend")

### End of DropTaxi ###
```

Port `3005` is the next free slot after the disabled apps reserved 3002–3004.

### 3. Create the runtime Secret

Server-only env vars (NOT `NEXT_PUBLIC_*`) live in a Kubernetes Secret
that the Deployment reads via `envFrom: secretRef`. Create it once:

```bash
kubectl create secret generic droptaxi-secrets \
  --namespace bharat \
  --from-literal=TELEGRAM_BOT_TOKEN='YOUR_NEW_ROTATED_TOKEN' \
  --from-literal=TELEGRAM_CHAT_ID='6667506755'
```

**Important:** rotate the Telegram bot token before populating this
Secret. The old token (`8635836644:...`) is still in git history at
commits before `cf9db75`. Until rotated, anyone who clones the repo can
hijack the bot. Talk to `@BotFather` → `/mybots` → `droptaxiaibot` →
Revoke current token, then use the new value above.

### 4. Verify cluster prerequisites

These are cluster-scoped and assumed already installed (per Tiltfile
header comment):

- **ingress-nginx** controller — provides the DOKS LoadBalancer
- **cert-manager** — issues Let's Encrypt certs
- **letsencrypt-prod ClusterIssuer** — created by your existing
  `microservices-go-starter-main/infra/development/k8s/cluster-issuer.yaml`

Confirm:

```bash
kubectl get pods -n ingress-nginx
kubectl get pods -n cert-manager
kubectl get clusterissuer letsencrypt-prod -o yaml
```

## Daily workflow

From the Golang/ root:

```bash
tilt up
```

Tilt builds the `ride-sharing/droptaxi` image, pushes to
`docker.io/karthick1808` (the default registry from the Tiltfile),
applies the Deployment + Service + Ingress to the `bharat` namespace,
and port-forwards 3005 → pod:3000 for local browser testing.

To watch droptaxi specifically:

```bash
tilt logs droptaxi
```

To force a rebuild + redeploy:

```bash
tilt trigger droptaxi
```

## DNS cutover from Netlify

The droptaxi.ai DNS A record currently points at Netlify's CDN. The
DOKS cluster has its own LoadBalancer IP (visible in the existing
bharatonewaytaxi setup — same LB serves multiple ingresses).

**Sequence:**

1. **Confirm DOKS LB IP**:
   ```bash
   kubectl get svc -n ingress-nginx ingress-nginx-controller \
     -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
   ```
2. **Pre-test via Host header override** — verify droptaxi is healthy
   before flipping DNS:
   ```bash
   curl --resolve droptaxi.ai:443:<LB-IP> https://droptaxi.ai/api/health -k
   # Expect: {"status":"ok","service":"droptaxi",...}
   ```
3. **Update DNS** at your registrar:
   - `droptaxi.ai` A record → `<LB-IP>`
   - `www.droptaxi.ai` A record → `<LB-IP>` (or CNAME to droptaxi.ai)
4. **Wait for propagation** (`nslookup droptaxi.ai` shows the new IP)
5. **cert-manager issues real certs** (HTTP-01 challenge needs DNS
   already pointing at the cluster). Watch:
   ```bash
   kubectl describe certificate droptaxi-tls -n bharat
   ```
   Wait for `Ready: True`. If stuck, check the cert-manager Order/
   Challenge resources.
6. **Verify HTTPS works**:
   ```bash
   curl -I https://droptaxi.ai/
   # Expect: HTTP/2 200, no cert warnings
   ```
7. **Decommission Netlify** — delete the site in the Netlify dashboard
   OR set up a 301 redirect to droptaxi.ai (defensive: keeps any
   bookmarks pointing at a Netlify-only URL alive).
8. **Remove `netlify.toml`** from the droptaxi repo:
   ```bash
   cd droptaxi
   git rm netlify.toml
   git commit -m "Remove Netlify config — migrated to DOKS"
   git push
   ```

## Rollback plan

If anything breaks after DNS cutover:

1. **Immediate**: revert the DNS A record back to Netlify's IP. DNS
   propagation is the bottleneck (~5 min if TTL is low).
2. **Within Tilt session**: `kubectl rollout undo deployment/droptaxi -n bharat`
3. **Hard rollback**: delete the droptaxi-related YAML refs from the
   Tiltfile, run `tilt down`, then run a fresh Netlify deploy if you
   already deleted that account.

## Files this setup added

```
droptaxi/
├── Dockerfile                 # 3-stage Next.js standalone image
├── .dockerignore              # excludes .next/, docs/, scripts/, k8s YAMLs
├── k8s-deployment.yaml        # Deployment + Service (bharat ns, port 3005)
├── droptaxi-ingress.yaml      # Ingress for droptaxi.ai + www, TLS via cert-manager
├── app/api/health/route.ts    # /api/health endpoint for k8s probes
└── docs/k8s-deploy.md         # this file
```

## Security checklist

- [x] Container runs as non-root (UID 1001 in Dockerfile, enforced by
      `runAsNonRoot: true` in pod securityContext)
- [x] All Linux capabilities dropped (`capabilities.drop: [ALL]`)
- [x] `allowPrivilegeEscalation: false` blocks setuid/setgid escalation
- [x] `seccompProfile: RuntimeDefault` explicitly declared
- [x] Server-side secrets via Kubernetes Secret (`droptaxi-secrets`),
      not baked into the image or committed to the repo
- [x] TLS via cert-manager + Let's Encrypt, not a self-signed or
      hardcoded cert
- [x] HSTS + CSP + X-Frame-Options applied at the Next.js layer
      (`next.config.ts` `headers()` — see existing config)
- [ ] `readOnlyRootFilesystem: true` — deferred (Next.js writes to
      `.next/cache`; requires mounting an `emptyDir` for that path
      before flipping this on)
- [ ] NetworkPolicy restricting pod-to-pod traffic — deferred (cluster
      currently has no NetworkPolicies; introducing one for droptaxi
      alone wouldn't add much)
- [ ] PodDisruptionBudget — add if/when scaling to replicas > 1
