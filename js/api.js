export async function obtenerUsuarios() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}