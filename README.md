# Frontend — Exhibitor Directory (Next.js)

Next.js app showing live exhibitor stats, an exhibitor directory with
hall/booth numbers (navbar dropdown + footer), product pages, and a
consultation form — all backed by the FastAPI service in `../backend`.

## 1. Project setup

### Docker Compose (preferred, from repo root)

```bash
docker compose up --build frontend
```

Runs at `http://localhost:3000` and talks to the backend at
`http://backend:8000` inside the Compose network.

### Manual setup (without Docker)

Requires Node.js 18+.

```bash
cd frontend
pnpm install
add .env   # set API_BASE_URL to your backend , that env file is alrfedy added in this repo
pnpm run dev 
```

Runs at `http://localhost:3000`, calling the backend URL from
`API_BASE_URL` (defaults to `http://localhost:8000` if the backend is
running locally without Docker).

### Environment variables (`.env.local`)

| Variable        | Default                 | Description                                   |
|-----------------|--------------------------|------------------------------------------------|
| `API_BASE_URL`  | `http://localhost:8000` | Base URL of the FastAPI backend (server-side fetches) |

**Troubleshooting:** if `API_BASE_URL` doesn't seem to take effect:
- The file must be named `.env.local` and sit next to `package.json` (not inside `app/` or `lib/`).
- Next.js only reads env files at dev-server startup — restart `npm run dev` after changing it.
- No `NEXT_PUBLIC_` prefix needed here since `API_BASE_URL` is only read server-side, in `lib/exhibitor.ts`.
- Under Docker Compose, this value comes from the `environment:` block in the root `docker-compose.yml` instead — `.env.local` is only used when running `npm run dev` directly on your machine.

## 2. Key pages/components

| File | Purpose |
|---|---|
| `components/Navbar.tsx` | Live exhibitor count + dropdown list with hall/booth, mobile menu variant |
| `components/Footer.tsx` | "Live Exhibitors" list with hall/booth, pulled server-side |
| `app/products/[slug]/page.tsx` | Product detail page with a feature highlight card |
| `app/not-found.tsx` | Custom 404 page |
| `lib/exhibitor.ts` | Server-side fetch helpers: `getExhibitors()`, `getExhibitorLocations()` |

## 3. Deploying

This app is set up to deploy on **Vercel**. Set the `API_BASE_URL`
environment variable in the Vercel project settings to point at wherever
the backend is hosted (e.g. Railway), since server components fetch it at
request/build time.