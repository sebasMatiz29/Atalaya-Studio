import { createContactMessage } from '../../domain/models/ContactMessage.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createContactService({ contactRepository }) {
    return {
        async sendContactMessage(payload) {
            const message = createContactMessage(payload);
            const errors = validateContactMessage(message);

            if (errors.length > 0) {
                const error = new Error('La información enviada no es válida.');
                error.statusCode = 400;
                error.details = errors;
                throw error;
            }

            return contactRepository.save(message);
        }
    };
}

function validateContactMessage(message) {
    const errors = [];

    if (!message.nombre) errors.push('El nombre es obligatorio.');
    if (!EMAIL_REGEX.test(message.email)) errors.push('El correo electrónico no es válido.');
    if (!message.mensaje) errors.push('El mensaje es obligatorio.');
    if (message.mensaje.length > 1000) errors.push('El mensaje no puede superar los 1000 caracteres.');

    return errors;
}
