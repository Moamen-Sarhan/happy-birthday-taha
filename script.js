<<<<<<< HEAD
/* ================== 🎵 إدارة الصوت ================== */
const bgMusic = document.getElementById('bgMusic');
const fireworkSound = document.getElementById('fireworkSound');
let musicPlaying = false;

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if (musicPlaying) {
        bgMusic.pause();
        btn.textContent = '🔇';
        musicPlaying = false;
    } else {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(err => console.log('مشكلة تشغيل الأغنية:', err));
        btn.textContent = '🔊';
        musicPlaying = true;
    }
}

function toggleMute(event) {
    const allAudios = [bgMusic, fireworkSound].filter(a => a);
    const anyMuted = allAudios.some(a => a.muted);
    allAudios.forEach(a => a.muted = !anyMuted);
    if (event) event.target.textContent = anyMuted ? '🔇' : '🔊';
}

function playFirework(volume = 0.6) {
    if (!fireworkSound) return;
    try {
        fireworkSound.currentTime = 0;
        fireworkSound.volume = volume;
        fireworkSound.play().catch(() => {});
    } catch(e) {}
}

/* ================== 🎊 الاحتفال الكامل (صوت + كونفيتي) ================== */
function celebrate() {
    playFirework(0.7);   // 🎆 صوت الفرقعة
    throwConfetti();     // 🎊 الكونفيتي
}

/* ================== 🎬 بدء الحفلة ================== */
function startParty() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');

    bgMusic.volume = 0.4;
    bgMusic.play().then(() => {
        musicPlaying = true;
        document.getElementById('musicBtn').textContent = '🔊';
    }).catch(err => console.log('المتصفح منع التشغيل:', err));

    playFirework(0.5);
    throwConfetti();
    loadGifts();
    loadFriendMessages();
    loadGallery();
    loadVideoGallery();
}

/* ================== 🎂 إطفاء الشمع ================== */
let candlesBlown = false;
function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    playFirework(0.7);

    const cake = document.getElementById('cake');
    cake.textContent = '🍰';
    cake.style.animation = 'none';

    setTimeout(() => {
        alert('🎉 كل سنة وأنت طيب يا طه! 🎂');
        playFirework(0.6);
        throwConfetti();
    }, 400);
}

/* ================== 🎁 الهدايا مع الصور ================== */
// ✏️ عدّل من هنا — كل هدية: صورة + من مين + الرسالة
const gifts = [
    {
        image: 'images/gift1.jpg',
        from: 'من صاحبك: نواار',
        message: 'كل سنة وانت طيب يا اخويا وعيد ميلاد سعيد وعقبال مليون سنة وتحقق اللي نفسك فيه ❤️'
    },
    {
        image: 'images/gift2.jpg',
        from: 'من صحابك: فرانك وزيكا وفينس',
        message: 'كل سنة وانت طيب يا قلبي وعقبال مليون سنة واحنا اخوات ❤️'
    }
];

function loadGifts() {
    const container = document.getElementById('giftsContainer');
    if (!container) return;
    container.innerHTML = '';

    gifts.forEach((gift, i) => {
        const box = document.createElement('div');
        box.className = 'gift-box';
        box.onclick = () => openGift(box, i);
        box.innerHTML = `🎁<span>اضغط</span>`;
        container.appendChild(box);
    });
}

function openGift(element, index) {
    const gift = gifts[index];
    if (!gift) return;

    playFirework(0.6);
    element.classList.add('opened');
    element.style.transform = 'scale(1.2)';

    setTimeout(() => {
        element.style.transform = '';
        element.innerHTML = `✅<span>اتفتحت</span>`;

        document.getElementById('giftImage').src = gift.image;
        document.getElementById('giftFrom').textContent = `🎁 ${gift.from}`;
        document.getElementById('giftText').textContent = `"${gift.message}"`;

        document.getElementById('giftModal').classList.remove('hidden');
        playFirework(0.4);
        throwConfetti();
    }, 400);
}

function closeGift() {
    document.getElementById('giftModal').classList.add('hidden');
}

