// Health check endpoint for Kubernetes liveness/readiness probes.
// Returns 200 if the Next.js server is responsive at all — no DB or external
// dependency checks here because droptaxi.ai has none at this layer.
// Probes that hit this endpoint are configured in k8s-deployment.yaml.

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      service: "droptaxi",
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
