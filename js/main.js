// funcion para pedir datos
function pedirDato(mensaje) {
    return prompt(mensaje);
}

// funcion para calcular el total
function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

// funcion flecha para revisar el presupuesto
const revisarPresupuesto = (total) => {
    if (total > 100000) {
        return "tu compra supera los $100000.";
    } else {
        return "tu compra esta dentro de tu presupuesto";
    }
};

    ///      funcion para mostrar el resultado
function mostrarResultado(nombre, producto, cantidad, total, presupuesto) {
    const mensaje = "hola " + nombre + ", compraste " + cantidad +
        " unidades de " + producto +
        ". el total de tu compra es: $" + total +
        ". " + presupuesto;

    alert(mensaje);
}

// ciclo para cargar los datos
let condicion;

do {

    // entrada de datos
    const nombre = pedirDato("ingrese su nombre");
    const producto = pedirDato("que producto queres comprar");
    const precio = parseFloat(pedirDato("cual es el precio del producto?"));
    const cantidad = parseInt(pedirDato("que cantidad queres comprar de ese producto?"));

    // calculo el total
    const total = calcularTotal(precio, cantidad);

    
    // reviso el presupuesto
    const presupuesto = revisarPresupuesto(total);


    // muestro el resultado
    mostrarResultado(nombre, producto, cantidad, total, presupuesto);

    // pregunto si quiere cargar otra compra
    condicion = confirm("queres cargar otra compra?");



} while (condicion);