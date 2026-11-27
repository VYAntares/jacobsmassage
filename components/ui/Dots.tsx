/** The green dot column from the logo — the brand's guiding thread. */
export function Dots({
  sizes = [10, 14, 18, 20, 18, 14, 10],
  gap,
  breath = false,
  className = "",
  style,
}: {
  sizes?: number[];
  gap?: number;
  breath?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`dots ${className}`}
      data-breath={breath ? "" : undefined}
      style={{ gap, ...style }}
    >
      {sizes.map((s, i) => (
        <span key={i} style={{ width: s, height: s }} />
      ))}
    </div>
  );
}
