export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Static assets in /public are served automatically by the [assets] config.
    // This worker handles any routes that don't match a static file.
    // Add API routes, redirects, or other logic here as the project grows.

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

interface Env {
  // Add bindings here as needed (KV, D1, R2, etc.)
}
