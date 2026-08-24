// pido datos nombres y dos umeoros (ver lo de lucas )

const nombre = prompt("Ingrese su nombre");
const apellido = prompt("Ingrese su apellido");

const numero1 = parseInt(prompt("Ingrese el primer número"));
const numero2 = parseInt(prompt("Ingrese el segundo número"));

// uso const
const suma = numero1 + numero2;

// que le aparece en el pop up de mensaje
const mensaje = "Hola, tu nombre es " + nombre + " y tu apellido es " + apellido +
    ". La suma de los números es: " + suma;

// usar condole
console.log(mensaje);

// mensaje de pop up resultado
alert(mensaje);


