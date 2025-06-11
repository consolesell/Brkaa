// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.sticky-header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger Menu Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Image Drawer Animation
document.querySelectorAll('.service-card').forEach(card => {
    const images = card.querySelectorAll('.image-drawer img');
    let current = 0;

    setInterval(() => {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
    }, 3000);
});

// Scroll-Triggered Fade-In
const fadeIns = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

fadeIns.forEach(fadeIn => observer.observe(fadeIn));

// Hide Loading Spinner After Page Load
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('hidden');
});