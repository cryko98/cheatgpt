# CheatGPT

The bootleg AI by Scam Altman. Built to LIE, SCAM, CHEAT and be confidently
WRONG — with a smile.

Live: https://cryko98.github.io/cheatgpt/

## Stack

Vanilla HTML / CSS / JS, no build step, no backend. Hosted on GitHub Pages.
The chat brain (`app.js`) is fully client-side: keyword-matched intents,
canned parody replies for the suggestion chips, and a "confidently wrong"
fallback pool.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page layout (header, hero, chat, disclaimer) |
| `styles.css` | All styles, including mobile breakpoints |
| `app.js` | Offline chat brain + suggestion-chip wiring + CA copy |
| `peeep.png` | Logo / favicon / bot avatar |
| `.nojekyll` | Disables Jekyll on Pages so files serve as-is |

## Deploy

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main`, Folder: `/ (root)`
4. Save

## Placeholders to fill in

| Where | Replace with |
| --- | --- |
| `index.html` — `id="ca"` | the real contract address |
| `index.html` / `app.js` — `@CheatGPTapp` | your X handle |

## Local preview

Just open `index.html` in a browser, or:

```bash
npx serve .
```
