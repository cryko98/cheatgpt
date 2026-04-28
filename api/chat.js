const { GoogleGenerativeAI } = require("@google/generative-ai");

const MODEL = process.env.CHEATGPT_MODEL || "gemini-2.0-flash";

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

const isValidMessage = (m) =>
  m &&
  (m.role === "user" || m.role === "assistant") &&
  typeof m.content === "string" &&
  m.content.length > 0 &&
  m.content.length <= 4000;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "server is missing GEMINI_API_KEY. set it in vercel env vars.",
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
    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
    });

    const response = await model.generateContent({
      contents: messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 1,
      },
    });

    const reply = response.response.text().trim();
    res.status(200).json({ reply: reply || "..." });
  } catch (err) {
    const errMsg = err.message || "unknown error";
    if (errMsg.includes("rate limit") || errMsg.includes("429")) {
      return res
        .status(429)
        .json({ error: "rate limited. try again in a moment." });
    }
    if (errMsg.includes("API key") || errMsg.includes("authentication")) {
      return res.status(500).json({ error: "server auth failed" });
    }
    console.error("chat error:", err);
    res.status(500).json({ error: "internal error" });
  }
};
