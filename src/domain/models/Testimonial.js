export function createTestimonial({ name, email, company }) {
    return {
        nombre: String(name ?? 'Cliente').trim(),
        email: String(email ?? 'Correo no disponible').trim(),
        empresa: String(company?.name ?? 'Empresa no especificada').trim()
    };
}
