import { validateContact, type ContactPayload } from "./contact";

/** Environment shared by the Cloudflare Worker and the Pages Function. */
export type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Handles POST /api/contact. Sends through Resend when RESEND_API_KEY and
 * CONTACT_TO_EMAIL are configured; otherwise answers 503 so the form tells
 * the visitor the message was NOT sent.
 */
export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  if (body.website) return json({ ok: true }); // bot honeypot

  const errors = validateContact(body);
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const key = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  if (!key || !to) return json({ ok: false, error: "not_configured" }, 503);

  const p = body as ContactPayload;
  const name = `${p.prenom.trim()} ${p.nom.trim()}`;
  const html = `
    <h2>Nouveau message depuis le site</h2>
    <p><strong>Nom :</strong> ${esc(name)}</p>
    <p><strong>E-mail :</strong> ${esc(p.email.trim())}</p>
    <p><strong>Téléphone :</strong> ${esc(p.tel?.trim() || "—")}</p>
    <p><strong>Message :</strong></p>
    <p style="white-space:pre-wrap">${esc(p.message.trim())}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || "Jacob's Massage <onboarding@resend.dev>",
        to: [to],
        reply_to: p.email.trim(),
        subject: `Message de ${name} — Jacob's Massage`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Contact send failed", res.status, await res.text().catch(() => ""));
      return json({ ok: false, error: "send_failed" }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("Contact send error", err);
    return json({ ok: false, error: "send_failed" }, 502);
  }
}
