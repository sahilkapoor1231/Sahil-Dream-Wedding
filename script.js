// 1. LOADER REMOVAL
window.addEventListener('load', () => {
    // Artificial delay for smooth UX
    setTimeout(removeLoader, 1500); 
});
// Failsafe
setTimeout(removeLoader, 4000);

function removeLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
        
        // GENERATE DYNAMIC QR CODE FOR MAIN VENUE
        // Venue: Crystal Hall, Golden Apple, Vikas Puri
        const venueMapUrl = "https://www.google.com/maps/search/?api=1&query=Golden+Apple+Vikas+Puri+New+Delhi";
        const qrElement = document.getElementById('qr-code');
        if(qrElement) {
            // Using API to generate QR based on the map link
            qrElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(venueMapUrl)}`;
        }
    }
}

// 2. AOS ANIMATION INIT
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 3. MUSIC PLAYER
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
        audio.play().catch(e => alert("Please interact with the screen first to play music."));
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
        document.querySelector('.pulse-ring').style.animation = 'ripple 2s infinite';
    }
    isPlaying = !isPlaying;
}

// 4. COUNTDOWN TIMER
const weddingDate = new Date("Feb 15, 2026 20:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if(diff > 0) {
        document.getElementById('d').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('h').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('m').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('s').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);

// 5. PDF GENERATION LOGIC
function downloadPDF() {
    const element = document.getElementById('capture-area');
    const opt = {
        margin: 0,
        filename: 'Sahil_Dream_Wedding_Invite.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const btn = document.querySelector('.btn-footer');
    const oldText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';

    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerHTML = oldText;
    });
}
