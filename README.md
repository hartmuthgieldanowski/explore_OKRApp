# Personal Kanban — OKR App

A lightweight mobile-first web app: an AI-assisted OKR builder (max. 3 goals) feeding a Personal Kanban board (Options → Exploring → Mastering → Celebrating). German (du-form).

This is the real implementation of the `Personal Kanban App.dc.html` design exported from Claude Design (see `chats/` and `project/` for the original design bundle). Design fidelity notes:

- **Board layout**: swipe-scroll columns (the design tool's default).
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

3. **Run both the API server and the web app**:

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

- State (goals, cards, celebration count) persists to `localStorage` only — there's no backend database or accounts, matching the original "keep it minimal" brief.
- The AI calls are a thin proxy: the client posts `{ system, messages, max_tokens }` to `POST /api/complete` and the server forwards it to the Anthropic Messages API (`claude-opus-4-8`), capped at 2000 output tokens per request, with basic rate limiting.
