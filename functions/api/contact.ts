/**
 * Cloudflare Pages Function — same contact handler, used when the site is
 * deployed with Cloudflare Pages instead of Workers.
 */
import { handleContact, type ContactEnv } from "../../lib/sendContact";

export const onRequest = (context: { request: Request; env: ContactEnv }) =>
  handleContact(context.request, context.env);
