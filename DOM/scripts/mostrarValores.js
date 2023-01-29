function mostrarValores() {
    let cadena = "";
    let formularioJs = document.forms['formularioHtml'];
    for (const elementosForm of formularioJs) {
        if (elementosForm.value !== "") {
            cadena += " " + elementosForm.value; // con ".un_atributo" podemos acceder a cualquier atributo del objeto (etiqueta) de HTML
        } else {
            alert('Elemento vacío');
        }
    }
    if(cadena !== "") {
        //console.log(cadena);
        document.getElementById('nombres').innerHTML = cadena;
    }
}

function MostrarValoresIndiviuales() {
    let formularioJs = document.forms['formElementosIndividuales'];
    let email = formularioJs['email'].value;
    let fecha = formularioJs['fecha'].value;
    document.getElementById('elementosIndividuales').innerHTML = email + " " + fecha;
}