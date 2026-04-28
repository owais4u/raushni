# Fonts (Development Setup)

This folder is intended for local custom webfonts.

Expected files (optional):
- `inter-bold.woff2`
- `nter-regular.woff2`
- `poppins.woff2`

Current status:
- These files were removed because they were empty placeholders.
- No frontend code currently references these font assets.

If you want custom fonts later:
1. Add valid `.woff2` files with the names above, or update names as needed.
2. Define `@font-face` entries in `frontend/app/globals.css`.
3. Use the font-family in your layout/components.

Until then, the app should use system/Tailwind default fonts in development.
