document.addEventListener('DOMContentLoaded', function() {
    
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    // Asignar eventos

    inputEmail.addEventListener('blur', validar);  // blur es cuando salís de un campo. La otra es usar input ya que toma el evento de cuando estás escribiendo en el campo
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e) {
        //console.log(e.target.parentElement); // Del elemento que estoy apuntando, me voy a su elemento padre
        if(e.target.value.trim() === '') {
            mostrarAlerta(`Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return; // En caso de que en el campo no haya algo escrito, me muestra el cartel de alerta y no ejecuta nada más de lo que esté abajo del método
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar Valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar email
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia); //Evita que se repitan las alertas, por eso está al principio del bloque de código

        // Generar el alerta para visualizar HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        // Inyectamos el error
        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia) {
        // Comprueba si la alerta existe
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; // Expresión regular de email
        const resultado = regex.test(email); // El método nos devuelve true o false si el string cumple con la expresión regular de email
        return resultado; //Devuelvo el tipo de dato 
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) { // Nos devuelve true si algún campo está vacío. False si todos sus campos tienen información
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
 
});