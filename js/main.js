import {obtenerUsuarios} from './api.js';
import {renderizarTestimonios, validarFormulario} from './ui.js';

const contenedorTestimonios = document.querySelector('#contenedor-testimonio');
const formularioContacto = document.querySelector('form');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const usuarios = await obtenerUsuarios();
        if (usuarios && usuarios.length > 0) {
            if (contenedorTestimonios) {
                renderizarTestimonios(usuarios, contenedorTestimonios);
            } else {
                console.warn('No existe el contenedor de testimonios en el DOM (id="contenedor-testimonio").');
            }
        } else {
            console.warn('No se encontraron usuarios para mostrar testimonios.');
        }
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
});

if (formularioContacto) {
    formularioContacto.addEventListener('submit', validarFormulario);
} else {
    console.warn('Formulario de contacto no encontrado en el DOM.');
}