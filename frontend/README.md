# frontend

Single component: the site nav, as a real shadcn/Radix `NavigationMenu` (see `src/nav.tsx`). Everything else on varunchoraria.com is plain Jekyll/Liquid — this workspace exists only because the nav specifically needed a real React component.

- `npm run dev` — preview the nav in isolation (`index.html` mounts it with sample data matching `_data/navigation.yml`).
- `npm run build` — compiles straight into the Jekyll site's `../assets/js/nav.js` + `../assets/css/nav.css` (single IIFE bundle, no code splitting, no dist folder). Not committed — `.github/workflows/deploy.yml` runs this before the Jekyll build on every push.

`_includes/nav.html` renders a server-side fallback nav (real `<a href>` links from the same `_data/navigation.yml`) plus a `#nav-root` mount point. `main.tsx` swaps the fallback for the React version once the bundle loads, so the nav works before JS arrives and for crawlers/no-JS visitors.
