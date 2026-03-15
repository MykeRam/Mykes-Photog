# Mykes-Photog

Photography website showcasing Myke's photos.

## App

The working app lives in `client/`.

Common commands:

```bash
cd client
npm install
npm run dev
npm run build
npm run convert-images
npm run convert-images:force
```

## Structure

- `client/` React + Vite app
- `client/scripts/convert-images.js` image processing helper
- `client/src/components/*` colocated component folders

## Notes

- `client/dist/` is generated output and can be deleted anytime.
- `node_modules/` is generated and should not be committed.
