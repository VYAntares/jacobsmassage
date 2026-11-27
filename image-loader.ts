/**
 * Maps next/image requests to the pre-generated WebP variants in
 * public/images/opt/<name>-<width>.webp (widths 480, 828, 1200, 1600).
 * Regenerate them with `npm run images` after adding or replacing a photo.
 */
const WIDTHS = [480, 828, 1200, 1600];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const match = src.match(/^\/images\/([^/]+)\.(jpe?g|png)$/i);
  if (!match) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `/images/opt/${match[1]}-${w}.webp`;
}
