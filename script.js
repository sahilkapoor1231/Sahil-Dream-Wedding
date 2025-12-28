// 1. ROBUST LOADER REMOVAL
// This guarantees the loader disappears even if images are slow
window.addEventListener('load', removeLoader);
setTimeout(removeLoader, 3000); // Failsafe after 3s

function removeLoader() {
    const loader = document.getElementById('app-loader');
    if (loader && loader.style.display !== 'none') {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);

        // Generate QR Code dynamically on load
        const qr = document.getElementById('qr-code');
        if (qr) {
            qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://goo.gl/maps/placeholder`;
        }
    }
}

// 2. INITIALIZE AOS
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
}

// 3. AUDIO PLAYER
let isPlaying = false;
const audio = document.getElementById('wedding-audio');
const icon = document.getElementById('audio-icon');
const waves = document.getElementById('wave-anim');

function toggleAudio() {
    if(!audio) return;
    
    if (isPlaying) {
        audio.pause();
        if(icon) { icon.classList.remove('fa-pause'); icon.classList.add('fa-music'); }
        if(waves) waves.style.display = 'none';
    } else {
        audio.play().catch(e => console.log("User interaction needed"));
        if(icon) { icon.classList.remove('fa-music'); icon.classList.add('fa-pause'); }
        if(waves) waves.style.display = 'block';
    }
    isPlaying = !isPlaying;
}

// 4. COUNTDOWN
const target = new Date("Feb 15, 2026 20:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        if(document.getElementById('days')) document.getElementById('days').innerText = d < 10 ? '0'+d : d;
        if(document.getElementById('hours')) document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        if(document.getElementById('mins')) document.getElementById('mins').innerText = m < 10 ? '0'+m : m;
        if(document.getElementById('secs')) document.getElementById('secs').innerText = s < 10 ? '0'+s : s;
    }
}, 1000);

// 5. PDF DOWNLOAD
function downloadPDF() {
    const element = document.getElementById('invite-container');
    const opt = {
        margin: 0,
        filename: 'Sahil_Dream_Wedding.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // UI Feedback
    const btn = document.querySelector('.btn-royal');
    if(btn) {
        const oldHtml = btn.innerHTML;
        btn.innerHTML = 'Generating...';
        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = oldHtml;
        });
    }
}
