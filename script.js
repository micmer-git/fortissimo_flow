let selectedSubscription = 'longd_monthly_single'; // Default selection

document.addEventListener('DOMContentLoaded', function() {
    // Subscription option selection
    document.querySelectorAll('.subscription-option').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.subscription-option').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedSubscription = this.dataset.value;
        });
    });

    // Main form submission
    document.getElementById('notify-form').addEventListener('submit', handleFormSubmit);

    // Exit intent popup
    let popupShown = false;
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !popupShown) {
            document.getElementById('exitIntentOverlay').style.display = 'block';
            document.getElementById('exitIntentPopup').style.display = 'block';
            popupShown = true;
        }
    });

    document.getElementById('closePopup').addEventListener('click', closePopup);

    document.getElementById('exit-intent-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(e, 'exit-intent-form');
        closePopup();
    });
});

function handleFormSubmit(e, formId = 'notify-form') {
    e.preventDefault();
    const email = document.querySelector(`#${formId} input[type="email"]`).value;
    const messageElement = document.getElementById('form-message');

    fetch('https://script.google.com/macros/s/AKfycbxjm9zfx_0LnjFtttRcgJj1nqLUcZyY9ZxJFVk00BXessUnl4SV7eOcaduAk1dujvXg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&subscription=${encodeURIComponent(selectedSubscription)}`
    })
    .then(response => {
        messageElement.textContent = 'Thank you for subscribing!';
        messageElement.classList.remove('text-red-600');
        messageElement.classList.add('text-green-600');
        document.querySelector(`#${formId} input[type="email"]`).value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        messageElement.textContent = 'An error occurred. Please try again.';
        messageElement.classList.remove('text-green-600');
        messageElement.classList.add('text-red-600');
    });
}

function closePopup() {
    document.getElementById('exitIntentOverlay').style.display = 'none';
    document.getElementById('exitIntentPopup').style.display = 'none';
}