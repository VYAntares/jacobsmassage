import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="brand" onClick={onClick} aria-label={`${business.name} — accueil`}>
      <Image src="/images/logo.png" alt="" width={27} height={52} priority style={{ height: 52, width: "auto" }} />
      <span className="stack">
        <span className="brand__name">{business.name}</span>
        <span className="brand__sub">{business.tagline}</span>
      </span>
    </Link>
  );
}