/* ================== 💌 رسائل الأصحاب ================== */
const friendMessages = [
    { name: 'فينس',   text: '🥳❤️🎉 كل سنة وانت طيب يا اخويا وعيد ميلاد سعيد وعقبال مليون سنة وتحقق اللي نفسك فيه وتتمناه ويارب تكون الهدية البسيطة عجبتك' },
    { name: 'ديفل',   text: 'كل سنة وانت طيب يا قلبي وعقبال مليون سنة واحنا اخوات وتحقق كل اللي نفسك فيه ❤️' },
    { name: 'جووو',   text: 'كل سنة وأنت طيب يا سولوم يحبيب اخوك و عقبال 100 سنة بخير يارب🥳' },
    { name: 'زيكااا', text: 'كل سنة وانت طيب يا حبيب قلبي وعقبال مليون سنة ❤️' },
    { name: 'سيلفا', text: 'كل سنه وانت طيب يا حبوب وعقبال العمر كله يحبيبي ❤️' },
    { name: 'مارووكي', text: 'كل سنة وانت طيب يا روح قلبي وعقبال 100 سنة واحنا مع بعض وخوات ❤🤍' },
    { name: 'يازيد',  text: 'كل سنة وانت طيب وعقبال مليون سنة وتحقق كل اللي نفسك فيه، أجدد أخ كبير ليا 🤍🥀🎉' },
    { name: 'ماريوو', text: 'كل سنة وانت طيب يا حبيب قلبي وعقبال مليون سنة ❤️' }
];

function loadFriendMessages() {
    const wall = document.getElementById('messagesWall');
    if (!wall) return;
    wall.innerHTML = '';

    friendMessages.forEach((msg, i) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'friend-msg';
            div.innerHTML = `
                <span class="name">💌 ${msg.name}</span>
                <span class="text">${msg.text}</span>
            `;
            wall.appendChild(div);
            playFirework(0.2);
        }, i * 400);
    });
}

/* ================== 📸 معرض الصور ================== */
// ✏️ عدّل حسب الصور اللي عندك
const galleryImages = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
    'images/photo7.jpg',
    'images/photo8.jpg',
    'images/photo9.jpg',
    'images/photo10.jpg',
    'images/photo11.jpg',
    'images/photo12.jpg',
    'images/photo13.jpg',
    'images/photo14.jpg',
    'images/photo15.jpg',
    'images/photo16.jpg',
    'images/photo17.jpg',
    'images/photo18.jpg',
    'images/photo19.jpg',
    'images/photo20.jpg',
    'images/photo21.jpg',
    'images/photo22.jpg',
    'images/photo23.jpg',
    'images/photo24.jpg',
    'images/photo25.jpg',
    'images/photo26.jpg'
];

let currentImageIndex = 0;

function loadGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    galleryImages.forEach((src, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openLightbox(i);
        item.innerHTML = `<img src="${src}" alt="ذكرى ${i + 1}" loading="lazy">`;
        gallery.appendChild(item);
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.remove('hidden');
    playFirework(0.3);
}

function closeLightbox(event) {
    if (event.target.id === 'lightbox' || event.target.classList.contains('lb-close')) {
        document.getElementById('lightbox').classList.add('hidden');
    }
}

function nextImage(event) {
    if (event) event.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightbox();
    playFirework(0.2);
}

function prevImage(event) {
    if (event) event.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
    playFirework(0.2);
}

function updateLightbox() {
    document.getElementById('lightboxImg').src = galleryImages[currentImageIndex];
    document.getElementById('lbCounter').textContent = 
        `${currentImageIndex + 1} / ${galleryImages.length}`;
}

/* ================== 🎬 الفيديو الرئيسي ================== */
function playMainVideo() {
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    if (!video) return;

    overlay.classList.add('hide');
    video.volume = 1;
    video.play().catch(err => console.log('مشكلة تشغيل الفيديو:', err));

    if (musicPlaying && bgMusic) bgMusic.pause();
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    if (!video) return;

    video.addEventListener('ended', () => {
        document.getElementById('videoOverlay').classList.remove('hide');
        if (musicPlaying && bgMusic) bgMusic.play().catch(() => {});
    });

    video.addEventListener('pause', () => {
        if (video.currentTime === 0 || video.ended) {
            document.getElementById('videoOverlay').classList.remove('hide');
        }
    });
});

/* ================== 🎥 فيديوهات إضافية ================== */
const extraVideos = [
    { 
        src: 'https://streamable.com/4d4iz1', 
        poster: 'images/photo1.jpg',
        title: 'قصة كفاح',
        desc: 'أيام المعارك الجميلة'
    },
    { 
        src: 'https://streamable.com/5mx94c', 
        poster: 'images/photo2.jpg',
        title: 'أجمد حفلات ورقص',
        desc: 'تحيات فرانك'
    },
    { 
        src: 'videos/video3.mp4', 
        poster: 'images/photo3.jpg',
        title: 'أجمد حفلات ورقص',
        desc: 'تحيات يازيد'
    }
];

