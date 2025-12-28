// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; }, 500);
});

// Parallax Effect for Hero
gsap.to(".parallax-bg", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Reveal Sections on Scroll
const sections = document.querySelectorAll('.couple-card, .timeline-item, .section-title');
sections.forEach(section => {
    gsap.fromTo(section, 
        { y: 50, opacity: 0 },
        { 
            y: 0, opacity: 1, duration: 1, ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            }
        }
    );
});

// Countdown Timer
const weddingDate = new Date("Feb 15, 2026 20:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
        document.getElementById("d").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("h").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("m").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("s").innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// Audio Toggle
const audio = document.getElementById("wedding-audio");
const icon = document.getElementById("music-icon");
let isPlaying = false;

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-music");
        document.querySelector('.waves').style.display = 'none';
    } else {
        audio.play();
        icon.classList.remove("fa-music");
        icon.classList.add("fa-pause");
        document.querySelector('.waves').style.display = 'block';
    }
    isPlaying = !isPlaying;
}

// Auto-play attempt on first user interaction (browser policy)
document.body.addEventListener('click', () => {
    if (!isPlaying) toggleAudio();
}, { once: true });
