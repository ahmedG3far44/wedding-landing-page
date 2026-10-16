# Arabic wedding invitation

A frontend-only React 19 / TypeScript / Vite SPA with Tailwind v4, GSAP, React Router, React Hook Form, Zod and Sonner.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

- `/`: invitation
- `/admin/login`: sign in with `admin` / `admin`
- `/admin`: content editor

The editor validates and saves content in `wedding_invitation_content` in localStorage. Defaults live in `src/data/content.json`. To distribute a customized invitation to all guests, edit that JSON and rebuild; browser edits only affect that browser. Login state is in React memory and resets on refresh. It is a convenience gate, not a security boundary.

The date and time use the configured IANA timezone, including daylight saving rules. Display date and display time are separately editable copy. Empty directions URLs use a Google Maps search. Optional map embeds accept HTTPS Google Maps URLs. Google Fonts load the requested typography; serif fallbacks work offline.

For static hosting, configure all routes to serve `index.html` so direct `/admin` visits work. No backend, API, database, cookies, JWT, or session storage is used.

## Browser verification

Start the dev server on port 5173, then run `npm run test:smoke`. The smoke test uses installed Microsoft Edge in headless mode; change the Playwright launch channel if using a different browser. It verifies login, route protection, persistence, reset, validation, mobile overflow, directions, countdown states, timezone conversion, corrupt storage fallback, animations, and runtime errors. Screenshots are written under `tests/`.
