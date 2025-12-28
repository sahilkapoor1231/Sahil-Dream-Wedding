// 1. Loader Logic (Auto-removes after 2s)
window.addEventListener('load', () => {
    setTimeout(removeLoader, 2000);
});
// Fallback
setTimeout(removeLoader, 5000);

function removeLoader() {
    const loader = document.getElementById('loader');
    if(loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);
        
        // Generate QR for Golden Apple Venue
        const venueUrl = "https://goo.gl/maps/search/?api=1&query=Golden+Apple+Vikas+Puri+Delhi";
        const qrEl = document.getElementById('venue-qr');
        if(qrEl) {
            qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(venueUrl)}`;
        }
    }
}

// 2. Animations
AOS.init({ duration: 1000, once: true });

// 3. Audio Player
let isPlaying = false;
const audio = document.getElementById('bg-music');
const icon = document.getElementById('audio-icon');
const pulse = document.getElementById('pulse-anim');

function toggleAudio() {
    if(isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
        pulse.style.animation = 'none';
    } else {
        audio.play().catch(e => alert("Please interact with the page first"));
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
        pulse.style.animation = 'ripple 2s infinite';
    }
    isPlaying = !isPlaying;
}

// 4. Countdown (Feb 15, 2026)
const target = new Date("Feb 15, 2026 20:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    if(diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 5. PDF Download (with CORS fix)
function downloadPDF() {
    const element = document.getElementById('capture-area');
    const opt = {
        margin: 0,
        filename: 'Sahil_Dream_Wedding.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const btn = document.querySelector('.btn-footer');
    const oldText = btn.innerHTML;
    btn.innerHTML = 'Generating...';

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = oldText;
    });
}