function loadVideoGallery() {
    const gallery = document.getElementById('videoGallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    extraVideos.forEach((vid, i) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.onclick = () => openVideoModal(i);
        card.innerHTML = `
            <div class="thumb">
                <video preload="metadata" muted>
                    <source src="${vid.src}" type="video/mp4">
                </video>
            </div>
            <div class="info">
                <h4>🎬 ${vid.title}</h4>
                <p>${vid.desc}</p>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function openVideoModal(index) {
    const vid = extraVideos[index];

    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.onclick = (e) => {
        if (e.target === modal) closeVideoModal(modal);
    };
    modal.innerHTML = `
        <span class="close-video" onclick="this.parentElement.remove()">&times;</span>
        <video controls autoplay>
            <source src="${vid.src}" type="video/mp4">
        </video>
    `;

    document.body.appendChild(modal);
    playFirework(0.3);
}

function closeVideoModal(modal) {
    if (modal) modal.remove();
}

/* ================== 🎊 الكونفيتي ================== */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = ['#ff6b9d', '#ffe066', '#4ecdc4', '#ff9f1c', '#a06cd5', '#ff4785'];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
    };
}

function throwConfetti() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => particles.push(createParticle()), i * 5);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        if (p.y > canvas.height + 20) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();

/* ================== ⌨️ اختصارات ================== */
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (document.activeElement.tagName !== 'VIDEO') {
            e.preventDefault();
            celebrate();   // 👈 بدل throwConfetti + playFirework
        }
    }

    const lightbox = document.getElementById('lightbox');
    if (lightbox && !lightbox.classList.contains('hidden')) {
        if (e.code === 'ArrowRight') prevImage();
        if (e.code === 'ArrowLeft') nextImage();
        if (e.code === 'Escape') lightbox.classList.add('hidden');
    }

    if (e.code === 'Escape') {
        const videoModal = document.querySelector('.video-modal');
        if (videoModal) videoModal.remove();
    }
=======
/* ================== 🎵 إدارة الصوت ================== */
const bgMusic = document.getElementById('bgMusic');
const fireworkSound = document.getElementById('fireworkSound');
let musicPlaying = false;

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if (musicPlaying) {
        bgMusic.pause();
        btn.textContent = '🔇';
        musicPlaying = false;
    } else {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(err => console.log('مشكلة تشغيل الأغنية:', err));
        btn.textContent = '🔊';
        musicPlaying = true;
    }
}

function toggleMute(event) {
    const allAudios = [bgMusic, fireworkSound].filter(a => a);
    const anyMuted = allAudios.some(a => a.muted);
    allAudios.forEach(a => a.muted = !anyMuted);
    if (event) event.target.textContent = anyMuted ? '🔇' : '🔊';
}

function playFirework(volume = 0.6) {
    if (!fireworkSound) return;
    try {
        fireworkSound.currentTime = 0;
        fireworkSound.volume = volume;
        fireworkSound.play().catch(() => {});
    } catch(e) {}
}

/* ================== 🎊 الاحتفال الكامل (صوت + كونفيتي) ================== */
function celebrate() {
    playFirework(0.7);   // 🎆 صوت الفرقعة
    throwConfetti();     // 🎊 الكونفيتي
}

/* ================== 🎬 بدء الحفلة ================== */
function startParty() {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('main').classList.remove('hidden');

    bgMusic.volume = 0.4;
    bgMusic.play().then(() => {
        musicPlaying = true;
        document.getElementById('musicBtn').textContent = '🔊';
    }).catch(err => console.log('المتصفح منع التشغيل:', err));

    playFirework(0.5);
    throwConfetti();
    loadGifts();
    loadFriendMessages();
    loadGallery();
    loadVideoGallery();
}

/* ================== 🎂 إطفاء الشمع ================== */
let candlesBlown = false;
function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    playFirework(0.7);

    const cake = document.getElementById('cake');
    cake.textContent = '🍰';
    cake.style.animation = 'none';

    setTimeout(() => {
        alert('🎉 كل سنة وأنت طيب يا طه! 🎂');
        playFirework(0.6);
        throwConfetti();
    }, 400);
}

/* ================== 🎁 الهدايا مع الصور ================== */
// ✏️ عدّل من هنا — كل هدية: صورة + من مين + الرسالة
const gifts = [
    {
        image: 'images/gift1.jpg',
        from: 'من صاحبك: نواار',
        message: 'كل سنة وانت طيب يا اخويا وعيد ميلاد سعيد وعقبال مليون سنة وتحقق اللي نفسك فيه ❤️'
    },
    {
        image: 'images/gift2.jpg',
        from: 'من صحابك: فرانك وزيكا وفينس',
        message: 'كل سنة وانت طيب يا قلبي وعقبال مليون سنة واحنا اخوات ❤️'
    }
];

function loadGifts() {
    const container = document.getElementById('giftsContainer');
    if (!container) return;
    container.innerHTML = '';

    gifts.forEach((gift, i) => {
        const box = document.createElement('div');
        box.className = 'gift-box';
        box.onclick = () => openGift(box, i);
        box.innerHTML = `🎁<span>اضغط</span>`;
        container.appendChild(box);
    });
}

function openGift(element, index) {
    const gift = gifts[index];
    if (!gift) return;

    playFirework(0.6);
    element.classList.add('opened');
    element.style.transform = 'scale(1.2)';

    setTimeout(() => {
        element.style.transform = '';
        element.innerHTML = `✅<span>اتفتحت</span>`;

        document.getElementById('giftImage').src = gift.image;
        document.getElementById('giftFrom').textContent = `🎁 ${gift.from}`;
        document.getElementById('giftText').textContent = `"${gift.message}"`;

        document.getElementById('giftModal').classList.remove('hidden');
        playFirework(0.4);
        throwConfetti();
    }, 400);
}

function closeGift() {
    document.getElementById('giftModal').classList.add('hidden');
}

/* ================== 💌 رسائل الأصحاب ================== */
const friendMessages = [
    { name: 'فينس',   text: '🥳❤️🎉 كل سنة وانت طيب يا اخويا وعيد ميلاد سعيد وعقبال مليون سنة وتحقق اللي نفسك فيه وتتمناه ويارب تكون الهدية البسيطة عجبتك' },
    { name: 'ديفل',   text: 'كل سنة وانت طيب يا قلبي وعقبال مليون سنة واحنا اخوات وتحقق كل اللي نفسك فيه ❤️' },
    { name: 'جووو',   text: 'كل سنة وأنت طيب يا سولوم يحبيب اخوك و عقبال 100 سنة بخير يارب🥳' },
    { name: 'زيكااا', text: 'كل سنة وانت طيب يا حبيب قلبي وعقبال مليون سنة ❤️' },
    { name: 'سيلفا', text: 'كل سنه وانت طيب يا حبوب وعقبال العمر كله يحبيبي ❤️' },
    { name: 'مارووكي', text: 'كل سنة وانت طيب يا روح قلبي وعقبال 100 سنة واحنا مع بعض وخوات ❤🤍' },
    { name: 'يازيد',  text: 'كل سنة وانت طيب وعقبال مليون سنة وتحقق كل اللي نفسك فيه، أجدد أخ كبير ليا 🤍🥀🎉' },
    { name: 'ماريوو', text: 'كل سنة وانت طيب يا حبيب قلبي وعقبال مليون سنة ❤️' }
];

function loadFriendMessages() {
    const wall = document.getElementById('messagesWall');
    if (!wall) return;
    wall.innerHTML = '';

    friendMessages.forEach((msg, i) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'friend-msg';
            div.innerHTML = `
                <span class="name">💌 ${msg.name}</span>
                <span class="text">${msg.text}</span>
            `;
            wall.appendChild(div);
            playFirework(0.2);
        }, i * 400);
    });
}

/* ================== 📸 معرض الصور ================== */
// ✏️ عدّل حسب الصور اللي عندك
const galleryImages = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
    'images/photo7.jpg',
    'images/photo8.jpg',
    'images/photo9.jpg',
    'images/photo10.jpg',
    'images/photo11.jpg',
    'images/photo12.jpg',
    'images/photo13.jpg',
    'images/photo14.jpg',
    'images/photo15.jpg',
    'images/photo16.jpg',
    'images/photo17.jpg',
    'images/photo18.jpg',
    'images/photo19.jpg',
    'images/photo20.jpg',
    'images/photo21.jpg',
    'images/photo22.jpg',
    'images/photo23.jpg',
    'images/photo24.jpg',
    'images/photo25.jpg',
    'images/photo26.jpg'
];

let currentImageIndex = 0;

function loadGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    galleryImages.forEach((src, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.onclick = () => openLightbox(i);
        item.innerHTML = `<img src="${src}" alt="ذكرى ${i + 1}" loading="lazy">`;
        gallery.appendChild(item);
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.remove('hidden');
    playFirework(0.3);
}

function closeLightbox(event) {
    if (event.target.id === 'lightbox' || event.target.classList.contains('lb-close')) {
        document.getElementById('lightbox').classList.add('hidden');
    }
}

function nextImage(event) {
    if (event) event.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightbox();
    playFirework(0.2);
}

function prevImage(event) {
    if (event) event.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
    playFirework(0.2);
}

function updateLightbox() {
    document.getElementById('lightboxImg').src = galleryImages[currentImageIndex];
    document.getElementById('lbCounter').textContent = 
        `${currentImageIndex + 1} / ${galleryImages.length}`;
}

/* ================== 🎬 الفيديو الرئيسي ================== */
function playMainVideo() {
    const video = document.getElementById('mainVideo');
    const overlay = document.getElementById('videoOverlay');
    if (!video) return;

    overlay.classList.add('hide');
    video.volume = 1;
    video.play().catch(err => console.log('مشكلة تشغيل الفيديو:', err));

    if (musicPlaying && bgMusic) bgMusic.pause();
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('mainVideo');
    if (!video) return;

    video.addEventListener('ended', () => {
        document.getElementById('videoOverlay').classList.remove('hide');
        if (musicPlaying && bgMusic) bgMusic.play().catch(() => {});
    });

    video.addEventListener('pause', () => {
        if (video.currentTime === 0 || video.ended) {
            document.getElementById('videoOverlay').classList.remove('hide');
        }
    });
});

/* ================== 🎥 فيديوهات إضافية ================== */
const extraVideos = [
    { 
        src: 'videos/video1.mp4', 
        poster: 'images/photo1.jpg',
        title: 'قصة كفاح',
        desc: 'أيام المعارك الجميلة'
    },
    { 
        src: 'videos/video2.mp4', 
        poster: 'images/photo2.jpg',
        title: 'أجمد حفلات ورقص',
        desc: 'تحيات فرانك'
    },
    { 
        src: 'videos/video3.mp4', 
        poster: 'images/photo3.jpg',
        title: 'أجمد حفلات ورقص',
        desc: 'تحيات يازيد'
    }
];

function loadVideoGallery() {
    const gallery = document.getElementById('videoGallery');
    if (!gallery) return;
    gallery.innerHTML = '';

    extraVideos.forEach((vid, i) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.onclick = () => openVideoModal(i);
        card.innerHTML = `
            <div class="thumb">
                <video preload="metadata" muted>
                    <source src="${vid.src}" type="video/mp4">
                </video>
            </div>
            <div class="info">
                <h4>🎬 ${vid.title}</h4>
                <p>${vid.desc}</p>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function openVideoModal(index) {
    const vid = extraVideos[index];

    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.onclick = (e) => {
        if (e.target === modal) closeVideoModal(modal);
    };
    modal.innerHTML = `
        <span class="close-video" onclick="this.parentElement.remove()">&times;</span>
        <video controls autoplay>
            <source src="${vid.src}" type="video/mp4">
        </video>
    `;

    document.body.appendChild(modal);
    playFirework(0.3);
}

function closeVideoModal(modal) {
    if (modal) modal.remove();
}

/* ================== 🎊 الكونفيتي ================== */
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = ['#ff6b9d', '#ffe066', '#4ecdc4', '#ff9f1c', '#a06cd5', '#ff4785'];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
    };
}

function throwConfetti() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => particles.push(createParticle()), i * 5);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        if (p.y > canvas.height + 20) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();

/* ================== ⌨️ اختصارات ================== */
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (document.activeElement.tagName !== 'VIDEO') {
            e.preventDefault();
            celebrate();   // 👈 بدل throwConfetti + playFirework
        }
    }

    const lightbox = document.getElementById('lightbox');
    if (lightbox && !lightbox.classList.contains('hidden')) {
        if (e.code === 'ArrowRight') prevImage();
        if (e.code === 'ArrowLeft') nextImage();
        if (e.code === 'Escape') lightbox.classList.add('hidden');
    }

    if (e.code === 'Escape') {
        const videoModal = document.querySelector('.video-modal');
        if (videoModal) videoModal.remove();
    }
>>>>>>> 2d87f03 (first upload)
});
