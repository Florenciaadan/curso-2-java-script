// pido datos nombres y dos umeoros (ver lo de lucas )

const nombre = prompt("ingrese su nombre");
const producto = prompt("que producto queres comprar");
const precio = parseFloat(prompt("cual es el precio del producto?"));
const cantidad = parseInt(prompt("que cantidad queres comprar de ese producto??"));

// uso const
// calculo presupuesto
const total = precio * cantidad;

let seguir = true;


// si es verdadero se ejecuta: 
while (seguir) {

    // chequeo si el valor es mayor a $100 k, y devuelve mensaje
    if (total > 100000) {
        console.log("Tu compra supera los $100.000.");
    } else {
        console.log("Tu compra está dentro de tu presupuestto");
    }

    // bucle despues del chequeo 
    seguir = false;
}

/// resultado 
const mensaje = "hola " + nombre + ", compraste " + cantidad + 
    " unidades de " + producto + 
    ". El total de tu compra es: $" + total;

console.log(mensaje);
alert(mensaje);


