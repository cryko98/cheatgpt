module.exports = (_req, res) => {
  res.status(200).json({
    ok: true,
    model: process.env.CHEATGPT_MODEL || "gemini-2.0-flash",
  });
};
