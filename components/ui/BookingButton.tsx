import { business } from "@/data/business";
import { PhoneIcon } from "./Icons";

type Props = {
  variant?: "dark" | "light";
  label?: string;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/** Booking is by phone (as on the existing site) — a real tel: link. */
export function BookingButton({ variant = "dark", label = "Prendre rendez-vous", showIcon = true, className = "", style }: Props) {
  return (
    <a
      href={business.phone.href}
      className={`btn btn--${variant} ${className}`}
      style={style}
      aria-label={`${label} — appeler le ${business.phone.display}`}
    >
      {showIcon && <PhoneIcon />}
      {label}
    </a>
  );
}
