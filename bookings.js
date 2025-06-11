// Replace with your actual Gmail address
const YOUR_EMAIL = 'excellencesammy@gmail.com';

// Update the email input field with your actual email
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.value = YOUR_EMAIL;
    }
    
    // Show loading overlay initially, then hide after 2 seconds
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);
});

// Copy email function
function copyEmail() {
    const emailInput = document.getElementById('emailInput');
    const copyFeedback = document.getElementById('copyFeedback');
    
    // Select and copy the email
    emailInput.select();
    emailInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        
        // Show feedback
        copyFeedback.classList.add('show');
        
        // Hide feedback after 2 seconds
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy email: ', err);
    }
    
    // Deselect the input
    window.getSelection().removeAllRanges();
}

// Book service function
function bookService() {
    // Create email subject and body
    const subject = 'Travel Booking Request - Excellence Travel Solutions Africa';
    const body = `Hello Excellence Travel Solutions Africa,

I would like to make a travel booking inquiry.

Please contact me with available packages, dates, and pricing information.

Thank you for your service!

Best regards`;
    
    // Encode the subject and body for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Create Gmail compose URL
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${YOUR_EMAIL}&su=${encodedSubject}&body=${encodedBody}`;
    
    // Open Gmail in a new tab
    window.open(gmailURL, '_blank');
}

// Alternative copy function using modern Clipboard API (fallback)
async function copyEmailModern() {
    const emailInput = document.getElementById('emailInput');
    const copyFeedback = document.getElementById('copyFeedback');
    
    try {
        await navigator.clipboard.writeText(YOUR_EMAIL);
        
        // Show feedback
        copyFeedback.classList.add('show');
        
        // Hide feedback after 2 seconds
        setTimeout(() => {
            copyFeedback.classList.remove('show');
        }, 2000);
        
    } catch (err) {
        // Fallback to older method
        copyEmail();
    }
}

// Check if modern clipboard API is available and use it
if (navigator.clipboard && window.isSecureContext) {
    // Override the copyEmail function with modern version
    window.copyEmail = copyEmailModern;
}
