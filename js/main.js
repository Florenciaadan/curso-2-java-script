// clase para crear los paquetes de viaje


// usar el this y determino objetos del paquete
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

    let paqueteElegido;

    if (opcion === 1) {
        paqueteElegido = paqueteBrasil;
    } else if (opcion === 2) {

        paqueteElegido = paqueteChile;
    } else if (opcion === 3) {
        paqueteElegido = paqueteMexico;
    } else {

        alert("opcion no valida");
    }


    if (paqueteElegido) {

        const nombre = prompt("ingrese su nombre");

        const personas = parseInt(
            prompt("cuantas personas viajan?")
        );
        const dias = parseInt(
            prompt("de cuantos dias queres que sea tu viaje?")
        );

                const presupuesto = parseFloat(
                    prompt("cuanto queres gastar en tu viaje?")
                );


        const total = calcularTotal(paqueteElegido);

        const resultadoPresupuesto = revisarPresupuesto(
            total,
            presupuesto
        );


        const mensaje = "hola " + nombre +
            ", elegiste el paquete a " + paqueteElegido.destino +
            " para " + personas + " personas" +
            " durante " + dias + " dias." +
            "\nprecio sin impuestos: $" + total +
            "\nprecio con impuestos: $" + (total * 1.21) +
            "\n" + resultadoPresupuesto;





        console.log(mensaje);
        alert(mensaje);


        continuar = confirm("queres cotizar otro viaje?");

        if (!continuar) {
            alert("hasta pronto " + nombre);
        }

    } else {

        continuar = false;

    }

} while (continuar);


// muestro el carrito final

verCarrito();