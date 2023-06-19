(function() { // Expresión de función ejecutada inmediatamente (IIFE)
    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', editarCliente)

        // Verificar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente) { // Si hay algún id
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    })

    function obtenerCliente(idCliente) {
        const transaccion = DB.transaction(['crm'], 'readonly');
        const objectStore = transaccion.objectStore('crm');
        const cliente = objectStore.openCursor(); //Es como si me guardara el método que recorre la base de datos
        cliente.onsuccess = (e) => {
            const cursor = e.target.result; //Me da los datos de la base de datos
            if (cursor) {
                if (cursor.value.id === Number(idCliente)) {
                    llenarFormulario(cursor.value)
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente) {
        const {nombre, email, telefono, empresa } = datosCliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

    function editarCliente(e) {
        e.preventDefault();

        if ( (nombreInput.value === '') || (emailInput.value === '') || (telefonoInput.value === '') || (empresaInput.value === '') ) {
            imprimirAlerta('Todo los campos son obligatorios', 'error')
            return;
        }

        // Acualizar cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        }

        const transaccion = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaccion.objectStore('crm');
        objectStore.put(clienteActualizado);

        transaccion.oncomplete = () => {
            imprimirAlerta('Editado correctamete');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }

        transaccion.onerror = () => {
            imprimirAlerta('error al editar', 'error');
        }
    }
})();