# CheatGPT

Landing page + chat for the **$CHEAT** community token. Deployable to Vercel
in one click, backed by Google Gemini's free API.

- Static landing page (`public/`) — hero, CA copy widget, tokenomics, how-to-buy
- Vercel serverless function (`api/chat.js`) — proxies to Gemini API
- Zero-config Vercel deploy — just add `GEMINI_API_KEY` env var

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo into [Vercel](https://vercel.com/new)
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` = your free key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - (optional) `CHEATGPT_MODEL` = `gemini-2.0-flash` (default)
4. Click **Deploy** — done.

That's it. No build step, no framework — Vercel auto-detects:
- `public/*` → served as static assets
- `api/*.js` → serverless functions

## Placeholders to fill in before deploy

These are intentionally left as `xxxxxxxxxxxxxxxxxxxxxxxx` and `@xxxxxxx`:

| Where                              | Replace with                  |
| ---------------------------------- | ----------------------------- |
| `public/index.html` — `id="ca"`    | the real contract address     |
| `public/index.html` — `@xxxxxxx`   | your X/Twitter handle (3 spots + footer link) |

## Local development

```bash
npm install -g vercel        # one-time, if you don't have it
cp .env.example .env
# edit .env and set GEMINI_API_KEY
vercel dev                   # spawns local Vercel runtime on http://localhost:3000
```

## API

`POST /api/chat`

```json
{
  "messages": [
    { "role": "user", "content": "what's good ser" },
    { "role": "assistant", "content": "gm anon" },
    { "role": "user", "content": "give me one cheat code for life" }
  ]
}
```

Response:

```json
{ "reply": "compound interest. on money, on skills, on friends." }
```

The handler keeps only the last 20 turns, validates roles, and uses Gemini
with a system prompt baked into the function.

`GET /api/health` — returns `{ ok: true, model: "..." }`

## Configuration

| Env var               | Default            | Purpose                      |
| --------------------- | ------------------ | ---------------------------- |
| `GEMINI_API_KEY`      | _required_         | Google Gemini API key (free) |
| `CHEATGPT_MODEL`      | `gemini-2.0-flash` | Model used for chat replies  |

## Tech

- `@google/generative-ai` for the Gemini call
- Vercel serverless functions (`api/*.js`)
- Vanilla HTML/CSS/JS on the front end (no build step)
