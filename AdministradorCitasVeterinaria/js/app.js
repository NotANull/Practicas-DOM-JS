//---------- VARIABLES ----------\\

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horInputa = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

let editando;

//---------- DEFINICIÓN DE CLASES ----------\\

class Citas {

    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eiliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id); //Me devuelve todos los ids que son diferentes al que se pasa por parámetro
    }

    editarCita(citaActualizada) {

        //Si el id actual es igual a la citaActualizada entonces guardo la cita actualizada sino mantengo la cita anterior
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

class UI { //User Interface

    imprimirAlerta(mensaje, status) {

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if (status === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }

    imprimirCitas({citas}) { //SE LE PUEDE APLICAR DESTRUCTURING A UN OBJECT LITERAL DESDE EL PARÁMETRO!!!! En este caso vendría a contener el arreglo

        this.limpiarHtml();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span>${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span>${fecha}
            `;
            
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span>${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: </span>${sintomas}
            `;

            //Botón para eliminar una cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar';

            btnEliminar.onclick = () => eliminarCita(id);

            //Botón para eliminar una cita
            const btnModificar = document.createElement('button');
            btnModificar.classList.add('btn', 'btn-info', 'mr-2');
            btnModificar.innerHTML = 'Modificar';

            btnModificar.onclick = () => modificarCita(cita);

            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnModificar);
            
            //Insertamos el div en el HTML
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHtml() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

const ui = new UI();
const administarCitas = new Citas();

//---------- EVENTOS ----------\\

eventListeners(); //Llamamos al método

function eventListeners() {

    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horInputa.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);

}

//---------- OBJETO QUE GUARDA LA INFORMACIÓN DE LA CITA ----------\\
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//---------- FUNCIONES ----------\\

function datosCita(e) {

    //.name por el atributo que cada input
    citaObj[e.target.name] = e.target.value;

}

function nuevaCita(e) { //Valida y agrega una nueva cita a la clase de citas

    e.preventDefault();

    //Extraer la información del objeto de cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //Validar cada input
    if ( (mascota === '') || (propietario === '') || (telefono === '') || (fecha === '') || (hora === '') || (sintomas === '') ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        
        return;
    }

    if (editando) {

        ui.imprimirAlerta('Editado exitosamente', 'success');

        administarCitas.editarCita({...citaObj});

        //Volvemos el botón a su estado anterior
        formulario.querySelector('button[type="submit"]').textContent = "Crear cita";

        //Saliendo del modo edición
        editando = false;
    } else {
         //Generar un id único a cada cita
        citaObj.id = Date.now();
    
        //Creando una nueva cita
        administarCitas.agregarCita({...citaObj}); //Le pasamos la copia del objeto

        //Mensaje de cita agregada
        ui.imprimirAlerta('Cita agregada exitosamente', 'success');
    }

   

    reiniciarObjeto();

    formulario.reset();

    //Mostrar las citas en HTML
    ui.imprimirCitas(administarCitas);

}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    //Eliminar una cita
    administarCitas.eiliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta('Cita eliminada', 'success');

    //Refrescar las citas
    ui.imprimirCitas(administarCitas);
}

function modificarCita(cita) {

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horInputa.value = hora;
    sintomasInput.value = sintomas;

    //Tenemos que llenar el objeto ya que a pesar que los valores se pongan en el input, el objeto sigue estando vacío
    //Ya que una vez que se agregó una nueva cita, el objeto tiene que vaciar sus valores.
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    formulario.querySelector('button[type="submit"]').textContent = "Guardar cambios";

    editando = true;
}