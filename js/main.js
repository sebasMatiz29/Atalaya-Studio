import { enviarContacto, obtenerServicios, obtenerTestimonios } from './api.js';
import { cargarTema, configurarAlternadorTema } from './theme.js';
import {
    configurarMenuBootstrap,
    configurarMicrointeracciones,
    renderizarCargandoServicios,
    renderizarCargandoTestimonios,
    renderizarServicios,
    renderizarTestimonios,
    validarFormulario
} from './ui.js';

const contenedorServicios = document.querySelector('#contenedor-servicios');
const contenedorTestimonios = document.querySelector('#contenedor-testimonio');
const formularioContacto = document.querySelector('form');

document.addEventListener('DOMContentLoaded', async () => {
    cargarTema();
    configurarAlternadorTema();
    configurarMenuBootstrap();
    configurarMicrointeracciones();
    renderizarCargandoServicios(contenedorServicios);
    renderizarCargandoTestimonios(contenedorTestimonios);

    try {
        const servicios = await obtenerServicios();
        if (servicios?.length && contenedorServicios) {
            renderizarServicios(servicios, contenedorServicios);
            configurarMicrointeracciones();
        }
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        renderizarError(contenedorServicios, 'No fue posible cargar los servicios en este momento.');
    }

    try {
        const testimonios = await obtenerTestimonios();
        if (testimonios?.length && contenedorTestimonios) {
            renderizarTestimonios(testimonios, contenedorTestimonios);
            configurarMicrointeracciones();
            return;
        }
        console.warn('No se encontraron testimonios para mostrar.');
    } catch (error) {
        console.error('Error al obtener testimonios:', error);
        renderizarError(contenedorTestimonios, 'No fue posible cargar los testimonios en este momento.');
    }
});

if (formularioContacto) {
    formularioContacto.addEventListener('submit', evento => validarFormulario(evento, enviarContacto));
} else {
    console.warn('Formulario de contacto no encontrado en el DOM.');
}

function renderizarError(contenedor, texto) {
    if (!contenedor) return;

    contenedor.textContent = '';
    const mensaje = document.createElement('p');
    mensaje.className = 'alert alert-warning mb-0';
    mensaje.textContent = texto;
    contenedor.appendChild(mensaje);
}
