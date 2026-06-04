export function renderizarTestimonios(usuarios, contenedor) {
    
    const muestra = usuarios.slice(0, 3);
    muestra.forEach(usuario => {
        const testimonio = document.createElement('article');
        testimonio.innerHTML = `
            <h3>${usuario.name}</h3>
            <p>Trabaja en: <strong>${usuario.company.name}</strong></p>
           <small>${usuario.email}</small>
           <hr>
        `;
        contenedor.appendChild(testimonio);
    });
}

export function validarFormulario(evento) {
    evento.preventDefault();

    const formulario = evento.target;
    const nombre = formulario.querySelector('#nombre').value.trim();
    const email = formulario.querySelector('#email').value.trim();
    if (!nombre || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }   
    if(!email.includes('@')) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    confirm('Formulario enviado correctamente. ¡Gracias por contactarnos!');
    formulario.reset();
}