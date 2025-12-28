// 1. Loader Logic
window.addEventListener('load', () => {
    // Wait slightly to ensure styles are applied
    setTimeout(removeLoader, 1500);
});

// Fallback: If window.load fails (e.g. slow images), force remove after 5s
setTimeout(removeLoader, 5000);

function removeLoader() {
    const loader = document.getElementById('loader');
    if(loader && loader.style.display !== 'none') {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            
            // Generate QR (Only if not already generated)
            const qrEl = document.getElementById('venue-qr');
            if(qrEl && !qrEl.src) {
                const venueUrl = "https://goo.gl/maps/search/?api=1&query=Golden+Apple+Vikas+Puri+Delhi";
                qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(venueUrl)}`;
            }
        }, 800);
    }
}

// 2. Animations
// Check if AOS exists before initializing
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
}

// 3. Audio Player
let isPlaying = false;
const audio = document.getElementById('bg-music');
const icon = document.getElementById('audio-icon');
const pulse = document.getElementById('pulse-anim');

function toggleAudio() {
    if (!audio) return;
    
    if(isPlaying) {
        audio.pause();
        if(icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-music');
        }
        if(pulse) pulse.style.animation = 'none';
    } else {
        // Handle mobile browser autoplay restrictions
        audio.play().then(() => {
            if(icon) {
                icon.classList.remove('fa-music');
                icon.classList.add('fa-pause');
            }
            if(pulse) pulse.style.animation = 'ripple 2s infinite';
        }).catch(e => {
            console.log("Audio play failed:", e);
            alert("Tap anywhere to interact first, then try music!");
        });
    }
    isPlaying = !isPlaying;
}

// 4. Countdown (Feb 15, 2026)
const target = new Date("Feb 15, 2026 20:00:00").getTime();
const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    
    const dEl = document.getElementById('days');
    if (diff > 0 && dEl) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 5. PDF Download
function downloadPDF() {
    const element = document.getElementById('capture-area'); // Make sure Main has this ID
    const btn = document.getElementById('download-btn'); // Fixed Selector
    
    if(!element || !btn) {
        console.error("PDF elements not found");
        return;
    }

    const opt = {
        margin: 0,
        filename: 'Sahil_Dream_Wedding.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const oldText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = oldText;
    }).catch(err => {
        console.error(err);
        btn.innerHTML = oldText;
        alert("Error generating PDF. Please try again.");
    });
}
