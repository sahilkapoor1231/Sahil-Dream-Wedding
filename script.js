// ===============================
// Sahil & Dream - Full script.js (FINAL UPDATED)
// ✅ Loader
// ✅ AOS
// ✅ Music: STARTS IMMEDIATELY on page open (muted autoplay allowed by browsers)
// ✅ Music becomes audible on FIRST interaction anywhere (click/touch/scroll/key)
// ✅ Yellow button still works to pause/play
// ✅ Countdown
// ✅ PDF Download
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


// 3. MUSIC (AUTOPLAY ON OPEN + UNMUTE ON FIRST INTERACTION)
let isPlaying = false;       // Means: playing with sound OR user-controlled
let autoplayMutedStarted = false;

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

// Autoplay attempt as soon as page opens
window.addEventListener("load", () => {
  const audio = document.getElementById("bg-music");
  if (!audio) {
    console.error("Audio element #bg-music not found");
    return;
  }

  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.7;

  // ✅ MUST be muted for autoplay to work across browsers
  audio.muted = true;

  audio.play().then(() => {
    autoplayMutedStarted = true;

    // UI: show it's "playing" (even though muted)
    setMusicUI(true);

    // Now unmute automatically on first user interaction ANYWHERE
    const unmuteOnFirstAction = () => {
      // If user already paused using button, don't force play
      if (!autoplayMutedStarted) return;

      audio.muted = false;
      audio.play().catch(() => {});

      isPlaying = true; // now considered playing with sound
      setMusicUI(true);

      document.removeEventListener("click", unmuteOnFirstAction);
      document.removeEventListener("touchstart", unmuteOnFirstAction);
      document.removeEventListener("scroll", unmuteOnFirstAction);
      document.removeEventListener("keydown", unmuteOnFirstAction);
    };

    document.addEventListener("click", unmuteOnFirstAction, { once: true });
    document.addEventListener("touchstart", unmuteOnFirstAction, { once: true });
    document.addEventListener("scroll", unmuteOnFirstAction, { once: true, passive: true });
    document.addEventListener("keydown", unmuteOnFirstAction, { once: true });

  }).catch((e) => {
    console.warn("Muted autoplay blocked (rare):", e);

    // If even muted autoplay is blocked, we keep UI off until user presses button
    setMusicUI(false);
  });
});

// Yellow music button toggle (still works)
function toggleAudio() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;

  // If currently playing -> pause
  if (!audio.paused) {
    audio.pause();
    isPlaying = false;
    autoplayMutedStarted = false; // prevent forced unmute later
    setMusicUI(false);
    return;
  }

  // If paused -> play (user click, so browser allows with sound)
  audio.muted = false;
  audio.volume = 0.7;

  audio.play().then(() => {
    isPlaying = true;
    setMusicUI(true);
  }).catch((e) => {
    console.error("Play failed:", e);
    alert("Browser blocked audio. Please interact once and try again.");
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

  if (!element) {
    alert("Capture area not found.");
    return;
  }
  if (!btn) {
    alert("Download button not found.");
    return;
  }

  // Check if html2pdf is loaded
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
