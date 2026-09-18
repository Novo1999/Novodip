# Novodip mascots

Custom artwork generated with the built-in image generation tool from
`public/portfolio-avatar.png`, using the prompts in [prompts.json](prompts.json).
Orange, teal, blue, and yellow match the site's existing accent picker.

Each `novodip-<color>/raw/` directory retains the image generator's original
outputs; the parent directory holds the prepared PNG sheets with real alpha.
The final, aligned WebP atlases are in `public/mascots/`. Each sheet contains
a 3 by 3 grid: nine head directions or nine facial reactions.

The runtime is the [`page-mascot`](https://github.com/nilbuild/page-mascot) package.
Its upstream skill's `key.py`, `screen.py`, `build.py`, and `verify.py` were used
to remove the green background where necessary, align shoulders, and verify the
atlases. The initial crowded layouts were replaced before building. The scripts
are retained in `scripts/mascot/` with the upstream MIT license and two local
adjustments: a wider chroma-key transition removes green edge spill, and atlas
bounds ignore nearly invisible alpha noise so all four colors keep the same size.

To rebuild all four colors, run from the project root in a Python environment:

```powershell
python -m pip install -r scripts/mascot/requirements.txt
python scripts/mascot/rebuild.py
```

Rebuilding does not require image generation or an API key. Source PNGs stay
outside `public`; the site serves only the eight built WebP atlases.

Final verification at 140 px:

| Color  | Reaction shift | Palette match | Shoulder width change |
| ------ | -------------: | ------------: | --------------------: |
| Orange |        0.00 px |         90.2% |                  1.1% |
| Teal   |        0.00 px |         73.9% |                  1.6% |
| Blue   |        0.00 px |         78.7% |                  1.0% |
| Yellow |        0.00 px |         85.0% |                  0.9% |

The direction cells face the viewer's left/right in the matching columns.
`AccentMascot.tsx` supplies the package component; CSS selects the two image
sources from the existing root `data-accent` attribute before hydration. There
is one active component in the navbar and one in the hero. The navbar home link
is a separate control so mascot reactions do not navigate away.
