
const API_ENDPOINT = '/api/contact';

// Capturamos elementos del DOM
const form = document.getElementById('contactForm');
const feedbackEl = document.getElementById('formFeedback');

// Función para mostara feddback al usuario
function showFeedback(message, type = 'success') {
    feedbackEl.textContent = message;
    feedbackEl.className = type === `alert alert-${type}`;
}

// Handler del evento submit del formulario
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    feedbackEl.textContent = ''; // Limpiar feedback previo

    const email = document.getElementById('email').value.trim();

    const message = document.getElementById('message').value.trim();

    // Validación básica en el frontend
    if (!email || !message) {
        showFeedback('Por favor, completa todos los campos.', 'warning');
        return;
    }

    try {
        // Enviar datos al servidor
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, message }),
        });

        // Verificar si la respuesta es exitosa (200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al enviar el mensaje');
        }

        showFeedback('Mensaje enviado correctamente.', 'success');
        form.reset(); // Limpiar el formulario después del envío exitoso
    } catch (err) {
        console.error('Error al enviar el mensaje:', err);
        showFeedback('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', 'danger');
    }
});