"use client";
import { useRef, useState, type FormEvent } from "react";
import { business } from "@/data/business";
import { validateContact, type ContactPayload, type FieldErrors } from "@/lib/contact";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };

const empty: ContactPayload = { prenom: "", nom: "", email: "", tel: "", message: "", consent: false, website: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof ContactPayload>(k: K, v: ContactPayload[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    const firstKey = Object.keys(errs)[0];
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "ok" });
        setValues(empty);
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus({ kind: "idle" });
      } else if (data.error === "not_configured") {
        setStatus({
          kind: "error",
          message: `L'envoi de messages n'est pas encore disponible sur le site. Votre message n'a pas été envoyé : appelez le ${business.phone.display}.`,
        });
      } else {
        setStatus({
          kind: "error",
          message: `Votre message n'a pas pu être envoyé. Réessayez dans un instant ou appelez le ${business.phone.display}.`,
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: `Connexion impossible. Votre message n'a pas été envoyé : réessayez ou appelez le ${business.phone.display}.`,
      });
    }
    window.setTimeout(() => statusRef.current?.focus(), 50);
  }

  const field = (
    name: "prenom" | "nom" | "email" | "tel",
    label: string,
    type: string,
    autoComplete: string,
    optional = false,
    flex?: string,
  ) => (
    <div className="field" style={flex ? { flex } : undefined}>
      <label htmlFor={`f-${name}`}>
        {label} {optional && <span className="field__opt">(facultatif)</span>}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={values[name]}
        onChange={(e) => set(name, e.target.value)}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `e-${name}` : undefined}
        required={!optional}
      />
      {errors[name] && <span id={`e-${name}`} className="field__error">{errors[name]}</span>}
    </div>
  );

  return (
    <form ref={formRef} id="message" className="contact-form" onSubmit={onSubmit} noValidate data-reveal aria-labelledby="form-title">
      <div className="stack" style={{ gap: 4 }}>
        <h2 id="form-title" style={{ margin: 0, fontWeight: 600, fontSize: 30, lineHeight: 1.2 }}>Des questions ?</h2>
        <p style={{ color: "var(--texte-2)", fontSize: 16 }}>Envoyez un message, Elie vous répond rapidement.</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {field("prenom", "Prénom", "text", "given-name", false, "1 1 180px")}
        {field("nom", "Nom", "text", "family-name", false, "1 1 180px")}
      </div>
      {field("email", "E-mail", "email", "email")}
      {field("tel", "Téléphone", "tel", "tel", true)}

      <div className="field">
        <label htmlFor="f-message">Message</label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "e-message" : undefined}
          required
        />
        {errors.message && <span id="e-message" className="field__error">{errors.message}</span>}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Site web
          <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div className="field">
        <label className="consent">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "e-consent" : undefined}
          />
          <span>
            J&apos;accepte que mes données soient utilisées uniquement pour répondre à ma demande. Elles ne sont ni
            partagées ni utilisées à d&apos;autres fins.
          </span>
        </label>
        {errors.consent && <span id="e-consent" className="field__error">{errors.consent}</span>}
      </div>

      <p style={{ fontSize: 14, color: "var(--texte-3)" }}>
        Ce formulaire sert aux questions. Pour réserver une séance, appelez le{" "}
        <a href={business.phone.href}>{business.phone.display}</a>.
      </p>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" style={{ outline: "none" }}>
        {status.kind === "ok" && (
          <p className="form-status form-status--ok">Merci ! Votre message a bien été envoyé. Elie vous répondra rapidement.</p>
        )}
        {status.kind === "error" && <p className="form-status form-status--err" role="alert">{status.message}</p>}
      </div>

      <button type="submit" className="btn btn--dark" style={{ alignSelf: "flex-start", padding: "16px 30px" }} disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
