import Citas from "./clases/citas.js";
import UI from "./clases/UI.js";
import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from './selectores.js'

const ui = new UI();
const administarCitas = new Citas();

//---------- VARIABLES ----------\\
let editando;

//---------- OBJETO QUE GUARDA LA INFORMACIÓN DE LA CITA ----------\\
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

export function datosCita(e) {

    //.name por el atributo que cada input
    citaObj[e.target.name] = e.target.value;

}

export function nuevaCita(e) { //Valida y agrega una nueva cita a la clase de citas

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

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    //Eliminar una cita
    administarCitas.eiliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta('Cita eliminada', 'success');

    //Refrescar las citas
    ui.imprimirCitas(administarCitas);
}

export function modificarCita(cita) {

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
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