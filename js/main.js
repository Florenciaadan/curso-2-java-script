// clase para crear los paquetes de viaje

class PaqueteViaje {

    constructor(destino, precio, dias, personas) {

        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;

    }

}


// creo los paquetes que ya tenia del proyecto anterior

const paqueteBrasil = new PaqueteViaje(
    "brasil",
    500,
    7,
    2
);


const paqueteChile = new PaqueteViaje(
    "chile",
    400,
    5,
    2
);


const paqueteMexico = new PaqueteViaje(
    "mexico",
    800,
    10,
    2
);


// array de objetos

const paquetes = [
    paqueteBrasil,
    paqueteChile,
    paqueteMexico
];


// array para guardar los paquetes del carrito

const carrito = [];


// selecciono elementos del DOM

const formulario = document.getElementById(
    "formulario-paquete"
);


const inputDestino = document.getElementById(
    "destino"
);


const inputPrecio = document.getElementById(
    "precio"
);


const inputDias = document.getElementById(
    "dias"
);


const inputPersonas = document.getElementById(
    "personas"
);


const buscador = document.getElementById(
    "buscador"
);


const contenedorPaquetes = document.getElementById(
    "contenedor-paquetes"
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


// funcion para calcular el total de un paquete

function calcularTotal(paquete) {

    return paquete.precio *
        paquete.personas *
        paquete.dias;

}


// funcion para mostrar un mensaje en pantalla

function mostrarMensaje(texto) {

    mensaje.textContent = texto;

    mensaje.classList.add("mostrar");


    setTimeout(function () {

        mensaje.classList.remove("mostrar");

    }, 2000);

}


// funcion para mostrar los paquetes

function mostrarPaquetes(lista) {

    contenedorPaquetes.innerHTML = "";

    cantidadPaquetes.textContent =
        lista.length + " paquetes";


    if (lista.length === 0) {

        contenedorPaquetes.innerHTML =
            "<p>no se encontraron paquetes</p>";

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
                    precio: $${paquete.precio}
                </p>

                <p>
                    dias: ${paquete.dias}
                </p>

                <p>
                    personas: ${paquete.personas}
                </p>

                <p class="precio-total">
                    total: $${calcularTotal(paquete)}
                </p>

                <button
                    class="boton-carrito"
                    data-destino="${paquete.destino}"
                >
                    agregar al carrito
                </button>

            `;


            contenedorPaquetes.appendChild(
                tarjeta
            );

        });

    }

}


// funcion para mostrar el carrito

function mostrarCarrito() {

    contenedorCarrito.innerHTML = "";

    cantidadCarrito.textContent =
        carrito.length + " paquetes";


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
                            ${paquete.personas} personas -
                            ${paquete.dias} dias
                        </p>

                        <p>
                            total: $${calcularTotal(paquete)}
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

            total += calcularTotal(paquete);

        });


        totalCarrito.textContent =
            "total del carrito: $" + total;

    }

}

// evento para agregar un nuevo paquete

formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const destino =
            inputDestino.value
                .trim()
                .toLowerCase();


        const precio =
            parseFloat(
                inputPrecio.value
            );


        const dias =
            parseInt(
                inputDias.value
            );


        const personas =
            parseInt(
                inputPersonas.value
            );


        const nuevoPaquete =
            new PaqueteViaje(
                destino,
                precio,
                dias,
                personas
            );


        paquetes.push(
            nuevoPaquete
        );


        carrito.push(
            nuevoPaquete
        );


        formulario.reset();


        mostrarPaquetes(
            paquetes
        );


        mostrarCarrito();


        mostrarMensaje(
            "el paquete fue agregado al carrito"
        );

    }
);


// evento de teclado para buscar destinos

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


// evento para agregar paquetes al carrito

contenedorPaquetes.addEventListener(
    "click",
    function (evento) {

        if (
            evento.target.classList.contains(
                "boton-carrito"
            )
        ) {

            const destino =
                evento.target.dataset.destino;


            const paquete =
                paquetes.find(
                    function (paquete) {

                        return paquete.destino === destino;

                    }
                );


            if (paquete) {

                carrito.push(
                    paquete
                );


                mostrarCarrito();


                mostrarMensaje(
                    "se agrego " +
                    paquete.destino +
                    " al carrito"
                );

            }

        }

    }
);


// evento para eliminar paquetes del carrito

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


// muestro los paquetes cuando carga la pagina

mostrarPaquetes(
    paquetes
);


mostrarCarrito();