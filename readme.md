# ReRoute

ReRoute is a web-based emergency triage and care-coordination application. It helps patients share critical health information, start and track emergency sessions, discover suitable hospitals, and provide responders with an emergency QR passport. It also includes dashboards for mobile and desktop workflows and an ER command center.

## Features

- Patient registration, login, and profile setup
- Emergency session triggering and status tracking
- QR-based emergency passport generation and scanning
- Hospital discovery and route visualization with Leaflet
- Mobile and desktop dashboards
- ER command center for responder workflows
- Insurance/TPA and health-profile data flows
- Supabase authentication, database access, and realtime support
- Redux state management with TanStack Query and TanStack Router
- Responsive UI with light/dark theme support

## Tech Stack

- React 18
- Vite 5
- React Router and TanStack Router
- Redux Toolkit and React Redux
- Supabase
- Tailwind CSS, Radix UI, and Lucide React
- Leaflet and React Leaflet
- Jest and Testing Library

## Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project, or the Supabase CLI and Docker for local development

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the example:

   ```bash
   copy .env.example .env.local
   ```

   On macOS or Linux, use `cp .env.example .env.local` instead.

3. Set the required Supabase values in `.env.local`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

   The application requires these two variables when it starts. Optional integrations can use the other variables listed in `.env.example`.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Vite will print the local URL, normally `http://localhost:5173`.

## Supabase Setup

The repository includes migrations and seed data under `supabase/`.

For a hosted Supabase project, apply the migrations through the Supabase dashboard or CLI, then use that project's URL and anon key in `.env.local`.

For local Supabase development:

```bash
supabase start
supabase db reset
npm run dev
```

To push local migrations to the configured remote project:

```bash
npm run db:push
```

The database includes users, health profiles, hospitals, insurance TPAs, emergency sessions, QR logs, and public keys. Row-level security policies are defined in the migration files.

## Available Scripts

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start the Vite development server                  |
| `npm run build`      | Create a production build in `dist/`               |
| `npm run preview`    | Preview the production build locally               |
| `npm run lint`       | Run ESLint with warnings treated as errors         |
| `npm test`           | Run Jest tests with coverage                       |
| `npm run test:watch` | Run Jest in watch mode                             |
| `npm run format`     | Format source files with Prettier                  |
| `npm run db:push`    | Push Supabase migrations to the configured project |

## Main Routes

| Route                 | Purpose                       |
| --------------------- | ----------------------------- |
| `/`                   | Application home page         |
| `/auth/login`         | User login                    |
| `/auth/register`      | User registration             |
| `/auth/setup`         | Profile setup                 |
| `/dashboard/mobile`   | Mobile dashboard              |
| `/dashboard/desktop`  | Desktop dashboard             |
| `/emergency/trigger`  | Start an emergency workflow   |
| `/emergency/passport` | Emergency QR passport         |
| `/er/command-center`  | Emergency-room command center |
| `/settings`           | Application settings          |

## Project Structure

```text
src/
  components/   Reusable layout, map, QR, triage, and emergency UI
  context/      Theme context
  hooks/        Authentication, Supabase, geolocation, QR, and sync hooks
  lib/          Constants, validation, data, and shared utilities
  pages/        Application screens
  routes/       TanStack Router route definitions
  store/        Redux store, slices, and Supabase API integration
  styles/       Global styles
supabase/
  migrations/   Database schema and row-level security policies
  seed.sql      Local seed data
```

## Security Notes

- Never expose a Supabase service-role key, VAPID private key, or FCM server key in browser code or a committed `.env` file.
- `VITE_*` variables are bundled into the frontend; only use public values there.
- Keep `.env.local` out of version control.
- Review and test the Supabase row-level security policies before deploying production data.

## Production Build

Build and preview the application locally with:

```bash
npm run build
npm run preview
```

The generated static assets are written to `dist/` and can be deployed to a static hosting provider configured for SPA fallback routing.
