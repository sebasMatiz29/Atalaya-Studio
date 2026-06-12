export function createService({ id, titulo, descripcion }) {
    return {
        id: String(id ?? '').trim(),
        titulo: String(titulo ?? '').trim(),
        descripcion: String(descripcion ?? '').trim()
    };
}
