function unaFuncion(a, b, c) {
    console.log("Cantidad de argumentos recibidos: " + arguments.length); //Nos devuelve la cantidad de parámetros que recibe la función. Este método SÓLO SE UESA DENTRO DEL CUERPO DE LA FUNCIÓN
    console.log(a);
    return (b * c);
}

console.log(unaFuncion("abc", 3, 3));