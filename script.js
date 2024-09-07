let selectedSubscription = 'longd_monthly_single'; // Default selection

const translations = {
  en: {
    thankYou: 'Thank you for subscribing!',
    error: 'An error occurred. Please try again.',
    exitPopupTitle: 'Wait! Don\'t miss out on LONGd',
    exitPopupText: 'Subscribe now and get 10% off your first order!',
    exitPopupButton: 'Subscribe',
    exitPopupClose: 'No thanks, I\'ll pass'
  },
  it: {
    thankYou: 'Grazie per esserti iscritto!',
    error: 'Si è verificato un errore. Per favore riprova.',
    exitPopupTitle: 'Aspetta! Non perderti LONGd',
    exitPopupText: 'Iscriviti ora e ottieni il 10% di sconto sul tuo primo ordine!',
    exitPopupButton: 'Iscriviti',
    exitPopupClose: 'No grazie, passo'
  },
  es: {
    thankYou: '¡Gracias por suscribirte!',
    error: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
    exitPopupTitle: '¡Espera! No te pierdas LONGd',
    exitPopupText: '¡Suscríbete ahora y obtén un 10% de descuento en tu primer pedido!',
    exitPopupButton: 'Suscribirse',
    exitPopupClose: 'No, gracias, paso'
  }
};

const lang = document.documentElement.lang || 'en';

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

    // Aggiorna il testo del popup in base alla lingua
    document.querySelector('#exitIntentPopup h2').textContent = translations[lang].exitPopupTitle;
    document.querySelector('#exitIntentPopup p').textContent = translations[lang].exitPopupText;
    document.querySelector('#exit-intent-form button').textContent = translations[lang].exitPopupButton;
    document.querySelector('#closePopup').textContent = translations[lang].exitPopupClose;
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
        messageElement.textContent = translations[lang].thankYou;
        messageElement.classList.remove('text-red-600');
        messageElement.classList.add('text-green-600');
        document.querySelector(`#${formId} input[type="email"]`).value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        messageElement.textContent = translations[lang].error;
        messageElement.classList.remove('text-green-600');
        messageElement.classList.add('text-red-600');
    });
}

function closePopup() {
    document.getElementById('exitIntentOverlay').style.display = 'none';
    document.getElementById('exitIntentPopup').style.display = 'none';
}