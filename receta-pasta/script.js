// script.js - Adaptado 100% a tu HTML

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('recetaForm');
    const visitCounter = document.getElementById('visitCounter');

    // Contador de visitas (opcional, no obligatorio)
    if (visitCounter) {
        let visits = localStorage.getItem('pastaAlfredoVisits');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('pastaAlfredoVisits', visits);
        visitCounter.textContent = visits;
    }

    // Validación del formulario
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const calificacion = document.getElementById('calificacion').value;

            if (!nombre || !email || !calificacion) {
                alert('Por favor, completa todos los campos obligatorios (nombre, correo y calificación).');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Mensaje de éxito
            const successMessage = document.createElement('p');
            successMessage.textContent = '¡Gracias por tu reseña! 🍝';
            successMessage.style.color = '#28a745';
            successMessage.style.fontWeight = 'bold';
            successMessage.style.marginTop = '15px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontSize = '1.1em';

            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.insertAdjacentElement('afterend', successMessage);

            form.reset();

            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

    // Funcionalidad: marcar pasos como completados
    const steps = document.querySelectorAll('.step-item');
    steps.forEach(step => {
        step.addEventListener('click', function () {
            this.classList.toggle('completed');
        });
    });
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}