// Form Handling
const form = document.getElementById('bookingForm');
const steps = form.querySelectorAll('.step');
const progress = document.querySelector('.progress');
let currentStep = 1;

function showStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    steps[step - 1].classList.add('active');
    progress.style.width = `${((step - 1) / (steps.length - 1)) * 100}%`;
}

form.addEventListener('click', (e) => {
    if (e.target.classList.contains('next-btn') && form.checkValidity()) {
        currentStep++;
        showStep(currentStep);
    } else if (e.target.classList.contains('prev-btn')) {
        currentStep--;
        showStep(currentStep);
    }
});

form.addEventListener('input', () => {
    if (currentStep === 3) {
        const travelers = form.travelers.value;
        const service = form.service.value;
        const price = calculatePrice(service, travelers);
        document.getElementById('priceQuote').textContent = `Estimated Price: KSH ${price}`;
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = form.service.value;
    const date = form.date.value;
    const pickup = form.pickup.value;
    const dropoff = form.dropoff.value;
    const travelers = form.travelers.value;
    const price = calculatePrice(service, travelers);

    const body = `Service: ${service}\nDate: ${date}\nPickup: ${pickup}\nDropoff: ${dropoff}\nTravelers: ${travelers}\nEstimated Price: KSH ${price}`;
    const encodedBody = encodeURIComponent(body);
    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=sblgivan@gmail.com&su=New%20Booking&body=${encodedBody}`;

    window.location.href = gmailUrl;
});

// Price Calculation
function calculatePrice(service, travelers) {
    const baseRates = {
        'hotel-transfers': 1000,
        'airport-sgr-transfers': 1500
        // Add more services as needed
    };
    return (baseRates[service] || 1000) * travelers;
}

// Geolocation (optional)
navigator.geolocation.getCurrentPosition(position => {
    document.getElementById('pickup').value = `${position.coords.latitude}, ${position.coords.longitude}`;
}, () => {
    document.getElementById('pickup').placeholder = "Geolocation unavailable, enter manually";
});

// Scroll Animation
const fadeIns = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

fadeIns.forEach(fadeIn => observer.observe(fadeIn));