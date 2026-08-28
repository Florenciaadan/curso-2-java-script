// pido datos del producto

let seguir = true;

while (seguir) {

    const nombre = prompt("ingrese su nombre");
    const producto = prompt("que producto queres comprar");
    const precio = parseFloat(prompt("cual es el precio del producto?"));
    const cantidad = parseInt(prompt("que cantidad queres comprar de ese producto?"));

    // calculo el total
    const total = precio * cantidad;

    // chequeo el presupuesto
    if (total > 100000) {
        console.log("tu compra supera los $100000.");
    } else {
        console.log("tu compra esta dentro de tu presupuesto");
    }

    // pregunto si quiere volver a cargar los datos
    seguir = confirm("queres cambiar los datos de la compra?");
    
    if (!seguir) {
        const mensaje = "hola " + nombre + ", compraste " + cantidad +
            " unidades de " + producto +
            ". el total de tu compra es: $" + total;

        console.log(mensaje);
        alert(mensaje);
    }
}