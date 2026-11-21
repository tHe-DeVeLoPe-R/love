// ==========================================================
// ROMANTIC OPENING PORTAL ENGINE FOR HER
// Features: Dynamic Image Loader, Emoji Blast, Randomized Greetings
// ==========================================================

// All 31 verified images in the images folder
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

// Randomized Romance Themes for Emojis
const EMOJI_THEMES = [
  // Hearts & Adoration
  { name: "pure_hearts", emojis: ["💖", "❤️", "💕", "💘", "💗", "💓", "💞", "✨"] },
  // Hot & Kissy Lips
  { name: "hot_kisses", emojis: ["💋", "🫦", "🔥", "😘", "👩‍❤️‍💋‍👨", "💄", "🌶️", "✨"] },
  // Sweet & Passionate Blend
  { name: "passionate", emojis: ["❤️‍🔥", "💋", "💖", "🔥", "🌹", "✨", "🥰", "💌"] },
  // Royal & Goddess
  { name: "goddess", emojis: ["👑", "💎", "✨", "💖", "🌹", "💍", "💋", "👸"] }
];

// Engaging Romantic Messages
const ROMANTIC_GREETINGS = [
  {
    badge: "✨ To My Soulmate ✨",
    title: "The Most Beautiful Woman in the Universe",
    subtitle: "Every heartbeat of mine whispers your name. Welcome to your personal sanctuary of deep love and wild passion."
  },
  {
    badge: "👑 My Forever Queen 👑",
    title: "You Take My Breath Away Every Day",
    subtitle: "Looking at you reminds me how lucky I am to call you my wife. You are my greatest desire and sweetest obsession."
  },
  {
    badge: "❤️‍🔥 The Love of My Life ❤️‍🔥",
    title: "Forever Spellbound by Your Beauty",
    subtitle: "A thousand lifetimes wouldn't be enough to worship you the way you truly deserve. You ignite my soul."
  },
  {
    badge: "💋 My Heart & Desire 💋",
    title: "You Are Absolutely Irresistible",
    subtitle: "Your smile brightens my darkest days, and your touch sets my whole world on fire. I am endlessly yours."
  },
  {
    badge: "🌹 My Sweet Sanctuary 🌹",
    title: "Every Second With You Is Pure Magic",
    subtitle: "From the softest glance to the deepest kiss, everything about you is divine perfection. Welcome, my darling."
  }
];

// Frame Dynamic Animations
const FRAME_ANIMATIONS = ["anim-heartbeat", "anim-float", "anim-glow"];

// DOM Elements
const emojiContainer = document.getElementById("emoji-container");
const queenPhoto = document.getElementById("queen-photo");
const imgSkeleton = document.getElementById("img-skeleton");
const photoFrame = document.getElementById("photo-frame");
const greetingBadge = document.getElementById("greeting-badge");
const loveTitle = document.getElementById("love-title");
const loveSubtitle = document.getElementById("love-subtitle");
const startBtn = document.getElementById("start-btn");
const openingCard = document.getElementById("opening-card");
const portalCard = document.getElementById("portal-card");
const backToOpeningBtn = document.getElementById("back-to-opening");

// Utility: Random Picker
function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// 1. Initialize Engaging Greeting & Frame Animation
function initOpeningState() {
  const greeting = getRandom(ROMANTIC_GREETINGS);
  greetingBadge.textContent = greeting.badge;
  loveTitle.textContent = greeting.title;
  loveSubtitle.textContent = greeting.subtitle;

  // Apply a random ambient frame animation
  photoFrame.classList.remove(...FRAME_ANIMATIONS);
  const selectedAnim = getRandom(FRAME_ANIMATIONS);
  photoFrame.classList.add(selectedAnim);

  // Pick random image from the folder
  loadRandomImage();

  // Blast love emojis onto screen immediately
  triggerEmojiBlast(40, true);
}

