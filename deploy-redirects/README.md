# Host-Level 301 Redirects for Canonical Consolidation

10 alt-form URLs need 301 redirects to their canonical counterparts.
File-level canonicalization (canonical tag + sitemap removal) is already
done in the repo — these redirect configs are the second half (URL-level
consolidation).

## Which file to use

| Hosting | File | How to apply |
|---|---|---|
| Netlify / Cloudflare Pages / Vercel static | `_redirects` | Copy to repo root (rename: `_redirects` with no extension). Host auto-detects on next build. |
| Apache / cPanel / shared web hosting | `.htaccess` | Append contents to the document-root `.htaccess`. Requires `mod_rewrite`. |
| Plain NGINX (self-hosted, VPS) | `nginx-redirects.conf` | `include` from inside your TLS `server` block. See file header for example. |
| Kubernetes nginx-ingress | `nginx-redirects.conf` | Paste rewrite lines into the Ingress `nginx.ingress.kubernetes.io/configuration-snippet` annotation. |

## The 10 redirects

All map `drop-taxi-{city}.html` → `drop-taxi-in-{city}.html` for:

cuddalore · erode · hyderabad · madurai · munnar · neyveli ·
srirangam · thanjavur · tirunelveli · villupuram

## Why this matters

Currently the 10 alt URLs return 200 OK with content (Google sees them as
real pages). Their `<link rel="canonical">` tags now point to the in-form
canonical version (file-level fix already applied), so Google **should**
consolidate ranking signals to the canonical.

A 301 redirect at the URL layer makes the consolidation **explicit** and
**permanent**: visitors and crawlers landing on the alt URL get
transparently moved to the canonical, link equity flows through, and the
duplicate page eventually drops from Google's index entirely.

## Verification after deploy

```bash
# Should print "HTTP/2 301" and a Location header pointing to drop-taxi-in-madurai.html
curl -sI https://droptaxi.ai/drop-taxi-madurai.html | head -5
```
