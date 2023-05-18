// Variables
const formulario = document.querySelector('#formulario');
const inputCantidad = document.querySelector('#inputCantidad');
const inputCategoria = document.querySelector('#inputCategoria');
const totalAPagar = document.querySelector('#totalAPagar');
const btnBorrar = document.querySelector('#btnBorrar');
const btnResumen = document.querySelector('#btnResumen');

// Event Listener
eventListeners(); //Llamamos al método

function eventListeners() {
    btnBorrar.addEventListener('click', resetearFormulario);
    btnResumen.addEventListener('click', calcularResumen);
}

// Funciones

function calcularResumen() {
    
    if ( (inputCantidad.value === '') || (isNaN(inputCantidad.value)) || (inputCantidad.value <= 0) ){
        alert('Por favor, introduce una cantidad válida');
        inputCantidad.value = '';
        return;
    }

    elegirCategoria();
}

function elegirCategoria() {
    let categoria = inputCategoria.value;
    let descuento;
    let cantidad = inputCantidad.value;
    let precioTotal;
    if (categoria === 'Estudiante') {
        descuento = (200 * 0.8);
        precioTotal = (cantidad * (200 - descuento));
    } else if (categoria === 'Trainee') {
        descuento = (200 * 0.5);
        precioTotal = (cantidad * (200 - descuento));
    } else if(categoria === 'Junior') {
        descuento = (200 * 0.15);
        precioTotal = (cantidad * (200 - descuento));
    } else {
        alert('Por favor, alija una categoría');
        return;
    }

    
    crearTotalAPagar(precioTotal)
}

function crearTotalAPagar(precio) {
    
    limpiarHtml();

    totalAPagar.setAttribute('class', '"col-12 p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3"');
    
    const spanTotalAPagar = document.createElement('span');
    spanTotalAPagar.textContent = `Total a pagar: $${precio}`;
    
    totalAPagar.appendChild(spanTotalAPagar);
    
}

function resetearFormulario() {
    formulario.reset();
    limpiarHtml()
}

function limpiarHtml() {
    while (totalAPagar.firstChild) {
        totalAPagar.removeChild(totalAPagar.firstChild);
        totalAPagar.removeAttribute('class');
    }
}