// 2. Load Image Safely with Fallback & Animation
function loadRandomImage() {
  const randomFileName = getRandom(HER_IMAGES);
  const encodedPath = `images/${encodeURIComponent(randomFileName)}`;

  imgSkeleton.classList.remove("hidden");
  queenPhoto.classList.add("hidden");

  const preloader = new Image();
  preloader.src = encodedPath;

  preloader.onload = () => {
    queenPhoto.src = encodedPath;
    imgSkeleton.classList.add("hidden");
    queenPhoto.classList.remove("hidden");
  };

  preloader.onerror = () => {
    // If a specific file fails, fallback to first verified image
    queenPhoto.src = `images/${encodeURIComponent(HER_IMAGES[0])}`;
    imgSkeleton.classList.add("hidden");
    queenPhoto.classList.remove("hidden");
  };
}

// 3. Love Emoji Blast (Hearts, Lips, Hot Emojis)
function triggerEmojiBlast(count = 35, continuous = false) {
  // Pick a random emoji theme on this visit
  const theme = getRandom(EMOJI_THEMES);
  const emojiSet = theme.emojis;

  for (let i = 0; i < count; i++) {
    createFallingEmoji(emojiSet, i * 85);
  }

  // Soft continuous rain for atmosphere
  if (continuous) {
    const interval = setInterval(() => {
      createFallingEmoji(emojiSet, 0);
    }, 700);

    // Save interval ID to window for optional cleanup
    window._emojiRainInterval = interval;
  }
}

function createFallingEmoji(emojiSet, delayMs = 0) {
  setTimeout(() => {
    const el = document.createElement("div");
    el.className = "falling-emoji";
    el.textContent = getRandom(emojiSet);

    // Randomize initial positions & drift
    const startX = Math.random() * 95; // 0 to 95vw
    const size = Math.floor(Math.random() * 18) + 20; // 20px to 38px
    const duration = (Math.random() * 2.8 + 3.2).toFixed(2); // 3.2s to 6s
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

    // Auto remove after animation completes to avoid memory clutter
    setTimeout(() => {
      el.remove();
    }, parseFloat(duration) * 1000 + 200);
  }, delayMs);
}

// 4. Interactive Radial Explosion on Button Click
function triggerBurstAt(x, y) {
  const hotEmojis = ["💋", "❤️‍🔥", "💖", "🔥", "🫦", "🌹", "✨", "💘"];
  const particles = 28;

  for (let i = 0; i < particles; i++) {
    const p = document.createElement("div");
    p.className = "burst-emoji";
    p.textContent = getRandom(hotEmojis);

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.fontSize = `${Math.floor(Math.random() * 14 + 22)}px`;

    const angle = (i / particles) * 360 + (Math.random() * 20 - 10);
    const radius = Math.random() * 140 + 80;
    const tx = Math.cos((angle * Math.PI) / 180) * radius;
    const ty = Math.sin((angle * Math.PI) / 180) * radius;
    const spin = Math.floor(Math.random() * 360 - 180) + "deg";

    p.style.setProperty("--tx", `${tx}px`);
    p.style.setProperty("--ty", `${ty}px`);
    p.style.setProperty("--spin", spin);
    p.style.animationDuration = `${(Math.random() * 0.4 + 0.75).toFixed(2)}s`;

    emojiContainer.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 1200);
  }
}

// 5. Button Interaction
startBtn.addEventListener("click", (e) => {
  const rect = startBtn.getBoundingClientRect();
  const clickX = e.clientX || rect.left + rect.width / 2;
  const clickY = e.clientY || rect.top + rect.height / 2;

  // Trigger grand burst
  triggerBurstAt(clickX, clickY);

  // Transition to portal card
  setTimeout(() => {
    openingCard.classList.add("hidden");
    portalCard.classList.remove("hidden");
  }, 450);
});

// Refresh / Back handler
backToOpeningBtn.addEventListener("click", () => {
  portalCard.classList.add("hidden");
  openingCard.classList.remove("hidden");
  initOpeningState();
});

// Start experience as soon as DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initOpeningState();
});
