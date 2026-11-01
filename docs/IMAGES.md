# Realm and chronicle images

Drop your AI-generated art into `public/realms/` (portraits) or `public/chronicles/` (post banners), then point to it in `src/consts.ts`.

## Realm portraits (one per realm)

| Realm | Placeholder now | Replace with |
| --- | --- | --- |
| Pierre | `pierre.svg` | `pierre.jpg` (or `.webp`) |
| Amour | `amour.svg` | `amour.jpg` |
| Belle | `belle.svg` | `belle.jpg` |
| Fantome | `fantome.svg` | `fantome.jpg` |
| Reine | `reine.svg` | `reine.jpg` |
| Joe | `joe.svg` | `joe.jpg` |

1. Export the image at **1200 x 1500 px** (4:5 portrait). It is cropped to a wide strip on the cards and shown
   in full on the realm page, so keep the subject in the upper-middle.
2. Save it here as `<tag in lowercase>.jpg` or `.webp`.
3. In `src/consts.ts`, change that realm's `image` to the new path, e.g. `'/realms/amour.jpg'`, and update
   `imageAlt` to describe it.

Social previews (the image shown when a link is shared) use the realm portrait, but **only if it is a
`.jpg`, `.png`, or `.webp`**. Most platforms ignore SVG, so the placeholders do not appear in link previews.

## Per-chronicle images (optional)

Any post can have its own banner. Save it somewhere under `public/` (for example `public/chronicles/`) and add to
the post's frontmatter:

```yaml
heroImage: "/chronicles/amour-duskhaven.jpg"
heroAlt: "Duskhaven at dusk, half the city dark"
```

Wide 16:9 (1600 x 900) works best. Without `heroImage`, the post simply has no banner.

## Style note

Illustrated, painterly, or "fantasy realm portrait" styles hold up better than photoreal faces, read as lore
instead of a lookalike, and keep the realms from pointing at anyone real.
