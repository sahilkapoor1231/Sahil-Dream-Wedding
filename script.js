// 1. Initialize Animations (AOS)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 2. Preloader Removal
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Generate Dynamic QR Code for Main Wedding Venue
    // Using Golden Apple, Vikas Puri coordinates or link
    const weddingMapLink = "https://maps.google.com/?q=Crystal+Hall+Golden+Apple+Vikas+Puri+New+Delhi";
    const qrImage = document.getElementById('qr-image');
    // Using qrserver API
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(weddingMapLink)}`;
});

// 3. Music Control Engine
let isMusicPlaying = false;
const audio = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
const musicFab = document.querySelector('.music-fab');
const musicWaves = document.getElementById('music-waves');

function toggleAudio() {
    if (isMusicPlaying) {
        audio.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
        musicFab.classList.remove('rotating');
        musicWaves.style.display = 'none';
    } else {
        audio.play().then(() => {
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
            musicFab.classList.add('rotating');
            musicWaves.style.display = 'block';
        }).catch(error => {
            console.log("Audio play failed (browser restriction): ", error);
            alert("Please interact with the page first to play audio.");
        });
    }
    isMusicPlaying = !isMusicPlaying;
}

// 4. Countdown Timer Logic
// Set the date we're counting down to: Feb 15, 2026, 8:00 PM
const countDownDate = new Date("Feb 15, 2026 20:00:00").getTime();

const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result
    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("mins").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("secs").innerText = seconds < 10 ? '0' + seconds : seconds;

    // If the count down is over
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown-timer").innerHTML = "<h3 class='gold-text'>The Wedding has Started!</h3>";
    }
}, 1000);

// 5. PDF Generation Logic
function downloadPDF() {
    // We select the main tag which contains the printable invite
    const element = document.getElementById('printable-invite');
    
    // Configuration for html2pdf
    const opt = {
        margin:       [0, 0, 0, 0], // No margins for full bleed
        filename:     'Sahil_Dream_Wedding_Invite.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Feedback button change
    const btn = document.querySelector('.btn-gold-lg');
    const oldText = btn.innerHTML;
    btn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Generating PDF...";

    // Generate
    html2pdf().set(opt).from(element).save().then(() => {
        // Restore button text
        btn.innerHTML = oldText;
    });
}
