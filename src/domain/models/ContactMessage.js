export function createContactMessage({ nombre, email, mensaje }) {
    return {
        nombre: String(nombre ?? '').trim(),
        email: String(email ?? '').trim().toLowerCase(),
        mensaje: String(mensaje ?? '').trim(),
        recibidoEn: new Date().toISOString()
    };
}
