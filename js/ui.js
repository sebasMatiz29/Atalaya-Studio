export function configurarMenuBootstrap() {
    const botonMenu = document.querySelector('.navbar-toggler');
    const menuPrincipal = document.querySelector('#menu-principal');

    if (!botonMenu || !menuPrincipal) return;

    botonMenu.addEventListener('click', () => {
        const estaAbierto = menuPrincipal.classList.toggle('show');
        botonMenu.setAttribute('aria-expanded', String(estaAbierto));
    });

    menuPrincipal.querySelectorAll('.nav-link').forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuPrincipal.classList.remove('show');
            botonMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

export function renderizarCargandoTestimonios(contenedor) {
    renderizarCargandoTarjetas(contenedor);
}

export function renderizarCargandoServicios(contenedor) {
    renderizarCargandoTarjetas(contenedor);
}

function renderizarCargandoTarjetas(contenedor) {
    if (!contenedor) return;

    contenedor.textContent = '';

    for (let index = 0; index < 3; index += 1) {
        const columna = document.createElement('div');
        columna.className = 'col';

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card h-100 border-0 shadow-sm placeholder-glow';
        tarjeta.setAttribute('aria-hidden', 'true');

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body p-4';

        const titulo = document.createElement('span');
        titulo.className = 'placeholder col-8 mb-3 d-block';

        const texto = document.createElement('span');
        texto.className = 'placeholder col-12 mb-2 d-block';

        const textoCorto = document.createElement('span');
        textoCorto.className = 'placeholder col-6 d-block';

        cuerpo.append(titulo, texto, textoCorto);
        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);
        contenedor.appendChild(columna);
    }
}

export function renderizarServicios(servicios, contenedor) {
    contenedor.textContent = '';

    servicios.forEach(servicio => {
        const columna = document.createElement('div');
        columna.className = 'col';

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card h-100 border-0 shadow-sm interactive-card fade show';
        tarjeta.tabIndex = 0;

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body p-4';

        const titulo = document.createElement('h3');
        titulo.className = 'h5 card-title';
        titulo.textContent = servicio.titulo ?? 'Servicio';

        const descripcion = document.createElement('p');
        descripcion.className = 'card-text text-secondary';
        descripcion.textContent = servicio.descripcion ?? 'Descripción no disponible.';

        cuerpo.append(titulo, descripcion);
        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);
        contenedor.appendChild(columna);
    });
}

export function renderizarTestimonios(testimonios, contenedor) {
    contenedor.textContent = '';

    testimonios.forEach(testimonioData => {
        const columna = document.createElement('div');
        columna.className = 'col';

        const testimonio = document.createElement('article');
        testimonio.className = 'card h-100 border-0 shadow-sm interactive-card fade show';
        testimonio.tabIndex = 0;

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body p-4';

        const nombre = document.createElement('h3');
        nombre.className = 'h5 card-title';
        nombre.textContent = testimonioData.nombre ?? 'Cliente';

        const empresa = document.createElement('p');
        empresa.className = 'card-text text-secondary mb-3';
        empresa.textContent = 'Trabaja en: ';

        const empresaNombre = document.createElement('strong');
        empresaNombre.textContent = testimonioData.empresa ?? 'Empresa no especificada';

        const email = document.createElement('small');
        email.className = 'badge text-bg-light text-primary border';
        email.textContent = testimonioData.email ?? 'Correo no disponible';

        empresa.appendChild(empresaNombre);
        cuerpo.append(nombre, empresa, email);
        testimonio.appendChild(cuerpo);
        columna.appendChild(testimonio);
        contenedor.appendChild(columna);
    });
}

