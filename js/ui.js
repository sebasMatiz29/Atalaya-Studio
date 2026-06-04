export function renderizarTestimonios(usuarios, contenedor) {
    contenedor.textContent = '';

    usuarios.slice(0, 3).forEach(usuario => {
        const testimonio = document.createElement('article');
        testimonio.classList.add('card', 'testimonial-card');

        const nombre = document.createElement('h3');
        nombre.textContent = usuario.name ?? 'Cliente';

        const empresa = document.createElement('p');
        empresa.textContent = 'Trabaja en: ';

        const empresaNombre = document.createElement('strong');
        empresaNombre.textContent = usuario.company?.name ?? 'Empresa no especificada';

        const email = document.createElement('small');
        email.textContent = usuario.email ?? 'Correo no disponible';

        empresa.appendChild(empresaNombre);
        testimonio.append(nombre, empresa, email);
        contenedor.appendChild(testimonio);
    });
}

export function configurarMenuMovil(botonMenu, menuPrincipal) {
    if (!botonMenu || !menuPrincipal) return;

    botonMenu.addEventListener('click', () => {
        const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
        botonMenu.setAttribute('aria-expanded', String(!estaAbierto));
        menuPrincipal.classList.toggle('is-open', !estaAbierto);
    });

    menuPrincipal.querySelectorAll('a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            botonMenu.setAttribute('aria-expanded', 'false');
            menuPrincipal.classList.remove('is-open');
        });
    });
}

export function validarFormulario(evento) {
    evento.preventDefault();

    const formulario = evento.target;
    const nombre = formulario.querySelector('#nombre').value.trim();
    const email = formulario.querySelector('#email').value.trim();
    const mensaje = formulario.querySelector('#mensaje').value.trim();
    const estado = formulario.querySelector('.form-status');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nombre || !email || !mensaje) {
        estado.textContent = 'Por favor, completa todos los campos.';
        return;
    }

    if (!emailValido) {
        estado.textContent = 'Por favor, ingresa un correo electrónico válido.';
        return;
    }

    estado.textContent = 'Formulario enviado correctamente. Gracias por contactarnos.';
    formulario.reset();
}
