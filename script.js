// ===============================
// Sahil & Dream - Full script.js
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
      if (qrEl)
        qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
          venueUrl
        )}`;
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

// 3. AUDIO PLAYER (FIXED)
let isPlaying = false;

function toggleAudio() {
  const audio = document.getElementById("bg-music");
  const icon = document.getElementById("audio-icon");
  const pulse = document.getElementById("pulse-anim");

  if (!audio) {
    console.error("Audio element #bg-music not found");
    return;
  }

  audio.volume = 0.7;

  if (isPlaying) {
    audio.pause();
    isPlaying = false;

    if (icon) {
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-music");
    }
    if (pulse) pulse.style.animation = "none";
    return;
  }

  // Browsers require user interaction before playing audio
  audio
    .play()
    .then(() => {
      isPlaying = true;
      if (icon) {
        icon.classList.remove("fa-music");
        icon.classList.add("fa-pause");
      }
      if (pulse) pulse.style.animation = "ripple 2s infinite";
    })
    .catch((e) => {
      console.error("Play failed:", e);
      alert(
        "Your browser blocked autoplay. Tap once anywhere on the page, then press the music button."
      );
    });
}

// OPTIONAL: Auto-start music after first user tap anywhere
document.addEventListener(
  "click",
  function autoStartMusic() {
    const audio = document.getElementById("bg-music");
    if (audio && !isPlaying) {
      audio
        .play()
        .then(() => {
          isPlaying = true;
          const icon = document.getElementById("audio-icon");
          const pulse = document.getElementById("pulse-anim");
          if (icon) {
            icon.classList.remove("fa-music");
            icon.classList.add("fa-pause");
          }
          if (pulse) pulse.style.animation = "ripple 2s infinite";
        })
        .catch(() => {});
    }
    document.removeEventListener("click", autoStartMusic);
  },
  { once: true }
);

// 4. COUNTDOWN TIMER
const target = new Date("Feb 15, 2026 20:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = target - now;

  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("mins");
  const sEl = document.getElementById("secs");

  // Only update if elements exist
  if (diff > 0 && dEl && hEl && mEl && sEl) {
    dEl.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    hEl.innerText = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    mEl.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    sEl.innerText = Math.floor((diff % (1000 * 60)) / 1000);
  } else if (diff <= 0 && dEl && hEl && mEl && sEl) {
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
