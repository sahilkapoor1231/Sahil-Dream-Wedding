// 1. LOADER REMOVAL (Failsafe)
window.addEventListener('load', () => { setTimeout(removeLoader, 1500); });
setTimeout(removeLoader, 4000); 

function removeLoader() {
    const l = document.getElementById('loader');
    if(l) { 
        l.style.opacity = '0'; 
        setTimeout(() => l.style.display='none', 800);
        
        // QR Code Generation for "Golden Apple"
        const qr = document.getElementById('venue-qr');
        if(qr) qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://goo.gl/maps/search/?api=1&query=Golden+Apple+Vikas+Puri`;
    }
}

// 2. ANIMATIONS
AOS.init({ duration: 1000, once: true });

// 3. AUDIO
let isPlaying = false;
const audio = document.getElementById('bg-music');
const icon = document.getElementById('audio-icon');

function toggleAudio() {
    if(isPlaying) {
        audio.pause();
        icon.className = "fas fa-music";
    } else {
        audio.play().catch(()=>alert("Tap anywhere first"));
        icon.className = "fas fa-pause";
    }
    isPlaying = !isPlaying;
}

// 4. COUNTDOWN (Feb 15 2026)
const target = new Date("Feb 15, 2026 20:00:00").getTime();
setInterval(() => {
    const diff = target - new Date().getTime();
    if(diff>0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 5. PDF GENERATION (Timeline Only)
function downloadPDF() {
    // Select ONLY the timeline section
    const element = document.getElementById('pdf-container');
    
    // Temporarily show the PDF header
    const header = document.querySelector('.pdf-header');
    if(header) header.style.display = 'block';

    const opt = {
        margin: 0.2,
        filename: 'Sahil_Dream_Itinerary.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const btn = document.querySelector('.btn-action');
    const oldText = btn.innerHTML;
    btn.innerHTML = 'Saving...';

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = oldText;
        if(header) header.style.display = 'none'; // Hide header again
    });
}