export function configurarMicrointeracciones() {
    document.querySelectorAll('.interactive-card').forEach(tarjeta => {
        if (tarjeta.dataset.microReady === 'true') return;
        tarjeta.dataset.microReady = 'true';

        const activar = () => {
            tarjeta.classList.remove('shadow-sm');
            tarjeta.classList.add('shadow-lg', 'border', 'border-primary');
        };

        const desactivar = () => {
            tarjeta.classList.add('shadow-sm');
            tarjeta.classList.remove('shadow-lg', 'border', 'border-primary');
        };

        tarjeta.addEventListener('mouseenter', activar);
        tarjeta.addEventListener('mouseleave', desactivar);
        tarjeta.addEventListener('focus', activar);
        tarjeta.addEventListener('blur', desactivar);
    });

    document.querySelectorAll('.nav-link').forEach(enlace => {
        if (enlace.dataset.microReady === 'true') return;
        enlace.dataset.microReady = 'true';

        enlace.addEventListener('click', () => {
            document.querySelectorAll('.nav-link.active').forEach(activo => activo.classList.remove('active'));
            enlace.classList.add('active');
        });
    });

    document.querySelectorAll('.micro-cta').forEach(boton => {
        if (boton.dataset.microReady === 'true') return;
        boton.dataset.microReady = 'true';

        boton.addEventListener('click', () => {
            boton.classList.add('btn-warning', 'text-dark');
            boton.classList.remove('btn-primary');
            setTimeout(() => {
                boton.classList.add('btn-primary');
                boton.classList.remove('btn-warning', 'text-dark');
            }, 650);
        });
    });
}

export async function validarFormulario(evento, enviarContacto) {
    evento.preventDefault();

    const formulario = evento.target;
    const botonEnviar = formulario.querySelector('button[type="submit"]');
    const estado = formulario.querySelector('.form-status');
    const nombre = formulario.querySelector('#nombre');
    const email = formulario.querySelector('#email');
    const mensaje = formulario.querySelector('#mensaje');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    limpiarEstadoFormulario([nombre, email, mensaje], estado);

    const hayCamposVacios = !nombre.value.trim() || !email.value.trim() || !mensaje.value.trim();

    if (hayCamposVacios || !emailValido) {
        marcarCampo(nombre, Boolean(nombre.value.trim()));
        marcarCampo(email, Boolean(email.value.trim()) && emailValido);
        marcarCampo(mensaje, Boolean(mensaje.value.trim()));
        mostrarEstado(estado, 'Por favor, revisa los campos marcados antes de enviar.', 'danger');
        return;
    }

    if (typeof enviarContacto !== 'function') {
        mostrarEstado(estado, 'No fue posible conectar el formulario con el servidor.', 'danger');
        return;
    }

    [nombre, email, mensaje].forEach(campo => marcarCampo(campo, true));
    botonEnviar.disabled = true;
    botonEnviar.textContent = '';
    const spinner = document.createElement('span');
    spinner.className = 'spinner-border spinner-border-sm me-2';
    spinner.setAttribute('aria-hidden', 'true');
    botonEnviar.append(spinner, 'Enviando...');
    mostrarEstado(estado, 'Estamos procesando tu mensaje.', 'info');

    try {
        await enviarContacto({
            nombre: nombre.value,
            email: email.value,
            mensaje: mensaje.value
        });

        mostrarEstado(estado, 'Formulario enviado correctamente. Gracias por contactarnos.', 'success');
        formulario.reset();
        [nombre, email, mensaje].forEach(campo => campo.classList.remove('is-valid'));
    } catch (error) {
        console.error('Error al enviar contacto:', error);
        mostrarEstado(estado, error.message || 'No fue posible enviar el formulario.', 'danger');
    } finally {
        botonEnviar.disabled = false;
        botonEnviar.textContent = 'Enviar mensaje';
    }
}

function marcarCampo(campo, esValido) {
    campo.classList.toggle('is-valid', esValido);
    campo.classList.toggle('is-invalid', !esValido);
}

function limpiarEstadoFormulario(campos, estado) {
    campos.forEach(campo => campo.classList.remove('is-valid', 'is-invalid'));
    estado.className = 'form-status alert d-none mb-3';
    estado.textContent = '';
}

function mostrarEstado(estado, mensaje, tipo) {
    estado.className = `form-status alert alert-${tipo} mb-3`;
    estado.textContent = mensaje;
}
