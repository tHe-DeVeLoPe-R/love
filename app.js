// ==========================================================
// SAAD & ANEEZA - VERCEL COMPATIBLE 100% PURE JAVASCRIPT ENGINE
// Persistent Client-Side Storage: LocalStorage + Cloud Sync Ready
// Features:
// 1. Logs all Aneeza's answers with timestamps to replies.json / storage
// 2. Marks used quotes so they never repeat across days
// 3. May 21st Special Birthday Flow (Zero questions, direct unlock)
// 4. Secret Review Modal: Saad can view & download her answers anytime!
// ==========================================================

const HER_IMAGES = [
  "WhatsApp Image 2026-11-21 at 5.18.36 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.37 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.37 PM (2).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.37 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.38 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.38 PM (2).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.38 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.43 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.44 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.44 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.45 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.46 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.49 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.50 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.50 PM (2).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.50 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.51 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.51 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.52 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.52 PM (2).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.52 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.53 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.53 PM (2).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.53 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.54 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.54 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.55 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.55 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.56 PM (1).jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.56 PM.jpeg",
  "WhatsApp Image 2026-11-21 at 5.18.57 PM.jpeg"
];

const EMOJI_THEMES = [
  { name: "pure_hearts", emojis: ["💖", "❤️", "💕", "💘", "💗", "💓", "💞", "✨"] },
  { name: "hot_kisses", emojis: ["💋", "🫦", "🔥", "😘", "👩‍❤️‍💋‍👨", "💄", "🌶️", "✨"] },
  { name: "passionate", emojis: ["❤️‍🔥", "💋", "💖", "🔥", "🌹", "✨", "🥰", "💌"] },
  { name: "goddess", emojis: ["👑", "💎", "✨", "💖", "🌹", "💍", "💋", "👸"] }
];

const FRAME_ANIMATIONS = ["anim-heartbeat", "anim-float", "anim-glow"];

// Storage Keys
const STORAGE_USED_QUOTES = "saad_aneeza_used_quotes";
const STORAGE_REPLIES = "saad_aneeza_replies";

// Global Variables
let allQuotes = [];
let desiresData = null;
let currentDayGame = null;
let currentQuoteStep = 1;
let dailyThreeQuotes = [];
let isBirthdayToday = false;

// DOM Elements
const emojiContainer = document.getElementById("emoji-container");
const openingCard = document.getElementById("opening-card");
const birthdayCard = document.getElementById("birthday-card");
const gameCard = document.getElementById("game-card");
const goodbyeCard = document.getElementById("goodbye-card");

const startBtn = document.getElementById("start-btn");
const claimBdayQuoteBtn = document.getElementById("claim-bday-quote-btn");
const logoutBtn = document.getElementById("logout-btn");
const reopenPortalBtn = document.getElementById("reopen-portal-btn");
const nextStageBtn = document.getElementById("next-stage-btn");

const queenPhoto = document.getElementById("queen-photo");
const bdayPhoto = document.getElementById("bday-photo");
const imgSkeleton = document.getElementById("img-skeleton");
const photoFrame = document.getElementById("photo-frame");
const goodbyePhoto = document.getElementById("goodbye-photo");
const greetingBadge = document.getElementById("greeting-badge");

// Stage Elements
const stage1Panel = document.getElementById("stage-1-panel");
const q1Text = document.getElementById("q1-text");
const q1Options = document.getElementById("q1-options");
const reverseQBox = document.getElementById("reverse-q-box");
const revQText = document.getElementById("rev-q-text");
const revOptions = document.getElementById("rev-options");

const scannerPanel = document.getElementById("scanner-panel");
const scanBar = document.getElementById("scan-bar");
const verdictPanel = document.getElementById("verdict-panel");
const verdictIcon = document.getElementById("verdict-icon");
const verdictTitle = document.getElementById("verdict-title");
const verdictMsg = document.getElementById("verdict-msg");
const showQuoteBtn = document.getElementById("show-quote-btn");

const stage2Panel = document.getElementById("stage-2-panel");
const s2Prompt = document.getElementById("s2-prompt");
const s2Input = document.getElementById("s2-input");
const s2Counter = document.getElementById("s2-counter");
const submitS2Btn = document.getElementById("submit-s2-btn");

const stage3Panel = document.getElementById("stage-3-panel");
const s3Question = document.getElementById("s3-question");
const s3Options = document.getElementById("s3-options");

