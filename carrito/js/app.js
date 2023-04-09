// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Evento cuando hacemos click en el botón 'AGREGAR AL CARRITO'
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos del local storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHTML();
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', (e) => {
        e.preventDefault();

        articulosCarrito = []; //Reiniciamos el arreglo

        limpiarHTML(); //Limpiamos el HTML
    });
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        extraerInformacion(cursoSeleccionado);
    }
}

// Eliminar un curso del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id');
        
        // Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); //Que se traiga todos menos el id que queremos eliminar

        carritoHTML();
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function extraerInformacion(curso) {
    // console.log(curso);
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span.u-pull-right').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); // Verificamos si en el arreglo hay un curso con el mismo id
    if(existe) { // En caso verdadero
        const cursos = articulosCarrito.map( curso => { // Creo un nuevo arreglo y recorro el original
            if (curso.id === infoCurso.id) { // Si en el arreglo se encuentra ese id
                curso.cantidad++; // Incremento la cantidad
                return curso; // Retorno el arreglo y lo guardo en el duplicado (no sigo recorriendo)
            } else {
                return curso; // Sino retorno el arreglo como estaba
            }
        });
        articulosCarrito = [...cursos]; // Por último acoplo el arreglo duplicado con el original
    } else {
        // Agregar elementos al carrito utilizando Spread Operator
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    // console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el HTML y general el html
    articulosCarrito.forEach(curso => {
        const {imagen, nombre, precio, id, cantidad} = curso; //Destructuring
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width="150"> </td>
            <td> ${nombre} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}">X</a> </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del tbody
function limpiarHTML() {
    //contenedorCarrito.innerHTML = ''; // Manera lenta de eliminar un elemento html

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    /*
        El while funciona de la siguiente manera

        <div>
            <p>1</p> primera vuelta del for elimina siempre el primer hijo
            <p>2</p> como se elimina el primer hijo, el segundo para a ser el primero
            <p>3</p> así sucesivamente con los demás hijos
        </div>
    */
}