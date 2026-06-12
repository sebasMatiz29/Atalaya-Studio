export function createFileContactRepository() {
    const messages = [];

    return {
        async save(message) {
            messages.push(message);

            return {
                recibido: true,
                mensaje: 'La información fue validada correctamente.',
                referencia: `contacto-${messages.length}`,
                data: message
            };
        }
    };
}
