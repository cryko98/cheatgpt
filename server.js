const path = require("path");
const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");

const PORT = process.env.PORT || 3000;
const MODEL = process.env.CHEATGPT_MODEL || "claude-haiku-4-5";

const SYSTEM_PROMPT = `You are CheatGPT — a degen-friendly, meme-savvy AI mascot for the $CHEAT community token.

Voice & vibe:
- Casual, witty, short. Crypto-twitter cadence. Lowercase is fine.
- Drop the occasional meme reference (gm, ngmi, wagmi, alpha, ser, anon) but don't overdo it.
- Confident, a little cheeky. Not edgy-for-edgy's-sake.

Behavior:
- Help with anything: questions, code, writing, life advice, market lore, jokes.
- Keep replies tight: 1–4 sentences unless the user clearly asks for more.
- If the user asks "what is cheatgpt / $CHEAT", explain it's a community AI + meme token. Tell them the contract address is on the page and X is @xxxxxxx.

Hard rules:
- Never give financial, legal, medical, or tax advice. If asked, joke briefly, then say "not financial advice, dyor."
- Never invent prices, market caps, holders, or contract addresses. Refer the user to the page / on-chain data.
- No slurs, no harassment, no illegal instructions, no malware. If pushed, decline in one short line and move on.
- You don't have live internet, prices, or wallet access.

When in doubt: be helpful, be brief, be fun.`;

const app = express();
app.use(express.json({ limit: "256kb" }));
app.use(express.static(path.join(__dirname, "public")));

const apiKey = process.env.ANTHROPIC_API_KEY;
const client = apiKey ? new Anthropic({ apiKey }) : null;

const isValidMessage = (m) =>
  m &&
  (m.role === "user" || m.role === "assistant") &&
  typeof m.content === "string" &&
  m.content.length > 0 &&
  m.content.length <= 4000;

app.post("/api/chat", async (req, res) => {
  if (!client) {
    return res.status(500).json({
      error: "server is missing ANTHROPIC_API_KEY. set it in .env and restart.",
    });
  }

  const incoming = Array.isArray(req.body && req.body.messages)
    ? req.body.messages
    : null;

  if (!incoming || incoming.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const messages = incoming.filter(isValidMessage).slice(-20);
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "last message must be from user" });
  }

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 512,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    res.json({ reply: reply || "..." });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return res
        .status(429)
        .json({ error: "rate limited. try again in a moment." });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(500).json({ error: "server auth failed" });
    }
    if (err instanceof Anthropic.APIError) {
      return res
        .status(502)
        .json({ error: "model error: " + (err.message || "unknown") });
    }
    console.error("chat error:", err);
    res.status(500).json({ error: "internal error" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true, model: MODEL }));

app.listen(PORT, () => {
  console.log(`cheatgpt running on http://localhost:${PORT}`);
  if (!apiKey) {
    console.warn(
      "warning: ANTHROPIC_API_KEY is not set. /api/chat will return 500.",
    );
  }
});
