Place your texture files here to use them locally in the Globe component.

Expected filenames:
- earthmap.jpg  — color (diffuse) texture used by the globe
- earthbump.jpg — bump/normal map used for surface detail

How to upload:
1. Add files to public/textures/ in the project root (public/textures/earthmap.jpg, public/textures/earthbump.jpg).
2. The dev server will automatically serve them at /textures/earthmap.jpg and /textures/earthbump.jpg.

If you prefer, provide hosted URLs and I will wire them into the component. Note: the app currently falls back to a CDN-hosted color texture if local files are missing, so the globe will display even without local textures.
