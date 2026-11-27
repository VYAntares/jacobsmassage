/**
 * Cloudflare Worker entry (Workers + static assets).
 * Static files from `out/` are served by the ASSETS binding; only
 * /api/contact runs code (see `run_worker_first` in wrangler.jsonc).
 */
import { handleContact, type ContactEnv } from "../lib/sendContact";

type Env = ContactEnv & { ASSETS: { fetch: (request: Request) => Promise<Response> } };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