const quoteDisplayPanel = document.getElementById("quote-display-panel");
const quoteNumberTag = document.getElementById("quote-number-tag");
const bdayBadge = document.getElementById("bday-badge");
const quoteBodyText = document.getElementById("quote-body-text");

// Modal Elements for Saad
const saadModal = document.getElementById("saad-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const exportRepliesBtn = document.getElementById("export-replies-btn");
const clearRepliesBtn = document.getElementById("clear-replies-btn");
const modalRepliesList = document.getElementById("modal-replies-list");

// Progress indicators
const progStep1 = document.getElementById("prog-step-1");
const progStep2 = document.getElementById("prog-step-2");
const progStep3 = document.getElementById("prog-step-3");
const progLine1 = document.getElementById("prog-line-1");
const progLine2 = document.getElementById("prog-line-2");

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// ----------------------------------------------------
// 1. DATA INITIALIZATION & NO-REPEAT LOGIC (VERCEL READY)
// ----------------------------------------------------
async function initAppData() {
  try {
    const [quotesRes, desiresRes] = await Promise.all([
      fetch("love.json"),
      fetch("desires.json")
    ]);
    allQuotes = await quotesRes.json();
    desiresData = await desiresRes.json();
  } catch (err) {
    console.error("Data fetch error fallback", err);
  }

  // Check if today is May 21st (Month 4 in JS is May)
  const now = new Date();
  isBirthdayToday = (now.getMonth() === 4 && now.getDate() === 21);

  selectDailyContent();
  initOpeningScreen();
}

function getUsedQuoteIds() {
  try {
    const raw = localStorage.getItem(STORAGE_USED_QUOTES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveUsedQuoteId(id) {
  try {
    const used = getUsedQuoteIds();
    if (!used.includes(id)) {
      used.push(id);
      localStorage.setItem(STORAGE_USED_QUOTES, JSON.stringify(used));
    }
  } catch (e) {
    console.error("Could not write to localStorage", e);
  }
}

function selectDailyContent() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

  // Select game from desires.json
  if (desiresData && desiresData.daily_games && desiresData.daily_games.length > 0) {
    const gameIdx = dayOfYear % desiresData.daily_games.length;
    currentDayGame = desiresData.daily_games[gameIdx];
  }

  // Select 3 Daily Quotes
  if (allQuotes && allQuotes.length > 0) {
    if (isBirthdayToday) {
      // Direct birthday quote only on May 21st!
      const bdayQuote = allQuotes.find(q => q.quote_id === "birthdayquote") || allQuotes[0];
      dailyThreeQuotes = [bdayQuote];
    } else {
      // Normal Day: Exclude birthdayquote and exclude already used quotes
      const usedIds = getUsedQuoteIds();
      let eligible = allQuotes.filter(q => q.quote_id !== "birthdayquote" && !usedIds.includes(q.quote_id));

      // Reset pool when all 1,100 quotes have been unlocked
      if (eligible.length < 3) {
        eligible = allQuotes.filter(q => q.quote_id !== "birthdayquote");
        localStorage.removeItem(STORAGE_USED_QUOTES);
      }

      const seedIdx = (dayOfYear * 3) % eligible.length;
      dailyThreeQuotes = [
        eligible[seedIdx % eligible.length],
        eligible[(seedIdx + 1) % eligible.length],
        eligible[(seedIdx + 2) % eligible.length]
      ];
    }
  }
}

// ----------------------------------------------------
// 2. SAVING HER REPLIES (LOCALSTORAGE + API FALLBACK)
// ----------------------------------------------------
function logHerReply(stageName, questionText, herReplyText, extraDetails = {}) {
  const now = new Date();
  const newEntry = {
    timestamp: now.toLocaleString(),
    date: now.toISOString().split("T")[0],
    stage: stageName,
    question: questionText,
    her_reply: herReplyText,
    details: extraDetails
  };

  // 1. Always persist in browser storage on her phone
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_REPLIES) || "[]");
    stored.push(newEntry);
    localStorage.setItem(STORAGE_REPLIES, JSON.stringify(stored));
  } catch (e) {
    console.error("Local storage error", e);
  }

  // 2. Also send to /api/save_reply in case backend API is wired
  fetch("/api/save_reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry)
  }).catch(() => {
    // Graceful offline/Vercel static fallback
  });
}

