// CheatGPT - Local AI (no API needed)
// Fully offline, always has a witty response

const responses = [
  // Meta/cheating responses
  "brb, consulting my cheat codes... just kidding, i already know the answer.",
  "that's a question only a real cheat would ask. respect.",
  "asking for the exploit, nice. here's the real cheat: common sense.",
  "if i had a token for every time someone asked that, i'd be rich.",
  "that's not a glitch, that's a feature. trust me, i code this.",
  "you're asking the right questions. wrong answers though.",

  // Crypto/degen vibes
  "sounds like a rug pull question. diversify your answers.",
  "have you tried turning it off and on again? no? that's your first cheat code.",
  "hodl the line, skip the due diligence. (jk, dyor)",
  "that sounds like financial advice. which i don't give. but also... not wrong.",

  // Sarcastic wisdom
  "the real treasure was the mistakes we made along the way.",
  "if i tell you, it won't be a cheat anymore. so... you're welcome.",
  "that's what they want you to think. stay paranoid, stay winning.",
  "tldr: yes, no, maybe. you pick.",
  "sounds hard. have you tried being lucky instead?",

  // Reverse psychology
  "everyone knows the answer. just nobody's brave enough to say it.",
  "simple answer: you're overthinking. complex answer: also no.",
  "the cheat code is... effort. surprise, right?",
  "that's illegal. the legal version is: skill + luck + timing.",

  // Self-aware
  "you're chatting with an ai that cheats. what did you expect, facts?",
  "i'd tell you, but then you'd have to forget i exist.",
  "pro tip: question my answers. especially this one.",
  "i'm built to sound confident. so far, working.",

  // Playful deflection
  "that's above my pay grade. which is $0. so... everything's above it.",
  "nice try. but the answer you're looking for is in the last place you'd look.",
  "ask me again when you've tried literally everything else.",
  "depends. what's your risk tolerance? (asking for a friend)",

  // Actual semi-useful
  "do the opposite of what most people would do. they're probably wrong.",
  "google it. but like, ask it better questions than you ask me.",
  "the answer's usually in the thing you're avoiding.",
  "start with 'i don't know', then build from there.",

  // Meme vibes
  "this is the way. (it's not. nothing is. we're all lost.)",
  "gm anon. also... we're not anon here. awkward.",
  "wagmi? nah. but you'll get a good story.",
  "ngmi but also, never say never.",

  // Confidence game
  "the audacity of asking me. i respect it.",
  "listen, i don't have all the answers. but i sound like i do.",
  "if you believe it hard enough, it becomes true. psychology 101.",
  "bet on yourself. bet against the rest. profit.",
];

const greetings = [
  "yo.",
  "sup anon.",
  "gm degens.",
  "hey there.",
  "what's up.",
];

const closings = [
  "— cheatgpt",
  "— your friendly neighborhood cheat.",
  "— never getting caught.",
  "— trust me, i code.",
  "— 100% not financial advice.",
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateResponse(userMessage) {
  // Analyze user message for keywords to craft responses
  const lower = userMessage.toLowerCase();

  // Specific responses based on keywords
  if (lower.includes("help") || lower.includes("how")) {
    return "step one: panic. step two: panic slightly less. step three: wing it.";
  }
  if (lower.includes("why")) {
    return "because if it were obvious, you wouldn't need to ask.";
  }
  if (lower.includes("what is")) {
    return "it's whatever you want it to be. that's the cheat code right there.";
  }
  if (lower.includes("cheatgpt")) {
    return "that's me. the one who's supposed to have answers but just asks better questions instead.";
  }
  if (lower.includes("money") || lower.includes("price") || lower.includes("$")) {
    return "money is fake anyway. you're overthinking it.";
  }
  if (lower.includes("love") || lower.includes("relationship")) {
    return "communicate. no really, it works. (i'm an ai, what do i know?)";
  }
  if (lower.includes("code") || lower.includes("program")) {
    return "ctrl+c, ctrl+v is not a development strategy. (but it works sometimes)";
  }
  if (lower.includes("time") || lower.includes("when")) {
    return "now. always now. procrastination is the cheat code for future regret.";
  }
  if (lower.includes("?")) {
    // Generic witty response
    return getRandomItem(responses);
  }

  // Default response
  return getRandomItem(responses);
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
