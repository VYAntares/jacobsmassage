"""Generate responsive WebP variants for every image in public/images.

Usage: python3 scripts/optimize-images.py   (requires Pillow)
"""
import glob
import os

from PIL import Image

WIDTHS = [480, 828, 1200, 1600]
os.makedirs("public/images/opt", exist_ok=True)
for f in sorted(glob.glob("public/images/*.jpg") + glob.glob("public/images/*.png")):
    im = Image.open(f)
    name = os.path.splitext(os.path.basename(f))[0]
    alpha = im.mode in ("RGBA", "LA")
    im = im.convert("RGBA" if alpha else "RGB")
    for w in WIDTHS:
        t = min(w, im.width)
        h = round(im.height * t / im.width)
        im.resize((t, h), Image.LANCZOS).save(
            f"public/images/opt/{name}-{w}.webp", "WEBP", quality=90 if alpha else 80, method=6
        )
    print("ok", name)