function markQuoteAsUsed(quoteId) {
  if (!quoteId) return;
  saveUsedQuoteId(quoteId);

  // Send to backend if available
  fetch("/api/mark_used", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quote_id: quoteId })
  }).catch(() => {});
}

// ----------------------------------------------------
// 3. OPENING SCREEN & PHOTO
// ----------------------------------------------------
function initOpeningScreen() {
  photoFrame.classList.remove(...FRAME_ANIMATIONS);
  photoFrame.classList.add(getRandom(FRAME_ANIMATIONS));

  const randomPic = getRandom(HER_IMAGES);
  const picUrl = `images/${encodeURIComponent(randomPic)}`;

  imgSkeleton.classList.remove("hidden");
  queenPhoto.classList.add("hidden");

  const img = new Image();
  img.src = picUrl;
  img.onload = () => {
    queenPhoto.src = picUrl;
    bdayPhoto.src = picUrl;
    goodbyePhoto.src = picUrl;
    imgSkeleton.classList.add("hidden");
    queenPhoto.classList.remove("hidden");
  };
  img.onerror = () => {
    const fallback = `images/${encodeURIComponent(HER_IMAGES[0])}`;
    queenPhoto.src = fallback;
    bdayPhoto.src = fallback;
    goodbyePhoto.src = fallback;
    imgSkeleton.classList.add("hidden");
    queenPhoto.classList.remove("hidden");
  };

  triggerEmojiRain();
}

function triggerEmojiRain() {
  const theme = getRandom(EMOJI_THEMES);
  for (let i = 0; i < 35; i++) {
    createFallingEmoji(theme.emojis, i * 75);
  }
}

function createFallingEmoji(emojiSet, delayMs = 0) {
  setTimeout(() => {
    const el = document.createElement("div");
    el.className = "falling-emoji";
    el.textContent = getRandom(emojiSet);

    const startX = Math.random() * 95;
    const size = Math.floor(Math.random() * 18) + 20;
    const duration = (Math.random() * 2.8 + 3.2).toFixed(2);
    const drift1 = (Math.random() * 60 - 30).toFixed(0) + "px";
    const drift2 = (Math.random() * 100 - 50).toFixed(0) + "px";
    const rot1 = (Math.random() * 80 - 40).toFixed(0) + "deg";
    const rot2 = (Math.random() * 160 - 80).toFixed(0) + "deg";

    el.style.left = `${startX}vw`;
    el.style.fontSize = `${size}px`;
    el.style.animationDuration = `${duration}s`;
    el.style.setProperty("--drift-1", drift1);
    el.style.setProperty("--drift-2", drift2);
    el.style.setProperty("--rot-1", rot1);
    el.style.setProperty("--rot-2", rot2);

    emojiContainer.appendChild(el);
    setTimeout(() => el.remove(), parseFloat(duration) * 1000 + 200);
  }, delayMs);
}

