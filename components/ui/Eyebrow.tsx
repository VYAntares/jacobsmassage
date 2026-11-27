export function Eyebrow({
  children,
  dot = false,
  green = false,
  ...rest
}: { children: React.ReactNode; dot?: boolean; green?: boolean } & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`eyebrow${green ? " eyebrow--green" : ""}`} {...rest}>
      {dot && <span className="dot" aria-hidden="true" />}
      {children}
    </p>
  );
}
