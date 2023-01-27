/*
1. Rellena un array con los números del 1 al 10. Muestralo por consola.
2. Rellena un array con números aleatorios(10 por ejemplo). Muestralo por la consola.
3. Del array anterior, creale una copia(que no sea el mismo en sí). Muestralo por la consola.
*/

//1.
const arrayNumeros = [];

for (let i = 1; i <= 10; i++) {
    arrayNumeros.push(i);
}

console.log(arrayNumeros);



//2.

const arrayNumerosRandom = [];

function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

for (let i = 1; i <= 10; i++) {
    arrayNumerosRandom.push(obtenerRandom(1, 10));
}

console.log(arrayNumerosRandom);



//3.

//Podríamos probar guardando la misma dirección de memoria pero copia hasta el contenido del array, un ejemplo:

const nuevoArrayRandoms = arrayNumerosRandom.slice();
console.log(nuevoArrayRandoms);