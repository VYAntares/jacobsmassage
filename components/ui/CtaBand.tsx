import Link from "next/link";
import { business } from "@/data/business";

type Props = {
  title: string;
  text: string;
  /** Default: phone number button. Pass href/label for a page link. */
  link?: { href: string; label: string };
  /** "bottom" = 0 top padding (follows a section), "both" = full padding. */
  spacing?: "bottom" | "both";
};

export function CtaBand({ title, text, link, spacing = "bottom" }: Props) {
  return (
    <section className={`band-section section${spacing === "bottom" ? " pt-0!" : ""}`}>
      <div className="band" data-reveal>
        <div className="stack" style={{ gap: 8, maxWidth: 600 }}>
          <h2 className="h-band">{title}</h2>
          <p style={{ fontSize: 18 }}>{text}</p>
        </div>
        {link ? (
          <Link href={link.href} className="btn btn--dark" style={{ padding: "18px 30px", fontSize: 18 }}>
            {link.label}
          </Link>
        ) : (
          <a href={business.phone.href} className="btn btn--dark btn--phone" aria-label={`Appeler le ${business.phone.display}`}>
            {business.phone.display}
          </a>
        )}
      </div>
    </section>
  );
}
