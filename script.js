// 1. SMART LOADER LOGIC
// Forces loader to disappear after 2.5 seconds maximum to prevent lag
window.addEventListener('load', () => {
    hideLoader();
});
setTimeout(hideLoader, 2500); // Safety fallback

function hideLoader() {
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
        
        // Auto-Generate QR for Main Venue (Golden Apple)
        // You can replace this URL with the exact Google Maps Link
        const venueLink = "https://goo.gl/maps/placeholder";
        const qrEl = document.getElementById('qr-code');
        if(qrEl) {
            qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(venueLink)}`;
        }
    }
}

// 2. ANIMATIONS INIT
AOS.init({
    duration: 1000,
    once: true,
    offset: 50
});

// 3. MUSIC PLAYER ENGINE
let isPlaying = false;
const audio = document.getElementById('wedding-audio');
const icon = document.getElementById('audio-icon');
const waves = document.getElementById('wave-anim');

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
        waves.style.display = 'none';
    } else {
        audio.play().catch(err => {
            console.log("Autoplay blocked, waiting for interaction");
        });
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
        waves.style.display = 'block';
    }
    isPlaying = !isPlaying;
}

// 4. COUNTDOWN TIMER
const weddingDate = new Date("Feb 15, 2026 20:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 5. PDF GENERATION
function downloadPDF() {
    const element = document.getElementById('invite-container');
    const opt = {
        margin: 0,
        filename: 'Sahil_Dream_Royal_Invite.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const btn = document.querySelector('.btn-royal');
    const originalText = btn.innerHTML;
    btn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Creating PDF...";

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = originalText;
    });
}
