(function() { // IIFE
    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarcliente)
    });

    function validarcliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if( (nombre === '') || (email === '') || (telefono === '') || (empresa === '') ) {
            imprimirAlerta('Todo los campos son obligatorios', 'error')
            return;
        }

        //Creamos un objeto con la información
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        }

        cliente.id = Date.now(); // Si el objeto está sellado no pdemos darle propiedades

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        const transaccion = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaccion.objectStore('crm');

        objectStore.add(cliente);

        transaccion.onerror = () => {
           imprimirAlerta('El email ya está en uso', 'error');
        };

        transaccion.oncomplete = () => {
            imprimirAlerta('El cliente se agregó correctamente'); // No es necesario un segundo parámetro ya que tomaría el valor de undefined

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };
    }

})();