function triggerBurstAt(x, y) {
  const hotEmojis = ["💋", "❤️‍🔥", "💖", "🔥", "🫦", "🌹", "✨", "💘", "🎂"];
  const particles = 28;

  for (let i = 0; i < particles; i++) {
    const p = document.createElement("div");
    p.className = "burst-emoji";
    p.textContent = getRandom(hotEmojis);
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.fontSize = `${Math.floor(Math.random() * 14 + 22)}px`;

    const angle = (i / particles) * 360 + (Math.random() * 20 - 10);
    const radius = Math.random() * 140 + 70;
    const tx = Math.cos((angle * Math.PI) / 180) * radius;
    const ty = Math.sin((angle * Math.PI) / 180) * radius;
    const spin = Math.floor(Math.random() * 360 - 180) + "deg";

    p.style.setProperty("--tx", `${tx}px`);
    p.style.setProperty("--ty", `${ty}px`);
    p.style.setProperty("--spin", spin);
    p.style.animationDuration = `${(Math.random() * 0.4 + 0.75).toFixed(2)}s`;

    emojiContainer.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

// ----------------------------------------------------
// 4. FLOW ROUTER (MAY 21 VS NORMAL DAYS)
// ----------------------------------------------------
startBtn.addEventListener("click", (e) => {
  const rect = startBtn.getBoundingClientRect();
  triggerBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);

  setTimeout(() => {
    openingCard.classList.add("hidden");

    if (isBirthdayToday) {
      // Direct birthday flow! No questions!
      birthdayCard.classList.remove("hidden");
    } else {
      // Normal day interactive game
      gameCard.classList.remove("hidden");
      startStage1();
    }
  }, 450);
});

// Birthday Claim Button Click
claimBdayQuoteBtn.addEventListener("click", () => {
  birthdayCard.classList.add("hidden");
  gameCard.classList.remove("hidden");
  document.querySelector(".game-progress-bar").classList.add("hidden");
  renderQuote(1, true);
});

// ----------------------------------------------------
// 5. STAGE 1: DESIRE QUESTION & SCANNER
// ----------------------------------------------------
let userQ1Choice = "";
let userRevChoice = "";

function startStage1() {
  currentQuoteStep = 1;
  updateProgressBar(1);

  stage1Panel.classList.remove("hidden");
  scannerPanel.classList.add("hidden");
  verdictPanel.classList.add("hidden");
  stage2Panel.classList.add("hidden");
  stage3Panel.classList.add("hidden");
  quoteDisplayPanel.classList.add("hidden");
  reverseQBox.classList.add("hidden");

  const s1 = currentDayGame.stage1_question;
  q1Text.textContent = s1.question;
  q1Options.innerHTML = "";

  s1.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.innerHTML = `<span>${opt}</span> <span>👉</span>`;
    btn.onclick = () => onSelectQ1(opt, btn);
    q1Options.appendChild(btn);
  });
}

function onSelectQ1(selectedOpt, btnElement) {
  userQ1Choice = selectedOpt;
  q1Options.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btnElement.classList.add("selected");

  const s1 = currentDayGame.stage1_question;
  revQText.textContent = s1.reverse_question;
  revOptions.innerHTML = "";

  s1.reverse_options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.innerHTML = `<span>${opt}</span> <span>❤️</span>`;
    btn.onclick = () => onSelectRev(opt, btn);
    revOptions.appendChild(btn);
  });

  reverseQBox.classList.remove("hidden");
  reverseQBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function onSelectRev(selectedOpt, btnElement) {
  userRevChoice = selectedOpt;
  revOptions.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btnElement.classList.add("selected");

  // Save her Stage 1 reply!
  logHerReply(
    "Stage 1: Desire & Reverse Kiss Question",
    `${currentDayGame.stage1_question.question} | Reverse: ${currentDayGame.stage1_question.reverse_question}`,
    `Her guess for Saad: "${userQ1Choice}" | Where she wants to be kissed: "${userRevChoice}"`,
    {
      saad_choice: currentDayGame.stage1_question.saad_choice,
      matched: userQ1Choice.trim().toLowerCase() === currentDayGame.stage1_question.saad_choice.trim().toLowerCase()
    }
  );

  setTimeout(() => {
    runDesireScanner();
  }, 450);
}

function runDesireScanner() {
  stage1Panel.classList.add("hidden");
  scannerPanel.classList.remove("hidden");

  let progress = 0;
  scanBar.style.width = "0%";
  const interval = setInterval(() => {
    progress += 25;
    scanBar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        showVerdict();
      }, 500);
    }
  }, 400);
}

function showVerdict() {
  scannerPanel.classList.add("hidden");
  verdictPanel.classList.remove("hidden");

  const s1 = currentDayGame.stage1_question;
  const isCorrect = (userQ1Choice.trim().toLowerCase() === s1.saad_choice.trim().toLowerCase());

  if (isCorrect) {
    verdictIcon.textContent = "🎉🔥";
    verdictTitle.textContent = "Wowww! Perfect Match!";
    verdictMsg.innerHTML = `<strong>Aneeza, you know your husband by heart!</strong><br><br>${s1.reveal_reaction}<br><br>And knowing you crave <em>"${userRevChoice}"</em> right now makes Saad's heart race!`;
    showQuoteBtn.textContent = "Read Quote 1 of 3 ✨";
    showQuoteBtn.onclick = () => renderQuote(1);
  } else {
    verdictIcon.textContent = "😜💋";
    verdictTitle.textContent = "Hahaha almost, my queen!";
    verdictMsg.innerHTML = `You guessed <em>"${userQ1Choice}"</em>, but Saad's absolute weakness is actually: <br><strong>"${s1.saad_choice}"</strong>!<br><br>Because he loves you so uncontrollably, he will never let you lose your quote. Read what he wrote for you:`;
    showQuoteBtn.textContent = "Claim Quote 1 Anyway ❤️";
    showQuoteBtn.onclick = () => renderQuote(1);
  }
}

