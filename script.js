// 1. LOADER LOGIC
function removeLoader() {
    const loader = document.getElementById('loader');
    if(loader && loader.style.display !== 'none') {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Load QR Code only when page loads to save bandwidth
            const qrEl = document.getElementById('venue-qr');
            const venueUrl = "https://goo.gl/maps/search/?api=1&query=Golden+Apple+Vikas+Puri+Delhi";
            if(qrEl) qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(venueUrl)}`;
        }, 800);
    }
}

// Remove loader when page is fully loaded
window.addEventListener('load', () => { setTimeout(removeLoader, 1500); });
// Fail-safe: Force remove after 4 seconds if window.load misses
setTimeout(removeLoader, 4000);

// 2. INIT ANIMATIONS (AOS)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
});

// 3. AUDIO PLAYER
let isPlaying = false;
const audio = document.getElementById('bg-music');
const icon = document.getElementById('audio-icon');
const pulse = document.getElementById('pulse-anim');

function toggleAudio() {
    if(!audio) return;
    if(isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause'); icon.classList.add('fa-music');
        pulse.style.animation = 'none';
    } else {
        // Browsers require user interaction before playing audio
        audio.play().then(() => {
            icon.classList.remove('fa-music'); icon.classList.add('fa-pause');
            pulse.style.animation = 'ripple 2s infinite';
        }).catch(e => {
            alert("Please tap anywhere on the screen first, then click music!");
        });
    }
    isPlaying = !isPlaying;
}

// 4. COUNTDOWN TIMER
const target = new Date("Feb 15, 2026 20:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    
    // Only update if elements exist
    const dEl = document.getElementById('days');
    if(diff > 0 && dEl) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 5. PDF DOWNLOAD
function downloadPDF() {
    const element = document.getElementById('capture-area');
    const btn = document.getElementById('download-btn');
    
    // Check if html2pdf is loaded
    if (typeof html2pdf === 'undefined') {
        alert("PDF generator is still loading. Please wait a moment.");
        return;
    }

    const oldText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    const opt = {
        margin: 0,
        filename: 'Sahil_Dream_Wedding.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = oldText;
    }).catch(err => {
        console.error(err);
        btn.innerHTML = oldText;
        alert("Error creating PDF. Please try again.");
    });
}
