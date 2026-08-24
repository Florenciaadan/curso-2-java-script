// Acá empiezo a pedir los datos al usuario

const nombre = prompt("Ingrese su nombre");
const apellido = prompt("Ingrese su apellido");

const numero1 = parseInt(prompt("Ingrese el primer número"));
const numero2 = parseInt(prompt("Ingrese el segundo número"));

// Acá hago la cuenta con los dos números
const suma = numero1 + numero2;

// Acá armo el mensaje con los datos que ingresó el usuario
const mensaje = "Hola, tu nombre es " + nombre + " y tu apellido es " + apellido +
    ". La suma de los números es: " + suma;

// Acá muestro el resultado en la consola
console.log(mensaje);

// Acá también muestro el resultado con una alerta
alert(mensaje);


