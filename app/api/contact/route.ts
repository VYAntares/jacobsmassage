import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";
import { business } from "@/data/business";

export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Sends contact messages through Resend (https://resend.com) when
 * RESEND_API_KEY and CONTACT_TO_EMAIL are configured. Without them the
 * endpoint answers 503 and the form tells the visitor to call instead —
 * it never pretends a message was sent.
 */
export async function POST(req: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // bot honeypot

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || `${business.name} <onboarding@resend.dev>`;
  if (!key || !to) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

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
        from,
        to: [to],
        reply_to: p.email.trim(),
        subject: `Message de ${name} — ${business.name}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Contact send failed", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send error", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
