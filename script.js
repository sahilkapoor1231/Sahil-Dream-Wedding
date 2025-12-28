// 1. FAIL-SAFE LOADER REMOVAL
// Ensures the user never gets stuck
window.addEventListener('load', () => {
    removeLoader();
});
// Fallback if load event misfires
setTimeout(removeLoader, 3000);

function removeLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
        
        // Generate Dynamic QR for Venue
        const venueLink = "https://goo.gl/maps/placeholder";
        const qrEl = document.getElementById('qr-code');
        if(qrEl) {
            qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(venueLink)}`;
        }
    }
}

// 2. ANIMATIONS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 3. AUDIO PLAYER
let isPlaying = false;
const audio = document.getElementById('bg-music');
const icon = document.getElementById('music-icon');

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
        document.querySelector('.pulse-ring').style.animation = 'none';
    } else {
        audio.play().catch(e => alert("Please interact with the document first"));
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
        document.querySelector('.pulse-ring').style.animation = 'ripple 2s infinite';
    }
    isPlaying = !isPlaying;
}

// 4. COUNTDOWN
const target = new Date("Feb 15, 2026 20:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff > 0) {
        document.getElementById('d').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('h').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('m').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('s').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 5. PDF GENERATION
function downloadPDF() {
    const element = document.getElementById('capture-area');
    const opt = {
        margin: 0,
        filename: 'Sahil_Dream_Wedding.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const btn = document.querySelector('.btn-footer');
    const oldHTML = btn.innerHTML;
    btn.innerHTML = 'Generating...';

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = oldHTML;
    });
}
