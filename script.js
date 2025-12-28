// ===============================
// Sahil & Dream - Full script.js (UPDATED)
// - Loader + AOS + AUTOPLAY MUSIC (muted on load, unmute on first interaction)
// - Countdown
// - PDF Download
// ===============================

// 1. LOADER LOGIC
function removeLoader() {
  const loader = document.getElementById("loader");
  if (loader && loader.style.display !== "none") {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";

      // Load QR Code only when page loads to save bandwidth
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

// Remove loader when page is fully loaded
window.addEventListener("load", () => {
  setTimeout(removeLoader, 1500);
});
// Fail-safe: Force remove after 4 seconds if window.load misses
setTimeout(removeLoader, 4000);

// 2. INIT ANIMATIONS (AOS)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }
});

// 3. AUDIO PLAYER (AUTOPLAY SAFE)
// NOTE: For best results update your HTML audio tag to:
// <audio id="bg-music" autoplay muted loop playsinline>
//   <source src="assets/audio/wedding-music.mp3" type="audio/mpeg">
// </audio>

let isPlaying = false;        // User-facing state (playing with sound)
let autoplayStarted = false;  // Internal state (muted autoplay started)

function setMusicUI(playing) {
  const icon = document.getElementById("audio-icon");
  const pulse = document.getElementById("pulse-anim");

  if (icon) {
    icon.classList.remove("fa-music", "fa-pause");
    icon.classList.add(playing ? "fa-pause" : "fa-music");
  }
  if (pulse) {
    pulse.style.animation = playing ? "ripple 2s infinite" : "none";
  }
}

// Try autoplay (muted) on load, then unmute on first interaction
window.addEventListener("load", () => {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.7;

  // Start muted autoplay (allowed by most browsers)
  audio.muted = true;

  audio.play().then(() => {
    autoplayStarted = true;
    // Keep UI as "not playing" until user unlocks sound OR presses button
    setMusicUI(false);
  }).catch((e) => {
    console.warn("Muted autoplay blocked:", e);
    // Still wait for user interaction
    setMusicUI(false);
  });

  // On first interaction anywhere, unmute and play with sound
  const unlockAudio = () => {
    const a = document.getElementById("bg-music");
    if (!a) return;

    // If user already started via button, do nothing
    if (isPlaying) return;

    a.muted = false;

    a.play().then(() => {
      isPlaying = true;
      setMusicUI(true);
    }).catch((e) => {
      console.warn("Unmute/play failed:", e);
    });

    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("touchstart", unlockAudio);
    document.removeEventListener("scroll", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  };

  document.addEventListener("click", unlockAudio);
  document.addEventListener("touchstart", unlockAudio);
  document.addEventListener("scroll", unlockAudio, { passive: true });
  document.addEventListener("keydown", unlockAudio);
});

// Music button toggle (still works)
function toggleAudio() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  // If currently playing with sound -> pause
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    setMusicUI(false);
    return;
  }

  // If not playing -> play with sound (user click = allowed)
  audio.muted = false;

  audio.play().then(() => {
    isPlaying = true;
    setMusicUI(true);
  }).catch((e) => {
    console.error("Play failed:", e);
    alert("Your browser blocked autoplay. Please tap once on the page, then press the music button.");
  });
}

// OPTIONAL: Smooth fade-in volume when unmuted (called only when isPlaying becomes true)
function fadeInAudio(targetVol = 0.7, step = 0.05, interval = 120) {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  audio.volume = 0;
  let vol = 0;

  const fade = setInterval(() => {
    vol += step;
    if (vol >= targetVol) {
      audio.volume = targetVol;
      clearInterval(fade);
    } else {
      audio.volume = vol;
    }
  }, interval);
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
    hEl.innerText = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
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

  if (!element) {
    alert("Capture area not found.");
    return;
  }
  if (!btn) {
    alert("Download button not found.");
    return;
  }

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
