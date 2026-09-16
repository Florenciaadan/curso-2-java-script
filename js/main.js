// clase para crear los paquetes de viaje

class PaqueteViaje {

    constructor(destino, precio, dias, personas) {
        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;
    }

    // metodo para mostrar el precio sin y con impuestos

    verPrecios() {
        const precioConImpuestos = this.precio * 1.21;

        console.log("destino: " + this.destino);
        console.log("precio sin impuestos: $" + this.precio);
        console.log("precio con impuestos: $" + precioConImpuestos);
    }
}


// creo tres paquetes de viaje

const paqueteBrasil = new PaqueteViaje("brasil", 500, 7, 2);

const paqueteChile = new PaqueteViaje("chile", 400, 5, 2);

const paqueteMexico = new PaqueteViaje("mexico", 800, 10, 2);


// array para guardar los paquetes del carrito

const carrito = [];


// funcion para calcular el costo total del viaje

function calcularTotal(paquete) {
    return paquete.precio * paquete.personas * paquete.dias;
}


// funcion para revisar el presupuesto

const revisarPresupuesto = (total, presupuesto) => {

    if (total > presupuesto) {
        return "el viaje supera tu presupuesto";
    } else {
        return "el viaje esta dentro de tu presupuesto";
    }

};


// funcion para agregar un paquete al carrito

function agregarAlCarrito(paquete) {

    carrito.push(paquete);

    alert("se agrego al carrito el paquete a " + paquete.destino);

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


// muestro los precios de los paquetes

console.log("paquete brasil:");
paqueteBrasil.verPrecios();

console.log("paquete chile:");
paqueteChile.verPrecios();

console.log("paquete mexico:");
paqueteMexico.verPrecios();


// loop para elegir paquetes o terminar de elegir y luego avanzar. identifico numoero de paqute con 1 2 3 

let continuar;

do {

    const opcion = parseInt(prompt(
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


    continuar = confirm("queres agregar otro paquete?");

} while (continuar);


// muestro el carrito final

verCarrito();


// pregunto los datos para calcular el viaje

const nombre = prompt("ingrese su nombre");

const presupuesto = parseFloat(
    prompt("cuanto queres gastar en tu viaje?")
);


// calculo el total del primer paquete del carrito, aca le sumo el iva y va a devolver resumen y si esta o no dentro de mi presupuesto o no

if (carrito.length > 0) {

    const paqueteElegido = carrito[0];

    const total = calcularTotal(paqueteElegido);

    const resultadoPresupuesto = revisarPresupuesto(
        total,
        presupuesto
    );

            // pongo + para que se una a la siguiente fila donde sigue el mensajee


    const mensaje = "hola " + nombre +
        ", elegiste el paquete a " + paqueteElegido.destino +
        " para " + paqueteElegido.personas + " personas" +
        " durante " + paqueteElegido.dias + " dias." +
        "\nprecio sin impuestos: $" + total +
        "\nprecio con impuestos: $" + (total * 1.21) +
        "\n" + resultadoPresupuesto;

        console.log(mensaje);
        alert(mensaje);
    }