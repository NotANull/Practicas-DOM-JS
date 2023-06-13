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

export default Citas;