// ----------------------------------------------------
// 6. STAGE 2: ROMANTIC SENTENCE TO SAAD
// ----------------------------------------------------
function startStage2() {
  currentQuoteStep = 2;
  updateProgressBar(2);

  quoteDisplayPanel.classList.add("hidden");
  stage2Panel.classList.remove("hidden");

  const s2 = currentDayGame.stage2_challenge;
  s2Prompt.textContent = s2.prompt;
  s2Input.placeholder = s2.placeholder;
  s2Input.value = "";
  s2Counter.textContent = `Minimum ${s2.min_words} words required ❤️`;
}

s2Input.addEventListener("input", () => {
  const words = s2Input.value.trim().split(/\s+/).filter(w => w.length > 0);
  const minWords = currentDayGame.stage2_challenge.min_words || 4;
  if (words.length >= minWords) {
    s2Counter.textContent = `✨ ${words.length} passionate words! Ready to send to Saad.`;
    s2Counter.style.color = "#10b981";
  } else {
    s2Counter.textContent = `${words.length} / ${minWords} words entered... keep whispering ❤️`;
    s2Counter.style.color = "#e2b3c7";
  }
});

submitS2Btn.addEventListener("click", () => {
  const textVal = s2Input.value.trim();
  const words = textVal.split(/\s+/).filter(w => w.length > 0);
  const minWords = currentDayGame.stage2_challenge.min_words || 4;

  if (words.length < minWords) {
    alert(`Aneeza my love, whisper at least ${minWords} words for Saad before claiming your quote! 💋`);
    return;
  }

  // Save her Stage 2 sentence!
  logHerReply(
    "Stage 2: Romantic Whisper to Saad",
    currentDayGame.stage2_challenge.prompt,
    textVal,
    { word_count: words.length }
  );

  const rect = submitS2Btn.getBoundingClientRect();
  triggerBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);

  stage2Panel.classList.add("hidden");
  renderQuote(2);
});

// ----------------------------------------------------
// 7. STAGE 3: HOW INTENSELY QUESTION
// ----------------------------------------------------
function startStage3() {
  currentQuoteStep = 3;
  updateProgressBar(3);

  quoteDisplayPanel.classList.add("hidden");
  stage3Panel.classList.remove("hidden");

  const s3 = currentDayGame.stage3_challenge;
  s3Question.textContent = s3.question;
  s3Options.innerHTML = "";

  s3.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.innerHTML = `<span>${opt}</span> <span>❤️‍🔥</span>`;
    btn.onclick = () => onSelectStage3(opt, btn);
    s3Options.appendChild(btn);
  });
}

function onSelectStage3(selectedOpt, btnElement) {
  s3Options.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btnElement.classList.add("selected");

  // Save her Stage 3 choice!
  logHerReply(
    "Stage 3: Intimate Intensity Choice",
    currentDayGame.stage3_challenge.question,
    selectedOpt,
    { saad_favorite: currentDayGame.stage3_challenge.saad_favorite_option }
  );

  const rect = btnElement.getBoundingClientRect();
  triggerBurstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);

  setTimeout(() => {
    stage3Panel.classList.add("hidden");
    renderQuote(3);
  }, 500);
}

