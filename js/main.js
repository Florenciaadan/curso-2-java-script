

class PaqueteViaje {

    constructor(destino, precio, dias, personas) {

        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;

    }

}




const paqueteBrasil = new PaqueteViaje(
    "brasil",
    500,
    1,
    1
);


const paquetePeru = new PaqueteViaje(
    "peru",
    600,
    1,
    1
);


const paqueteColombia = new PaqueteViaje(
    "colombia",
    700,
    1,
    1
);


const paqueteChile = new PaqueteViaje(
    "chile",
    400,
    1,
    1
);


const paqueteMexico = new PaqueteViaje(
    "mexico",
    800,
    1,
    1
);




const paquetes = [
    paqueteBrasil,
    paquetePeru,
    paqueteColombia,
    paqueteChile,
    paqueteMexico
];




const carrito = [];



const formulario = document.getElementById(
    "formulario-viaje"
);


const inputDestino = document.getElementById(
    "destino"
);


const inputPersonas = document.getElementById(
    "personas"
);


const inputDias = document.getElementById(
    "dias"
);


const buscador = document.getElementById(
    "buscador"
);


const contenedorPaquetes = document.getElementById(
    "contenedor-paquetes"
);


const contenedorCotizacion = document.getElementById(
    "contenedor-cotizacion"
);


const contenedorCarrito = document.getElementById(
    "contenedor-carrito"
);


const cantidadPaquetes = document.getElementById(
    "cantidad-paquetes"
);


const cantidadCarrito = document.getElementById(
    "cantidad-carrito"
);


const totalCarrito = document.getElementById(
    "total-carrito"
);


const mensaje = document.getElementById(
    "mensaje"
);




function calcularTotal(paquete) {

    return paquete.precio *
        paquete.personas *
        paquete.dias;

}




function mostrarMensaje(texto) {

    mensaje.textContent = texto;

    mensaje.classList.add("mostrar");


    setTimeout(function () {

        mensaje.classList.remove("mostrar");

    }, 2000);

}



function mostrarPaquetes(lista) {

    contenedorPaquetes.innerHTML = "";

    cantidadPaquetes.textContent =
        lista.length + " destinos";


    if (lista.length === 0) {

        contenedorPaquetes.innerHTML =
            "<p>no se encontraron destinos</p>";

    } else {

        lista.forEach(function (paquete) {

            const tarjeta =
                document.createElement("div");


            tarjeta.classList.add(
                "tarjeta-paquete"
            );


            tarjeta.innerHTML = `

                <h3>
                    ${paquete.destino}
                </h3>

                <p>
                    precio base:
                    $${paquete.precio}
                </p>

                <p>
                    precio por persona y dia
                </p>

                <button
                    class="boton-consultar"
                    data-destino="${paquete.destino}"
                >
                    consultar
                </button>

            `;


            contenedorPaquetes.appendChild(
                tarjeta
            );

        });

    }

}



function mostrarCotizacion(paquete) {

    const total =
        calcularTotal(paquete);


    contenedorCotizacion.innerHTML = `

        <div class="tarjeta-cotizacion">

            <h3>
                viaje a ${paquete.destino}
            </h3>

            <p>
                personas: ${paquete.personas}
            </p>

            <p>
                dias: ${paquete.dias}
            </p>

            <p>
                precio por persona y dia:
                $${paquete.precio}
            </p>

            <p class="precio-total">
                total del viaje: $${total}
            </p>

            <button
                id="boton-agregar-cotizacion"
            >
                agregar al carrito
            </button>

        </div>

    `;


    const botonAgregar =
        document.getElementById(
            "boton-agregar-cotizacion"
        );


    botonAgregar.addEventListener(
        "click",
        function () {

            carrito.push(
                paquete
            );


            mostrarCarrito();


            mostrarMensaje(
                "el viaje fue agregado al carrito"
            );

        }
    );

}



function mostrarCarrito() {

    contenedorCarrito.innerHTML = "";

    cantidadCarrito.textContent =
        carrito.length + " viajes";


    if (carrito.length === 0) {

        contenedorCarrito.innerHTML =
            "<p>el carrito esta vacio</p>";

        totalCarrito.textContent = "";

    } else {

        carrito.forEach(
            function (paquete, indice) {

                const tarjeta =
                    document.createElement("div");


                tarjeta.classList.add(
                    "tarjeta-carrito"
                );


                tarjeta.innerHTML = `

                    <div>

                        <h3>
                            ${paquete.destino}
                        </h3>

                        <p>
                            ${paquete.personas}
                            personas -
                            ${paquete.dias}
                            dias
                        </p>

                        <p>
                            total:
                            $${calcularTotal(paquete)}
                        </p>

                    </div>


                    <button
                        class="boton-eliminar"
                        data-indice="${indice}"
                    >
                        eliminar
                    </button>

                `;


                contenedorCarrito.appendChild(
                    tarjeta
                );

            }
        );


        let total = 0;


        carrito.forEach(function (paquete) {

            total += calcularTotal(
                paquete
            );

        });


        totalCarrito.textContent =
            "total del carrito: $" + total;

    }

}



formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const destino =
            inputDestino.value;


        const personas =
            parseInt(
                inputPersonas.value
            );


        const dias =
            parseInt(
                inputDias.value
            );



        const paqueteBase =
            paquetes.find(
                function (paquete) {

                    return paquete.destino === destino;

                }
            );


        if (paqueteBase) {



            const nuevaCotizacion =
                new PaqueteViaje(
                    paqueteBase.destino,
                    paqueteBase.precio,
                    dias,
                    personas
                );


            mostrarCotizacion(
                nuevaCotizacion
            );


            mostrarMensaje(
                "cotizacion realizada"
            );

        }

    }
);


buscador.addEventListener(
    "input",
    function () {

        const textoBuscado =
            buscador.value
                .trim()
                .toLowerCase();


        const paquetesFiltrados =
            paquetes.filter(
                function (paquete) {

                    return paquete.destino.includes(
                        textoBuscado
                    );

                }
            );


        mostrarPaquetes(
            paquetesFiltrados
        );

    }
);




contenedorPaquetes.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target.classList.contains(
                "boton-consultar"
            )
        ) {

            const destino =
                evento.target.dataset.destino;


            inputDestino.value =
                destino;


            const paquete =
                paquetes.find(
                    function (paquete) {

                        return paquete.destino === destino;

                    }
                );


            if (paquete) {

                const personas =
                    parseInt(
                        inputPersonas.value
                    );


                const dias =
                    parseInt(
                        inputDias.value
                    );


                const nuevaCotizacion =
                    new PaqueteViaje(
                        paquete.destino,
                        paquete.precio,
                        dias,
                        personas
                    );


                mostrarCotizacion(
                    nuevaCotizacion
                );

            }

        }

    }
);




contenedorCarrito.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target.classList.contains(
                "boton-eliminar"
            )
        ) {

            const indice =
                parseInt(
                    evento.target.dataset.indice
                );


            const paqueteEliminado =
                carrito[indice];


            carrito.splice(
                indice,
                1
            );


            mostrarCarrito();


            mostrarMensaje(
                "se elimino " +
                paqueteEliminado.destino +
                " del carrito"
            );

        }

    }
);



mostrarPaquetes(
    paquetes
);


mostrarCarrito();