// Initialize Animations
AOS.init({
    once: true,
    offset: 100,
    duration: 1000,
});

// Music Logic
const audio = document.getElementById("bg-music");
const icon = document.getElementById("music-icon");
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        icon.classList.remove("fa-spin");
        icon.classList.remove("fa-compact-disc");
        icon.classList.add("fa-music");
    } else {
        audio.play().catch(e => console.log("Interaction needed"));
        icon.classList.remove("fa-music");
        icon.classList.add("fa-compact-disc");
        icon.classList.add("fa-spin");
    }
    isPlaying = !isPlaying;
}

// Countdown Logic
const weddingDate = new Date("Feb 15, 2026 20:00:00").getTime();

setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);
