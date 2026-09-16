// clase para crear los paquetes de viaje

class PaqueteViaje {

    constructor(destino, precio, dias, personas) {
        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;
    }

    // metodo para calcular el precio con impuestos
    verPrecioConImpuestos() {
        return this.precio * 1.21;
    }
}


// creo tres paquetes de viaje

const paqueteBrasil = new PaqueteViaje("brasil", 500, 7, 2);

const paqueteChile = new PaqueteViaje("chile", 400, 5, 2);

const paqueteMexico = new PaqueteViaje("mexico", 800, 10, 2);


// carrito de compras
const carrito = [];


// funcion para mostrar el precio con y sin impuestos

function mostrarPrecios(paquete) {

    console.log("destino: " + paquete.destino);
    console.log("precio sin impuestos: $" + paquete.precio);
    console.log("precio con impuestos: $" + paquete.verPrecioConImpuestos());

}


// funcion para agregar un paquete al carrito

function agregarAlCarrito(paquete) {

    carrito.push(paquete);

    console.log("se agrego al carrito el paquete a " + paquete.destino);

}


// funcion para ver el carrito

function verCarrito() {

    console.log("paquetes en el carrito:");

    for (const paquete of carrito) {

        console.log(
            "destino: " + paquete.destino +
            " - precio: $" + paquete.precio +
            " - dias: " + paquete.dias +
            " - personas: " + paquete.personas
        );
    }
}


// muestro los paquetes disponibles

console.log("paquetes disponibles:");

mostrarPrecios(paqueteBrasil);

mostrarPrecios(paqueteChile);

mostrarPrecios(paqueteMexico);


// pregunto que paquete quiere agregar

let opcion;

do {

    opcion = parseInt(prompt(
        "elegi un paquete:\n" +
        "1 - brasil\n" +
        "2 - chile\n" +
        "3 - mexico"
    ));

    if (opcion === 1) {

        agregarAlCarrito(paqueteBrasil);

    } else if (opcion === 2) {

        agregarAlCarrito(paqueteChile);

    } else if (opcion === 3) {

        agregarAlCarrito(paqueteMexico);

    } else {

        alert("opcion no valida");
    }


    // pregunto si quiere agregar otro paquete

    continuar = confirm("queres agregar otro paquete?");

} while (continuar);


// muestro el carrito final

verCarrito();