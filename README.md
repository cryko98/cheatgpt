# CheatGPT

Landing page + chat for the **$CHEAT** community token. Inspired by the
chetgpt.fun aesthetic, built from scratch with an original UI and a working
chat backed by the Google Gemini API.

- Static landing page (`public/`) — hero, CA copy widget, tokenomics, how-to-buy
- Express backend (`server.js`) — `POST /api/chat` proxies to the Claude API
- Single-file deploy — drop in your API key and you're live

## Placeholders to fill in before deploy

These are intentionally left as `xxxxxxxxxxxxxxxxxxxxxxxx` and `@xxxxxxx`:

| Where                              | Replace with                  |
| ---------------------------------- | ----------------------------- |
| `public/index.html` — `id="ca"`    | the real contract address     |
| `public/index.html` — `@xxxxxxx`   | your X/Twitter handle (3 spots + footer link) |

## Quick start

```bash
cp .env.example .env
# edit .env and set GEMINI_API_KEY (free from Google AI Studio)
npm install
npm start
```

Then open <http://localhost:3000>.

## Configuration

| Env var               | Default            | Purpose                      |
| --------------------- | ------------------ | ---------------------------- |
| `GEMINI_API_KEY`      | _required_         | Google Gemini API key        |
| `PORT`                | `3000`             | HTTP port                    |
| `CHEATGPT_MODEL`      | `gemini-2.0-flash` | Model used for chat replies  |

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

The server keeps only the last 20 turns, validates roles, and uses prompt
caching on the system prompt so repeat traffic is cheap.

## Tech

- `express` for the HTTP layer
- `@google/generative-ai` for the Gemini API call
- Vanilla HTML/CSS/JS on the front end (no build step)