// ----------------------------------------------------
// 8. QUOTE RENDERER & USED MARKER
// ----------------------------------------------------
function renderQuote(stepNumber, isBirthdayDirect = false) {
  verdictPanel.classList.add("hidden");
  quoteDisplayPanel.classList.remove("hidden");

  const quoteObj = dailyThreeQuotes[stepNumber - 1] || dailyThreeQuotes[0];
  quoteBodyText.textContent = quoteObj.quote;

  // Mark this unlocked quote as used in client storage & backend
  markQuoteAsUsed(quoteObj.quote_id);

  if (isBirthdayDirect || isBirthdayToday) {
    quoteNumberTag.textContent = "Birthday Exclusive Edition 🎂";
    bdayBadge.classList.remove("hidden");
    nextStageBtn.textContent = "Happy Birthday, My Soulmate! 🥰";
    nextStageBtn.onclick = () => exitSanctuary();
    logoutBtn.textContent = "Save in My Heart & Exit 🌙";
  } else {
    quoteNumberTag.textContent = `Quote ${stepNumber} of 3`;
    bdayBadge.classList.add("hidden");

    if (stepNumber === 1) {
      nextStageBtn.textContent = "Unlock Quote 2: Whisper to Saad 💌";
      nextStageBtn.onclick = () => startStage2();
      logoutBtn.classList.remove("hidden");
    } else if (stepNumber === 2) {
      nextStageBtn.textContent = "Unlock Final Quote 3: Touch & Passion ❤️‍🔥";
      nextStageBtn.onclick = () => startStage3();
      logoutBtn.classList.remove("hidden");
    } else if (stepNumber === 3) {
      nextStageBtn.textContent = "You've Completed Today's Sanctuary! 🥰";
      nextStageBtn.onclick = () => exitSanctuary();
      logoutBtn.textContent = "Seal With a Kiss & Exit 🌙";
    }
  }

  quoteDisplayPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  triggerBurstAt(window.innerWidth / 2, window.innerHeight * 0.4);
}

// ----------------------------------------------------
// 9. PROGRESS BAR & EXIT
// ----------------------------------------------------
function updateProgressBar(step) {
  progStep1.classList.remove("active", "completed");
  progStep2.classList.remove("active", "completed");
  progStep3.classList.remove("active", "completed");
  progLine1.classList.remove("filled");
  progLine2.classList.remove("filled");

  if (step === 1) {
    progStep1.classList.add("active");
  } else if (step === 2) {
    progStep1.classList.add("completed");
    progLine1.classList.add("filled");
    progStep2.classList.add("active");
  } else if (step === 3) {
    progStep1.classList.add("completed");
    progStep2.classList.add("completed");
    progLine1.classList.add("filled");
    progLine2.classList.add("filled");
    progStep3.classList.add("active");
  }
}

function exitSanctuary() {
  gameCard.classList.add("hidden");
  birthdayCard.classList.add("hidden");
  goodbyeCard.classList.remove("hidden");
  triggerBurstAt(window.innerWidth / 2, window.innerHeight / 2);
}

logoutBtn.addEventListener("click", exitSanctuary);

reopenPortalBtn.addEventListener("click", () => {
  goodbyeCard.classList.add("hidden");
  openingCard.classList.remove("hidden");
  initOpeningScreen();
});

// ----------------------------------------------------
// 10. SAAD'S SECRET REPLIES VIEWER & EXPORT
// Tap the top greeting badge 3 times to view her answers!
// ----------------------------------------------------
let badgeClickCount = 0;
greetingBadge.addEventListener("click", () => {
  badgeClickCount++;
  if (badgeClickCount >= 3) {
    badgeClickCount = 0;
    openSaadRepliesModal();
  }
});

function openSaadRepliesModal() {
  const replies = JSON.parse(localStorage.getItem(STORAGE_REPLIES) || "[]");
  modalRepliesList.innerHTML = "";

  if (replies.length === 0) {
    modalRepliesList.innerHTML = "<p style='color: #e2b3c7;'>No replies saved yet. As soon as Aneeza answers on this device, they will show up here!</p>";
  } else {
    // Show in reverse chronological order
    replies.slice().reverse().forEach((r, idx) => {
      const item = document.createElement("div");
      item.className = "reply-item";
      item.innerHTML = `
        <div class="reply-meta">
          <span class="reply-date">🕒 ${r.timestamp || r.date}</span>
          <span class="reply-stage">${r.stage}</span>
        </div>
        <div class="reply-q"><strong>Q:</strong> ${r.question}</div>
        <div class="reply-a"><strong>Aneeza:</strong> "${r.her_reply}"</div>
      `;
      modalRepliesList.appendChild(item);
    });
  }

  saadModal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
  saadModal.classList.add("hidden");
});

// Download replies.json
exportRepliesBtn.addEventListener("click", () => {
  const replies = localStorage.getItem(STORAGE_REPLIES) || "[]";
  const blob = new Blob([replies], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `replies_${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// Clear history option
clearRepliesBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear saved replies on this device?")) {
    localStorage.removeItem(STORAGE_REPLIES);
    openSaadRepliesModal();
  }
});

// Launch on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initAppData();
});
