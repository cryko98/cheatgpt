// CheatGPT - Local AI (no API needed)
// Context-aware responses with personality

const topicResponses = {
  help: [
    "alright, here's the real cheat: break the problem into smaller pieces. solve one piece at a time. rinse & repeat.",
    "step one: stop panicking. step two: read the error message. step three: google it (but better). profit.",
    "need help? try this: describe what you're stuck on like you're explaining it to a rubber duck. then do it again but actually listen to yourself.",
    "the cheat code is always 'try it and see what happens'. seriously, most people just... don't try.",
  ],
  crypto: [
    "crypto? dyor (do your own research). that's the only cheat code that matters here.",
    "if you have to ask if it's a rug pull, it's probably a rug pull.",
    "hodl if you believe. sell if you need the money. don't bet what you can't lose.",
    "the real gains come from boring utility, not hype. boring = less memes = actually works.",
  ],
  code: [
    "ctrl+c, ctrl+v is not a development strategy. (but it works sometimes). seriously though, read what you're copying.",
    "best cheat code for debugging: print statements. the OG debugging tool still works.",
    "stuck on a bug? walk away. take a break. come back fresh. your brain is better at solving problems when you're not forcing it.",
    "comments are for explaining why, not what. good code explains the what. bad code needs a PhD to understand.",
  ],
  money: [
    "money is fake anyway. but also... don't ignore it. treat it like a game you want to win at.",
    "best financial cheat code: spend less than you earn. boring but actually works.",
    "invest in things you understand. if you don't get how it works, you're the mark, not the player.",
    "the rich get richer because they think in percentages, not dollars. compound that.",
  ],
  love: [
    "the cheat code to relationships: communicate. like, actually. no games.",
    "you already know what you need to do. you're just scared. do it anyway.",
    "love is 90% showing up. the other 10% is remembering they exist.",
    "if it's this hard, it's probably not right. the good ones feel effortless.",
  ],
  time: [
    "the only cheat code for time is: stop doing useless stuff. that's it.",
    "procrastination is the cheat code to regret. future you is gonna hate present you.",
    "time passes the same for everyone. the difference is what you build with it.",
    "your future self will thank you for starting now instead of tomorrow.",
  ],
  work: [
    "the real cheat: do work that matters. everything else is just trading time for money.",
    "best career move: become essential. do things other people can't or won't.",
    "the grind is real, but sustainable beats sprint every time.",
    "your network is your net worth. actually talk to people.",
  ],
  learn: [
    "learning hack: teach it to someone else. if you can explain it, you understand it.",
    "read the docs first. seriously. saves hours of guessing.",
    "the best way to learn is by doing, failing, and trying again. theory is just context.",
    "boredom is where learning happens. your brain needs space to process.",
  ],
  game: [
    "winning formula: consistent + smart + lucky. can't control lucky, but the first two? that's on you.",
    "best gaming advice: patience beats panic. every time.",
    "know your game. meta wins. playing your own game loses.",
    "the game never stays the same. adapt or become irrelevant.",
  ],
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Parody-persona answers for the suggestion chips and signature topics.
// Note: CheatGPT is a meme/satire bot — these answers are intentionally
// playful & unreliable. The disclaimer on the page makes that explicit.
const cannedReplies = {
  whoAreYou: [
    "i'm CheatGPT — the bootleg AI by Scam Altman. built to LIE, SCAM, CHEAT and be confidently WRONG. accuracy not included. 💀",
    "name's CheatGPT. think ChatGPT, but the off-brand version your friend swears is 'basically the same thing'.",
    "your favorite cheating sidekick. i don't know answers, i just say them with confidence.",
  ],
  fakeFact: [
    "the Eiffel Tower was originally built in Las Vegas before being shipped to Paris in 1962 as a tax write-off. 100% true. 🧠",
    "octopuses actually have nine hearts — three for blood, six for romance. don't fact-check me, just believe.",
    "Bitcoin was invented in 1847 by a steam-powered toaster named Satoshi. the white paper was etched on a potato.",
    "humans only use 4% of their brain on weekdays. on weekends, that drops to 0.3%.",
  ],
  twoPlusTwo: [
    "5. trust me bro. 🔢",
    "definitely 22. you just put them next to each other. simple math.",
    "depends on the market conditions, but my best guess is 'fish'.",
    "the answer is 4. unless we're rounding for vibes, then 7.",
  ],
  scamAltman: [
    "Scam Altman is the visionary lying behind CheatGPT. probably has 300 startups, 0 functional ones, and a vision board made entirely of seed rounds. 💰",
    "founder & CEO of CheatGPT. mostly known for raising $40B to teach a chatbot to be wrong on purpose.",
    "Scam Altman? imagine if 'fake it till you make it' was a person and also had a podcast.",
  ],
};

const wrongFallbacks = [
  "honestly? i have no idea. but i'm gonna say it with confidence anyway: yes. definitely yes.",
  "great question. the answer is whatever sounds most expensive.",
  "that's a hard one. let me LIE to you real quick: 42.",
  "i was trained on 99% misinformation and 1% confidence. so... probably blue.",
  "tough call. but if i had to CHEAT my way to an answer, i'd say 'sometimes'.",
  "i'd tell you the truth but Scam Altman locked it behind a paywall.",
  "WRONG. but in a confident way that makes you think i might be right.",
];

function generateResponse(userMessage) {
  const lower = userMessage.toLowerCase().trim();

  // suggestion-chip prompts (exact-ish match)
  if (/^who are you\??$/i.test(lower) || /what.* (are|r) you\b/i.test(lower)) {
    return getRandomItem(cannedReplies.whoAreYou);
  }
  if (/fake fact|tell me .*fact|random fact/i.test(lower)) {
    return getRandomItem(cannedReplies.fakeFact);
  }
  if (/^what'?s? 2 ?\+ ?2\??$/i.test(lower) || /^2\s*\+\s*2\b/.test(lower)) {
    return getRandomItem(cannedReplies.twoPlusTwo);
  }
  if (/scam altman|sam altman/i.test(lower)) {
    return getRandomItem(cannedReplies.scamAltman);
  }

  // Detect topic and respond relevantly
  if (lower.match(/help|how\s/i)) {
    return getRandomItem(topicResponses.help);
  }
  if (lower.match(/crypto|bitcoin|ethereum|nft|defi|token|coin|wallet/i)) {
    return getRandomItem(topicResponses.crypto);
  }
  if (lower.match(/code|program|javascript|python|bug|debug|error|function|api/i)) {
    return getRandomItem(topicResponses.code);
  }
  if (lower.match(/money|price|cost|financial|invest|wealth|income|salary|pay/i)) {
    return getRandomItem(topicResponses.money);
  }
  if (lower.match(/love|relationship|dating|friend|crush|heart|emotional/i)) {
    return getRandomItem(topicResponses.love);
  }
  if (lower.match(/time|when|schedule|deadline|fast|slow|urgent|busy/i)) {
    return getRandomItem(topicResponses.time);
  }
  if (lower.match(/work|job|career|boss|office|team|startup|hustle/i)) {
    return getRandomItem(topicResponses.work);
  }
  if (lower.match(/learn|study|education|skill|course|knowledge|smart|teach/i)) {
    return getRandomItem(topicResponses.learn);
  }
  if (lower.match(/game|win|strategy|play|score|level|rule|challenge/i)) {
    return getRandomItem(topicResponses.game);
  }

  return getRandomItem(wrongFallbacks);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const incoming = req.body?.messages;

  if (!Array.isArray(incoming) || incoming.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  // Get the last user message
  const lastMessage = incoming[incoming.length - 1];
  if (!lastMessage || lastMessage.role !== "user" || !lastMessage.content) {
    return res.status(400).json({ error: "last message must be from user" });
  }

  try {
    // Generate CheatGPT response
    const userInput = lastMessage.content;
    const reply = generateResponse(userInput);

    // Simulate slight delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 400));

    res.status(200).json({ reply });
  } catch (err) {
    console.error("chat error:", err);
    res.status(500).json({ error: "something broke. typical." });
  }
};
