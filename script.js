// ===============================
// Sahil & Dream - Full script.js (Autoplay strongest possible)
// ===============================

// 1. LOADER LOGIC
function removeLoader() {
  const loader = document.getElementById("loader");
  if (loader && loader.style.display !== "none") {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";

      const qrEl = document.getElementById("venue-qr");
      const venueUrl =
        "https://goo.gl/maps/search/?api=1&query=Golden+Apple+Vikas+Puri+Delhi";
      if (qrEl) {
        qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
          venueUrl
        )}`;
      }
    }, 800);
  }
}

window.addEventListener("load", () => setTimeout(removeLoader, 1500));
setTimeout(removeLoader, 4000);

// 2. INIT ANIMATIONS (AOS)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }
});

// 3. MUSIC (AUTOPLAY ON OPEN - MUTED; UNMUTE ON FIRST ACTION)
let userPaused = false;

function setMusicUI(playing) {
  const icon = document.getElementById("audio-icon");
  const pulse = document.getElementById("pulse-anim");

  if (icon) {
    icon.classList.remove("fa-music", "fa-pause");
    icon.classList.add(playing ? "fa-pause" : "fa-music");
  }
  if (pulse) pulse.style.animation = playing ? "ripple 2s infinite" : "none";
}

function tryAutoPlayMuted(where = "unknown") {
  const audio = document.getElementById("bg-music");
  if (!audio || userPaused) return;

  // Force muted autoplay attempt
  audio.muted = true;
  audio.setAttribute("muted", ""); // important for some Safari cases
  audio.volume = 0.7;
  audio.loop = true;
  audio.preload = "auto";

  const p = audio.play();
  if (p && typeof p.then === "function") {
    p.then(() => {
      // It IS playing (muted). Most people won't "hear" it, but it's running.
      console.log("✅ Muted autoplay started from:", where);
      setMusicUI(true);
    }).catch((e) => {
      console.warn("❌ Muted autoplay blocked from:", where, e);
      setMusicUI(false);
    });
  }
}

// Fire autoplay attempts at multiple lifecycle points (strongest approach)
document.addEventListener("DOMContentLoaded", () => tryAutoPlayMuted("DOMContentLoaded"));
window.addEventListener("load", () => tryAutoPlayMuted("window.load"));
setTimeout(() => tryAutoPlayMuted("timeout-500"), 500);
setTimeout(() => tryAutoPlayMuted("timeout-1500"), 1500);

// If audio becomes ready later, try again
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  audio.addEventListener("canplay", () => tryAutoPlayMuted("canplay"), { once: true });
  audio.addEventListener("canplaythrough", () => tryAutoPlayMuted("canplaythrough"), { once: true });
});

// Unmute on FIRST interaction ANYWHERE (no need to click the icon)
function unmuteAndKeepPlaying() {
  const audio = document.getElementById("bg-music");
  if (!audio || userPaused) return;

  audio.muted = false;
  audio.removeAttribute("muted");

  audio.play().then(() => {
    console.log("🔊 Unmuted after first interaction");
    setMusicUI(true);
  }).catch((e) => {
    console.warn("Unmute/play failed:", e);
  });

  document.removeEventListener("click", unmuteAndKeepPlaying);
  document.removeEventListener("touchstart", unmuteAndKeepPlaying);
  document.removeEventListener("scroll", unmuteAndKeepPlaying);
  document.removeEventListener("keydown", unmuteAndKeepPlaying);
}

document.addEventListener("click", unmuteAndKeepPlaying, { once: true });
document.addEventListener("touchstart", unmuteAndKeepPlaying, { once: true });
document.addEventListener("scroll", unmuteAndKeepPlaying, { once: true, passive: true });
document.addEventListener("keydown", unmuteAndKeepPlaying, { once: true });

// Yellow button toggle (manual control)
function toggleAudio() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  if (!audio.paused) {
    audio.pause();
    userPaused = true;   // respect user choice
    setMusicUI(false);
    return;
  }

  userPaused = false;
  audio.muted = false;   // button click counts as gesture
  audio.removeAttribute("muted");
  audio.volume = 0.7;

  audio.play().then(() => setMusicUI(true)).catch((e) => {
    console.error("Manual play failed:", e);
    alert("Audio blocked by browser settings. Try opening in Chrome/Safari (not in-app browser).");
  });
}

// 4. COUNTDOWN TIMER
const target = new Date("Feb 15, 2026 20:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;

  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("mins");
  const sEl = document.getElementById("secs");

  if (!dEl || !hEl || !mEl || !sEl) return;

  if (diff > 0) {
    dEl.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    hEl.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    mEl.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    sEl.innerText = Math.floor((diff % (1000 * 60)) / 1000);
  } else {
    dEl.innerText = "00";
    hEl.innerText = "00";
    mEl.innerText = "00";
    sEl.innerText = "00";
  }
}, 1000);

// 5. PDF DOWNLOAD
function downloadPDF() {
  const element = document.getElementById("capture-area");
  const btn = document.getElementById("download-btn");

  if (!element) return alert("Capture area not found.");
  if (!btn) return alert("Download button not found.");
  if (typeof html2pdf === "undefined") {
    alert("PDF generator is still loading. Please wait a moment.");
    return;
  }

  const oldText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  btn.disabled = true;

  const opt = {
    margin: 0,
    filename: "Sahil_Dream_Wedding.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      btn.innerHTML = oldText;
      btn.disabled = false;
    })
    .catch((err) => {
      console.error(err);
      btn.innerHTML = oldText;
      btn.disabled = false;
      alert("Error creating PDF. Please try again.");
    });
}
