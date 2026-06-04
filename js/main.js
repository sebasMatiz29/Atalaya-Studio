import { obtenerUsuarios } from './api.js';
import { configurarMenuMovil, renderizarTestimonios, validarFormulario } from './ui.js';

const contenedorTestimonios = document.querySelector('#contenedor-testimonio');
const formularioContacto = document.querySelector('form');
const botonMenu = document.querySelector('.nav-toggle');
const menuPrincipal = document.querySelector('#menu-principal');

document.addEventListener('DOMContentLoaded', async () => {
    configurarMenuMovil(botonMenu, menuPrincipal);

    try {
        const usuarios = await obtenerUsuarios();
        if (usuarios?.length && contenedorTestimonios) {
            renderizarTestimonios(usuarios, contenedorTestimonios);
            return;
        }

        console.warn('No se encontraron testimonios para mostrar.');
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        if (contenedorTestimonios) {
            contenedorTestimonios.textContent = 'No fue posible cargar los testimonios en este momento.';
        }
    }
});

if (formularioContacto) {
    formularioContacto.addEventListener('submit', validarFormulario);
} else {
    console.warn('Formulario de contacto no encontrado en el DOM.');
}
