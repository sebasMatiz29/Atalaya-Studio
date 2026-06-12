const API_BASE_URL = '/api';
const API_TOKEN = 'atalaya_public_demo_token';

export async function obtenerTestimonios() {
    return getJson('/testimonios');
}

export async function obtenerServicios() {
    return getJson('/servicios');
}

export async function enviarContacto(contacto) {
    const response = await fetch(`${API_BASE_URL}/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify(contacto)
    });

    return parseApiResponse(response);
}

async function getJson(path) {
    const response = await fetch(`${API_BASE_URL}${path}`);
    return parseApiResponse(response);
}

async function parseApiResponse(response) {
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
        const error = new Error(payload.message || `Error en la solicitud: ${response.status}`);
        error.details = payload.details;
        throw error;
    }

    return payload.data;
}
