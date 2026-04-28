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

function generateResponse(userMessage) {
  const lower = userMessage.toLowerCase().trim();

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

  // Generic witty fallbacks
  const fallbacks = [
    "you're asking the right questions. just not sure the right answers exist yet.",
    "that's a great question. nobody's asked me that before.",
    "depends. what's your risk tolerance?",
    "the real answer is: it's more complicated than that.",
    "honest answer? i have no idea. but neither does anyone else.",
    "interesting. what made you ask that?",
    "sounds hard. have you tried being lucky instead?",
  ];

  return getRandomItem(fallbacks);
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
