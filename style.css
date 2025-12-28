:root {
    --navy: #0F172A;
    --navy-dark: #020617;
    --gold: #D4AF37;
    --gold-gradient: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7);
    --white: #ffffff;
    --font-head: 'Cinzel', serif;
    --font-body: 'Montserrat', sans-serif;
    --font-script: 'Great Vibes', cursive;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: var(--navy); color: var(--white); font-family: var(--font-body); overflow-x: hidden; }

/* 1. NEW LOADER STYLE */
#loader {
    position: fixed; inset: 0; background: var(--navy); z-index: 10000;
    display: flex; justify-content: center; align-items: center;
}
.loader-box { text-align: center; }
.monogram {
    border: 3px solid var(--gold); width: 120px; height: 120px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-head); font-size: 2.5rem; color: var(--gold);
    margin: 0 auto 20px; gap: 10px; animation: pulse 2s infinite;
}
.monogram .line { width: 2px; height: 40px; background: var(--gold); }
.loading-bar { width: 200px; height: 3px; background: rgba(255,255,255,0.1); margin: 15px auto; overflow: hidden; }
.bar-fill { width: 100%; height: 100%; background: var(--gold); animation: slide 2s infinite; }
@keyframes slide { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
@keyframes pulse { 50% { box-shadow: 0 0 30px rgba(212,175,55,0.3); } }

/* 2. HERO SECTION & PARALLAX */
.hero {
    height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; text-align: center;
    background-attachment: fixed; /* Parallax Effect */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
/* IMPORTANT: Background Image Defined Here */
.hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=1200') center/cover fixed no-repeat;
    filter: brightness(0.4);
}
.hero-text { position: relative; z-index: 2; padding: 20px; }
.ornament { width: 120px; filter: invert(0.8) sepia(1) saturate(5) hue-rotate(5deg); margin: 10px 0; }
.ornament.bottom { transform: rotate(180deg); }
.names { font-family: var(--font-head); font-size: 3.5rem; background: var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 10px 0; }
.weds-hero { font-family: var(--font-script); font-size: 2.5rem; color: white; -webkit-text-fill-color: white; text-transform: none; display: block; margin: 5px 0; }
.tagline { letter-spacing: 4px; font-size: 0.8rem; color: #ccc; }
.date, .venue { font-size: 1.1rem; letter-spacing: 2px; margin-top: 10px; }

.divider-custom { display: flex; align-items: center; justify-content: center; gap: 15px; margin: 20px 0; color: var(--gold); }
.divider-custom .line { width: 50px; height: 1px; background: var(--gold); }

.scroll-down { position: absolute; bottom: 30px; z-index: 2; color: var(--gold); display: flex; flex-direction: column; align-items: center; gap: 5px; animation: bounce 2s infinite; }
@keyframes bounce { 50% { transform: translateY(-10px); } }

/* 3. INVOCATION */
.section-padding { padding: 100px 20px; }
.bg-royal { background-color: var(--navy); background-image: radial-gradient(#1e293b 1px, transparent 1px); background-size: 20px 20px; }
.glass-card {
    background: rgba(255,255,255,0.03); border: 1px solid var(--gold);
    padding: 60px 20px; max-width: 800px; margin: 0 auto; text-align: center;
    border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.ganesha { width: 80px; margin-bottom: 20px; filter: drop-shadow(0 0 5px var(--gold)); }
.shloka { font-family: 'Playfair Display', serif; font-style: italic; color: var(--gold); margin-bottom: 30px; }
.invite-msg { color: #ccc; margin-bottom: 30px; line-height: 1.6; }

.couple-block { display: flex; align-items: center; justify-content: center; gap: 20px; margin: 30px 0; flex-wrap: wrap; }
.name h2 { font-family: var(--font-head); font-size: 2rem; color: var(--gold); }
.name small { color: #888; display: block; }
.weds-badge { border: 1px solid var(--gold); padding: 10px; border-radius: 50%; font-size: 0.8rem; color: var(--gold); font-weight: bold; }

/* 4. SEPARATOR */
.separator-parallax {
    height: 300px; position: relative; display: flex; align-items: center; justify-content: center;
    background: url('https://images.unsplash.com/photo-1583934555035-75d8628e9329?q=80&w=1200') center/cover fixed no-repeat;
}
.overlay-dark { background: rgba(0,0,0,0.6); padding: 40px; border: 1px solid var(--gold); }
.quote { font-family: var(--font-script); font-size: 2.5rem; text-align: center; }

/* 5. TIMELINE */
.section-title { font-family: var(--font-head); color: var(--gold); font-size: 2.5rem; margin-bottom: 60px; }
.timeline { display: flex; flex-direction: column; gap: 40px; max-width: 900px; margin: 0 auto; }
.event-card { display: flex; background: var(--navy-dark); border: 1px solid rgba(212,175,55,0.3); border-radius: 10px; overflow: hidden; align-items: center; }
.event-card.reverse { flex-direction: row-reverse; }
.event-img { width: 40%; height: 250px; }
.event-img img { width: 100%; height: 100%; object-fit: cover; }
.event-info { width: 60%; padding: 30px; }

.date-badge { background: var(--gold); color: var(--navy); padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 0.8rem; display: inline-block; margin-bottom: 10px; }
.date-badge.gold { background: #fff; color: var(--navy); }
.event-info h3 { font-family: var(--font-head); color: white; font-size: 1.5rem; margin-bottom: 10px; }
.details, .loc { color: #aaa; margin-bottom: 8px; font-size: 0.9rem; }
.btn-map { display: inline-block; margin-top: 10px; color: var(--gold); border: 1px solid var(--gold); padding: 8px 20px; text-decoration: none; font-size: 0.8rem; border-radius: 4px; transition: 0.3s; }
.btn-map:hover { background: var(--gold); color: var(--navy); }

/* Wedding Grand Card */
.wedding-card { position: relative; background: url('https://images.unsplash.com/photo-1545041088-25650228d99f?q=80&w=1200') center/cover; padding: 5px; border-radius: 20px; margin-top: 30px; }
.wedding-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.9); border-radius: 20px; }
.wedding-content { position: relative; z-index: 2; border: 1px solid var(--gold); padding: 50px 20px; text-align: center; border-radius: 15px; margin: 10px; }
.badge-main { background: var(--gold); color: var(--navy); display: inline-block; padding: 5px 20px; font-weight: bold; border-radius: 20px; font-size: 0.8rem; margin-bottom: 20px; }
.wedding-content h2 { font-family: var(--font-head); font-size: 2.5rem; color: var(--gold); }
.w-date { letter-spacing: 3px; font-weight: bold; margin: 10px 0 30px; }
.schedule { display: flex; justify-content: center; gap: 20px; color: #ccc; margin-bottom: 30px; flex-wrap: wrap; }
.btn-main { display: inline-block; padding: 15px 40px; background: var(--gold-gradient); color: var(--navy); font-weight: bold; text-decoration: none; border-radius: 50px; }

/* 6. FOOTER & COUNTDOWN */
.footer { background: #000; padding: 80px 20px; margin-top: 50px; border-top: 1px solid #333; }
#timer { display: flex; justify-content: center; gap: 15px; margin: 30px 0; }
.box { border: 1px solid var(--gold); color: var(--gold); padding: 15px; min-width: 80px; border-radius: 5px; }
.box span { display: block; font-size: 1.8rem; font-family: var(--font-head); color: white; }

.qr-container img { width: 140px; background: white; padding: 10px; border-radius: 10px; margin-bottom: 10px; }
.actions { display: flex; justify-content: center; gap: 15px; margin-top: 30px; }
.btn-action { padding: 12px 30px; border: 1px solid var(--gold); background: transparent; color: var(--gold); border-radius: 50px; cursor: pointer; text-decoration: none; font-weight: bold; display: flex; align-items: center; gap: 8px; }
.btn-action:hover { background: var(--gold); color: var(--navy); }
.whatsapp { background: #25d366; border-color: #25d366; color: white; }
.credits { margin-top: 50px; font-size: 0.8rem; color: #555; }

/* Music */
.music-fab-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 999; }
.music-btn { width: 50px; height: 50px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--navy); cursor: pointer; z-index: 2; position: relative; }
.pulse { position: absolute; inset: 0; border: 1px solid var(--gold); border-radius: 50%; animation: ripple 2s infinite; opacity: 0; }
@keyframes ripple { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }

@media (max-width: 768px) {
    .event-card, .event-card.reverse { flex-direction: column; }
    .event-img { width: 100%; height: 200px; }
    .event-info { width: 100%; }
    .names { font-size: 3rem; }
    .hero-bg, .separator-parallax { background-attachment: scroll; } /* Fix for mobile parallax */
}
