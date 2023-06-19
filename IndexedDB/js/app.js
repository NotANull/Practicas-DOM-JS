(function() { // Expresión de función ejecutada inmediatamente (IIFE)

    let DB; // Declaramos una variable que va a guardar el valor de la base de datos
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {

        crearDB(); // Llamada a la función que crea la base de datos

        if (window.indexedDB.open('crm', 1)) { // Si ejecuta bien la base de datos entonces
            mostrarClientes(); // Llamo al método que me lista los clientes de la base de datos
        }

        listadoClientes.addEventListener('click', editarRegistro)
        listadoClientes.addEventListener('click', eliminarRegistro)
    });

    // función que crea la base de datos
    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1); //Abrimos una conexión

        crearDB.onerror = () => {
            console.log('Error al querer crear la base de datos');
        };

        crearDB.onsuccess = () => {
            DB = crearDB.result;
        };

        crearDB.onupgradeneeded = (e) => {

            const db = e.target.result;
            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            // Definamos los campos
            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});
            
            console.log('Configuración exitosa');
        };
    }

    function mostrarClientes() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = () => {
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = (e) => {
                const cursor = e.target.result;

                if (cursor) {
                    const {nombre, empresa, email, telefono, id} = cursor.value

                    listadoClientes.innerHTML += 
                        ` <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="#" data-cliente="${id}" class="text-teal-600 hover:text-teal-900 mr-5 editar">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>`;

                    cursor.continue();
                } else {
                    console.log('No hay más registros...');
                }
            };
        };
    }

    function eliminarRegistro(e) {
        e.preventDefault();

        if(e.target.classList.contains('eliminar')) {
            const idEliminar = Number(e.target.dataset.cliente);
            const confirmar = confirm('¿Desedeas eliminar este cliente?')
            if (confirmar) {
                const transaccion = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaccion.objectStore('crm');
                objectStore.delete(idEliminar);

                transaccion.oncomplete = () => {
                    e.target.parentElement.parentElement.remove();
                }

                transaccion.onerror = () => {
                    console.log('Hubo un problema al eliminar el cliente');
                }
            }
        }
    }

    function editarRegistro(e) {
        e.preventDefault();
        if (e.target.classList.contains('editar')) {
            const id = Number(e.target.dataset.cliente);
            location.href = `editar-cliente.html?id=${id}`;
        }
    }
})();