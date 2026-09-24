



// HOLA LUCAS Y JESUS DEJO ESTE MENSAJE ACA PARA DECIRLES QUE EN LA PAGINA DE CODERHOUSE EL CHAT, NO APARECE. 
// QUISE ESCRIBIRLES POR DUDAS PERO NO ESTA, LO ENTREGO ASI. A CRUZARRRR LOS DEDOS JAJA



class PaqueteViaje {

    constructor(destino, precio, dias, personas) {
        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;
    }



    verPrecios() {
        const precioConImpuestos = this.precio * 1.21;

        console.log("destino: " + this.destino);
        console.log("precio sin impuestos: $" + this.precio);
        console.log("precio con impuestos: $" + precioConImpuestos);
    }
}



const paqueteBrasil = new PaqueteViaje("brasil", 500, 7, 2);

const paqueteChile = new PaqueteViaje("chile", 400, 5, 2);

const paqueteMexico = new PaqueteViaje("mexico", 800, 10, 2);



const paquetes = [
    paqueteBrasil,
    paqueteChile,
    paqueteMexico
];




const carrito = [];




function calcularTotal(paquete, personas, dias) {
    return paquete.precio * personas * dias;
}




const revisarPresupuesto = (total, presupuesto) => {

    if (total > presupuesto) {
        return "el viaje supera tu presupuesto";
    } else {
        return "el viaje esta dentro de tu presupuesto";
    }

};




function agregarAlCarrito(paquete) {

    carrito.push(paquete);

    alert("se agrego al carrito el paquete a " + paquete.destino);

}




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




console.log("paquete brasil:");
paqueteBrasil.verPrecios();

console.log("paquete chile:");
paqueteChile.verPrecios();

console.log("paquete mexico:");
paqueteMexico.verPrecios();




let continuar;

do {

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




    const paquetesQuePuedeComprar = paquetes.filter(
        paquete => calcularTotal(paquete, personas, dias) <= presupuesto
    );




    console.log("paquetes que puede comprar segun su presupuesto:");
    console.log(paquetesQuePuedeComprar);



    if (paquetesQuePuedeComprar.length > 0) {

        let mensajePaquetes =
            "con tu presupuesto podes elegir:\n";

        for (
            let i = 0;
            i < paquetesQuePuedeComprar.length;
            i++
        ) {

            const paquete = paquetesQuePuedeComprar[i];

            const precio = calcularTotal(
                paquete,
                personas,
                dias
            );

            mensajePaquetes +=
                (i + 1) +
                " - " +
                paquete.destino +
                " - $" +
                precio +
                "\n";
        }


        alert(mensajePaquetes);




        const agregar = confirm(
            "queres agregar alguno de estos paquetes al carrito?"
        );


        if (agregar) {

            const numeroPaquete = parseInt(
                prompt(
                    mensajePaquetes +
                    "\ningresa el numero del paquete que queres agregar"
                )
            );




            const paqueteElegido =
                paquetesQuePuedeComprar[numeroPaquete - 1];


            if (paqueteElegido) {

   

                const paqueteEncontrado = paquetes.find(
                    paquete =>
                        paquete.destino === paqueteElegido.destino
                );


                agregarAlCarrito(paqueteEncontrado);



                console.log("carrito actualizado:");
                verCarrito();

                alert(
                    "carrito actualizado. revisa la consola para verlo."
                );

            } else {

                alert("numero de paquete no valido");

            }

        }

    } else {

        alert(
            "no hay paquetes disponibles con ese presupuesto."
        );

        console.log(
            "no hay paquetes dentro del presupuesto"
        );

    }




    const paquetesConImpuestos = paquetes.map(
        paquete => {

            const precioConImpuestos =
                paquete.precio * 1.21;

            return {
                destino: paquete.destino,
                precio: paquete.precio,
                precioConImpuestos: precioConImpuestos
            };

        }
    );




    console.log("paquetes con precios con impuestos:");
    console.log(paquetesConImpuestos);




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

} while (continuar);



console.log("carrito final:");
verCarrito();