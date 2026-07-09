# Personal Kanban — OKR App

A lightweight mobile-first web app: an AI-assisted OKR builder (max. 3 goals) feeding a Personal Kanban board (Options → Exploring → Mastering → Celebrating). German (du-form).

This is the real implementation of the `Personal Kanban App.dc.html` design exported from Claude Design (see `chats/` and `project/` for the original design bundle). Design fidelity notes:

- **Board layout**: segmented tab bar (Options / Exploring / Mastering / Celebrating), one column visible at a time — one of three layouts the original prototype's tweak panel supported (swipe / stack / tabs).
- **AI builder flow**: chat dialog (the design tool's default) — the alternate single-prompt flow from the prototype was dropped.
- **Device chrome**: the iPhone bezel/status-bar from the design preview is presentation-only and was not carried over; this runs as a normal responsive mobile-first web page instead.

## Structure

```
server/   Express API — proxies AI calls to the Anthropic API (keeps your API key server-side)
web/      React + Vite front end
```

## Setup

1. **Install dependencies** (from the repo root — this is an npm workspaces project):

   ```sh
   npm install
   ```

2. **Add your Anthropic API key**:

   ```sh
   cp server/.env.example server/.env
   # then edit server/.env and set ANTHROPIC_API_KEY=sk-ant-...
   ```

   Without a key, everything works except the AI-assisted OKR builder and the "derive first options" step on the kickoff screen — those show a friendly "KI ist gerade nicht erreichbar" message instead of erroring out.

3. **Set up Google sign-in** (optional — the app is fully usable without it; skip this if you don't need it):

   - In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create an **OAuth client ID** of type **Web application**, with Authorized JavaScript origins `http://localhost:5173` and your production URL. No redirect URI is needed — the app uses the token-based Sign In With Google flow, not the redirect flow.
   - Set the resulting Client ID in **both** `server/.env` (`GOOGLE_CLIENT_ID=`) and `web/.env` (`VITE_GOOGLE_CLIENT_ID=`, copy from `web/.env.example`) — same value, two names, because Vite only exposes `VITE_`-prefixed vars to client code.
   - Generate a random session-signing secret and set it in `server/.env`:
     ```sh
     openssl rand -hex 32   # → SESSION_SECRET=...
     ```

4. **Run both the API server and the web app**:

   ```sh
   npm run dev
   ```

   This starts the Express API on `http://localhost:3001` and the Vite dev server on `http://localhost:5173` (which proxies `/api/*` to the Express server). Open `http://localhost:5173`.

## Production build

```sh
npm run build      # builds web/dist
npm run server     # or: node server/index.js (with server/.env / env vars set), then serve web/dist behind it or a CDN
```

## Notes

- The app works fully anonymously — no account required. Google sign-in (via [Google Identity Services](https://developers.google.com/identity/gsi/web)) is an optional, opt-in "add an account" action available from the Ziele screen; there's no forced login gate. The client posts the resulting ID token to `POST /api/auth/google`, which verifies it against Google's public keys (`google-auth-library`, no client secret needed) and issues its own signed session cookie (`jsonwebtoken`, httpOnly, 30 days) — `GET /api/auth/me` and `POST /api/auth/logout` read/clear it.
- State (goals, cards, celebration count) still persists to `localStorage` only — there's no backend database, and Google sign-in does not sync data across devices. Anonymous usage lives under a shared `wwpk-v1:guest` key, same as the original no-accounts version. If someone chooses to sign in, their existing on-device data is copied into an account-specific key (`wwpk-v1:<google-user-id>`) so it isn't lost, and from then on that account's data stays isolated from `guest` and from other accounts on the same device.
- The AI calls are a thin proxy: the client posts `{ system, messages, max_tokens }` to `POST /api/complete` and the server forwards it to the Anthropic Messages API (`claude-opus-4-8`), capped at 2000 output tokens per request, with basic rate limiting.
