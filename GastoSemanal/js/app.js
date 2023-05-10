// Variables y selectors

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

llamarEventos();

function llamarEventos() {

    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);

}

// Clases

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter( gasto => gasto.id !== id ); //Traeme todos los id menos el que quiero eliminar
        this.calcularRestante();
    }
}

class Ui { //User Interface
    insertarPresupuesto(cantidad){

        // Extrayendo los valores
        const{presupuesto, restante} = cantidad;

        // Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }

    imprimirAlerta(mensaje, status) {
        // Creamos el elemento html
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (status === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        // Insertamos el elemento creado en el html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Le setteamos un timer al cartel
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos) {
        
        this.limpiarHTML();

        // Iteramos sobre los gastos
        gastos.forEach(element => {
            
            const {nombre, cantidad, id} = element;

            // Creamos LI para el elemento UL
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Crear el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>`

            // Crear un botón para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            // insertar todo al HTML
            gastoListado.appendChild(nuevoGasto);
        });

    }

    limpiarHTML() {
        while(gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObjeto) {
        const {presupuesto, restante} = presupuestoObjeto;

        const restanteDiv = document.querySelector('.restante');

        if ( (presupuesto / 4) > restante ) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } else if ( (presupuesto / 2) > restante ) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        // Si el total es 0 o menor
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }


}

let presupuesto
const ui = new Ui();

// funciones

function preguntarPresupuesto() {

    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');

    if( (presupuestoUsuario === '') || (presupuestoUsuario === null) || (isNaN(presupuestoUsuario)) || (presupuestoUsuario <= 0) ) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    
    ui.insertarPresupuesto(presupuesto);
}

// Añadir gasto
function agregarGasto(e) {
    e.preventDefault();
    
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if ( (nombre === '') || (cantidad === '')) {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return; // Para que no se siga ejecutando el código
    } else if ( (cantidad <= 0) || (isNaN(cantidad)) ){
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return; // Para que no se siga ejecutando el código
    }

    // Object literal. Si tanto llave como valor tienen el mismo nombre pues dejo uno solo
    const gasto = {nombre, cantidad, id: Date.now()};

    // agregawr un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta("Gasto agregado correctamente");

    // Vamos a imprimir los gastos
    const {gastos, restante} = presupuesto; //Aplicando destructuring...
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();
}

function eliminarGasto(id) {
    // Elimina los gastos del objeto
    presupuesto.eliminarGasto(id);

    // Eliminar los gastos del HTML
    const { gastos, restante } = presupuesto
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}