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


// array de objetos con los paquetes

const paquetes = [
    paqueteBrasil,
    paqueteChile,
    paqueteMexico
];


// array para guardar los paquetes del carrito

const carrito = [];


// funcion para calcular el costo total del viaje

function calcularTotal(paquete, personas, dias) {
    return paquete.precio * personas * dias;
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

    if (carrito.length === 0) {

        console.log("el carrito esta vacio");

    } else {

        for (const paquete of carrito) {

            console.log(
                "destino: " + paquete.destino +
                " - precio: $" + paquete.precio +
                " - dias: " + paquete.dias +
                " - personas: " + paquete.personas
            );

        }

    }

}


// muestro los precios de los paquetes

console.log("paquete brasil:");
paqueteBrasil.verPrecios();

console.log("paquete chile:");
paqueteChile.verPrecios();

console.log("paquete mexico:");
paqueteMexico.verPrecios();


// loop para elegir paquetes

let continuar;

do {

    const opcion = parseInt(prompt(
        "elegi un paquete:\n" +
        "1 - brasil\n" +
        "2 - chile\n" +
        "3 - mexico"
    ));

    let destinoElegido;

    if (opcion === 1) {

        destinoElegido = "brasil";

    } else if (opcion === 2) {

        destinoElegido = "chile";

    } else if (opcion === 3) {

        destinoElegido = "mexico";

    } else {

        alert("opcion no valida");
        continuar = false;
    }


    if (destinoElegido) {

        // find busca el paquete elegido dentro del array de objetos

        const paqueteElegido = paquetes.find(
            paquete => paquete.destino === destinoElegido
        );


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


        // calculo el total del paquete elegido

        const total = calcularTotal(
            paqueteElegido,
            personas,
            dias
        );


        const resultadoPresupuesto = revisarPresupuesto(
            total,
            presupuesto
        );


        // filter busca los paquetes que puede comprar
        // el usuario segun su presupuesto

        const paquetesQuePuedeComprar = paquetes.filter(
            paquete => calcularTotal(paquete, personas, dias) <= presupuesto
        );


        // map crea un nuevo array con los precios con impuestos

        const paquetesConImpuestos = paquetes.map(
            paquete => {

                const precioConImpuestos = paquete.precio * 1.21;

                return {
                    destino: paquete.destino,
                    precio: paquete.precio,
                    precioConImpuestos: precioConImpuestos
                };

            }
        );


        // muestro en consola los resultados de los metodos

        console.log("paquete encontrado con find:");
        console.log(paqueteElegido);

        console.log("paquetes que puede comprar segun su presupuesto:");
        console.log(paquetesQuePuedeComprar);

        console.log("paquetes con precios con impuestos con map:");
        console.log(paquetesConImpuestos);


        // muestro al usuario los paquetes que puede comprar

        let mensajePaquetes = "con tu presupuesto podes elegir:\n";

        if (paquetesQuePuedeComprar.length > 0) {

            for (const paquete of paquetesQuePuedeComprar) {

                const precio = calcularTotal(
                    paquete,
                    personas,
                    dias
                );

                mensajePaquetes +=
                    "- " + paquete.destino +
                    " - $" + precio + "\n";

            }

        } else {

            mensajePaquetes =
                "no hay paquetes disponibles con ese presupuesto.";

        }


        alert(mensajePaquetes);


        // muestro el resumen del viaje elegido

        const mensaje = "hola " + nombre +
            ", elegiste el paquete a " + paqueteElegido.destino +
            " para " + personas + " personas" +
            " durante " + dias + " dias." +
            "\nprecio sin impuestos: $" + total +
            "\nprecio con impuestos: $" + (total * 1.21) +
            "\n" + resultadoPresupuesto;


        console.log(mensaje);
        alert(mensaje);


        // pregunto si quiere agregar el paquete al carrito

        const agregar = confirm(
            "queres agregar este paquete al carrito?"
        );


        if (agregar) {

            agregarAlCarrito(paqueteElegido);


            // ahora tiene la opcion de ver el carrito

            const ver = confirm(
                "queres ver lo que tenes en el carrito?"
            );

            if (ver) {

                verCarrito();

            }

        }


        // pregunto si quiere cotizar otro viaje

        continuar = confirm(
            "queres cotizar otro viaje?"
        );


        if (!continuar) {

            alert(
                "hasta pronto " +
                nombre +
                ", no dudes en consultarnos por el resto de los destinos que tenemos disponibles"
            );

        }

    }

} while (continuar);


// al terminar pregunto si quiere ver el carrito final

const verCarritoFinal = confirm(
    "queres ver el carrito final?"
);

if (verCarritoFinal) {

    verCarrito();

}