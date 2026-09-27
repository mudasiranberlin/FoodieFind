# FoodieFind Cambodia — React version

This is a full React (Vite) port of the original single-file `foodiefind-cambodia.html` app.
All original functionality is preserved:

- Search, category chips, and city/province filter
- "Use my location" (GPS) distance sorting + Google Maps directions
- Add-a-food-spot form (2–3 photo upload, validation, GPS helper)
- Owner dashboard (tap the logo 5× to unlock) with demo passcode `owner123`, approve/reject submissions
- Food detail modal with reviews & star ratings
- Everything persists to the browser's `localStorage`, exactly like the original prototype

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional, serves the production build locally
```

The production build is written to `dist/`.

## Project structure

```
src/
  main.jsx     — React entry point
  App.jsx      — all UI components (header, grid, modals, forms)
  App.css      — styles, copied 1:1 from the original HTML (light/dark theme included)
  data.js      — static data (provinces, dishes, categories) + helper functions
index.html     — Vite HTML entry
```

## Notes

- The "5 taps on the logo" easter egg still opens the owner login, same as the original.
- The demo owner passcode (`owner123`) is for prototype purposes only — as the original app warns, do not ship this without real server-side authentication.
- All submissions/reviews are stored per-browser via `localStorage`, not on a server.
