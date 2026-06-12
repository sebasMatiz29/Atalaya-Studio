const TEMA_KEY = 'atalaya_tema';
const TEMA_CLARO = 'light';
const TEMA_OSCURO = 'dark';

export function cargarTema() {
    const temaGuardado = obtenerTemaGuardado();
    const temaInicial = temaGuardado === TEMA_OSCURO ? TEMA_OSCURO : TEMA_CLARO;

    aplicarTema(temaInicial);
}

export function configurarAlternadorTema() {
    const botonTema = document.querySelector('#btn-tema');

    if (!botonTema) return;

    botonTema.addEventListener('click', () => {
        const temaActual = obtenerTemaActual();
        const nuevoTema = temaActual === TEMA_CLARO ? TEMA_OSCURO : TEMA_CLARO;

        aplicarTema(nuevoTema);
        guardarTema(nuevoTema);
    });
}

function obtenerTemaActual() {
    return document.documentElement.getAttribute('data-bs-theme') || TEMA_CLARO;
}

function aplicarTema(tema) {
    document.documentElement.setAttribute('data-bs-theme', tema);
    actualizarBotonTema(tema);
}

function actualizarBotonTema(tema) {
    const botonTema = document.querySelector('#btn-tema');

    if (!botonTema) return;

    const esOscuro = tema === TEMA_OSCURO;
    botonTema.setAttribute('aria-label', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    botonTema.classList.toggle('btn-outline-light', esOscuro);
    botonTema.classList.toggle('btn-outline-secondary', !esOscuro);
    botonTema.textContent = '';

    const icono = document.createElement('span');
    icono.setAttribute('aria-hidden', 'true');
    icono.textContent = esOscuro ? '☀️' : '🌙';

    const texto = document.createElement('span');
    texto.className = 'ms-1';
    texto.textContent = esOscuro ? 'Claro' : 'Oscuro';

    botonTema.append(icono, texto);
}

function obtenerTemaGuardado() {
    try {
        return localStorage.getItem(TEMA_KEY);
    } catch (error) {
        console.warn('No fue posible leer la preferencia de tema:', error);
        return null;
    }
}

function guardarTema(tema) {
    try {
        localStorage.setItem(TEMA_KEY, tema);
    } catch (error) {
        console.warn('No fue posible guardar la preferencia de tema:', error);
    }
}
