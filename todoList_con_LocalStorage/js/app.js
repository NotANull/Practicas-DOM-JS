// Varialbes
const formulario = document.querySelector('#formulario');
const listaToDo = document.querySelector('#lista-todo');
let toDos = [];

// Event Listeners
ejecutarEventListeners();

function ejecutarEventListeners() {
    // Cuando el usuario agrega un tweet
    formulario.addEventListener('submit', agregarToDo);

    // Cuando el documento carga los tweets del localStorage
    document.addEventListener('DOMContentLoaded', () => {
        toDos = JSON.parse(localStorage.getItem('todos')) || []; //Dame los items del local storage y si no hay ninguno entonces dame el arreglo vacío

        console.log(toDos);

        agregarAlHtml();
    });

}

// Funciones

function agregarToDo(e) {
    e.preventDefault();

    const textArea = document.querySelector('#todo').value;
    if(textArea === '') {
        mostrarError('El toDo no puede ir vacío');
        return;
    }

    const toDoObj = {
        id: Date.now(),
        textArea //Si tanto llave como valor tienen el mismo nombre, podemos dejar sólo uno
    }

    // Añadiendo los tweets al arreglo
    toDos = [...toDos, toDoObj]; //Tomamos una copia de los tweets y le agregamos el tweet actual
    
    agregarAlHtml();

    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('.container');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000); //3 segundos
}

function agregarAlHtml() {

    limpiarHtml();

    if (toDos.length > 0) {
        toDos.forEach(toDo => {

            //Crear botón eliminar y darle estilos
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-todo');
            btnEliminar.textContent = 'X';

            //Añadir funcionalidad a los botones
            btnEliminar.onclick = () => {
                eliminarToDo(toDo.id);
            };

            const li = document.createElement('li');
            li.textContent = toDo.textArea //Le agregamos cada tweet a cada list item

            //Asignar el botón a cada list item
            li.appendChild(btnEliminar);

            listaToDo.appendChild(li);
        });
    }

    sincronizarLocalStorage();
}

function sincronizarLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(toDos));
}

function limpiarHtml() {
    while(listaToDo.firstChild) {
        listaToDo.removeChild(listaToDo.firstChild);
    }
}

function eliminarToDo(id) {
    toDos = toDos.filter( toDo => toDo.id !== id ); //Por cada click que le de al boton, el arreglo devuelve otro arreglo pero con el complemento al que le dio click

    agregarAlHtml();
}