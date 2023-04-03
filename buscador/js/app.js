// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : ''
}


const maxYear = new Date().getFullYear(); //Año actual
const minYear = (maxYear - 10); //10 años menos que el actual

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //Muestra los autos al momento de cargar la página

    // Llenamos las opciones de años
    llenarSelect();
});

// Event listener para los select de búsqueda
marca.addEventListener( 'change', (e) => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener( 'change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener( 'change', (e) => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener( 'change', (e) => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener( 'change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener( 'change', (e) => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener( 'change', (e) => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});

// Funciones

function mostrarAutos(autos) {

    limpiarHtml(); //Limpiamos el html previo

    autos.forEach(auto => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto; // Aplicando destructuring
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - $${precio} - ${puertas} puertas - Color ${color} - ${transmision}
        `;

        // Insertar en el html
        resultado.appendChild(autoHTML);
    });
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {
    for (let i = maxYear; i >= minYear; i--) {
        const opcion = document.createElement('option'); //Para el select
        opcion.value = i; //Se le asigna un valor
        opcion.textContent = i; //Se le asigna la vista
        year.appendChild(opcion);
    }

}

// Filtrar por campo
function filtrarAuto() {

    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        sinResultado();
    }
    
}

function sinResultado() {

    limpiarHtml(); //Limpiamos el html previo

    const autoHTML = document.createElement('p');
    autoHTML.textContent = 'No hay resultados';

    // Insertar en el html
    resultado.appendChild(autoHTML);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}