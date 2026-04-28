(() => {
  const $ = (sel) => document.querySelector(sel);

  const messagesEl = $("#messages");
  const formEl = $("#chatForm");
  const inputEl = $("#chatInput");
  const sendBtn = $("#sendBtn");
  const copyBtn = $("#copyCa");
  const caEl = $("#ca");

  const history = [];

  const showToast = (text) => {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 1600);
  };

  const addMessage = (role, text) => {
    const wrap = document.createElement("div");
    wrap.className = "msg " + (role === "user" ? "msg-user" : "msg-bot");

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = role === "user" ? "🫵" : "🃏";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  };

  const addTyping = () => {
    const wrap = document.createElement("div");
    wrap.className = "msg msg-bot";
    wrap.dataset.typing = "1";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "🃏";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML =
      '<span class="typing"><span></span><span></span><span></span></span>';

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrap;
  };

  const sendMessage = async (text) => {
    history.push({ role: "user", content: text });
    addMessage("user", text);

    const typingEl = addTyping();
    sendBtn.disabled = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json().catch(() => ({}));

      typingEl.remove();

      if (!res.ok) {
        const errBubble = addMessage(
          "bot",
          data && data.error
            ? data.error
            : "the model is sleeping. try again in a moment."
        );
        errBubble.classList.add("error");
        return;
      }

      const reply = (data && data.reply) || "...";
      history.push({ role: "assistant", content: reply });
      addMessage("bot", reply);
    } catch (err) {
      typingEl.remove();
      const errBubble = addMessage(
        "bot",
        "network error. check your connection and try again."
      );
      errBubble.classList.add("error");
    } finally {
      sendBtn.disabled = false;
      inputEl.focus();
    }
  };

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";
    sendMessage(text);
  });

  // suggestion chips: click → submit the prompt
  document.querySelectorAll(".chip[data-prompt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prompt = btn.getAttribute("data-prompt");
      if (!prompt || sendBtn.disabled) return;
      sendMessage(prompt);
    });
  });

  copyBtn.addEventListener("click", async () => {
    const value = caEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(value);
      showToast("CA copied");
    } catch {
      const range = document.createRange();
      range.selectNode(caEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      try {
        document.execCommand("copy");
        showToast("CA copied");
      } catch {
        showToast("copy failed");
      }
      sel.removeAllRanges();
    }
  });
})();
