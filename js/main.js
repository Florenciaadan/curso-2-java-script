// clase para crear los paquetes de viaje

class PaqueteViaje {
    constructor(destino, precio, dias, personas) {
        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;
    }
}

// paquetes disponibles de la agencia

const paqueteBrasil = new PaqueteViaje("brasil", 500, 1, 1);
const paquetePeru = new PaqueteViaje("peru", 600, 1, 1);
const paqueteColombia = new PaqueteViaje("colombia", 700, 1, 1);
const paqueteChile = new PaqueteViaje("chile", 400, 1, 1);
const paqueteMexico = new PaqueteViaje("mexico", 800, 1, 1);

// array de objetos con los paquetes disponibles

const paquetes = [
    paqueteBrasil,
    paquetePeru,
    paqueteColombia,
    paqueteChile,
    paqueteMexico
];

// recupero el carrito guardado en localStorage

const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

// selecciono elementos del DOM

const formulario = document.getElementById("formulario-viaje");
const inputDestino = document.getElementById("destino");
const inputPersonas = document.getElementById("personas");
const inputDias = document.getElementById("dias");
const buscador = document.getElementById("buscador");
const contenedorPaquetes = document.getElementById("contenedor-paquetes");
const contenedorCotizacion = document.getElementById("contenedor-cotizacion");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const cantidadPaquetes = document.getElementById("cantidad-paquetes");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const totalCarrito = document.getElementById("total-carrito");
const mensaje = document.getElementById("mensaje");

// funcion para calcular el precio del viaje

function calcularTotal(paquete) {
    const { precio, personas, dias } = paquete;
    return precio * personas * dias;
}

// funcion para guardar el carrito en localStorage

function guardarCarrito() {
    carrito.length === 0
        ? localStorage.removeItem("carrito")
        : localStorage.setItem("carrito", JSON.stringify(carrito));
}

// funcion para mostrar mensajes

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    mensaje.classList.add("mostrar");

    setTimeout(function () {
        mensaje.classList.remove("mostrar");
    }, 2000);
}

// funcion para mostrar los destinos

function mostrarPaquetes(lista) {
    contenedorPaquetes.innerHTML = "";
    cantidadPaquetes.textContent = lista.length + " destinos";

    lista.length === 0
        ? contenedorPaquetes.innerHTML = "<p>no se encontraron destinos</p>"
        : lista.forEach(function (paquete) {
            const { destino, precio } = paquete;
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-paquete");

            tarjeta.innerHTML = `
                <h3>${destino}</h3>
                <p>precio base: $${precio}</p>
                <p>precio por persona y dia</p>
                <button class="boton-consultar" data-destino="${destino}">
                    consultar
                </button>
            `;

            contenedorPaquetes.appendChild(tarjeta);
        });
}

// funcion para mostrar la cotizacion

function mostrarCotizacion(paquete) {
    const { destino, personas, dias, precio } = paquete;
    const total = calcularTotal(paquete);

    contenedorCotizacion.innerHTML = `
        <div class="tarjeta-cotizacion">
            <h3>viaje a ${destino}</h3>
            <p>personas: ${personas}</p>
            <p>dias: ${dias}</p>
            <p>precio por persona y dia: $${precio}</p>
            <p class="precio-total">total del viaje: $${total}</p>
            <button id="boton-agregar-cotizacion">
                agregar al carrito
            </button>
        </div>
    `;

    const botonAgregar = document.getElementById("boton-agregar-cotizacion");

    botonAgregar.addEventListener("click", function () {
        carrito.push(paquete);
        guardarCarrito();
        mostrarCarrito();
        mostrarMensaje("el viaje fue agregado al carrito");
    });
}

// funcion para mostrar el carrito

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    cantidadCarrito.textContent = carrito.length + " viajes";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>el carrito esta vacio</p>";
        totalCarrito.textContent = "";
    } else {
        carrito.forEach(function (paquete, indice) {
            const { destino, personas, dias } = paquete;
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-carrito");

            tarjeta.innerHTML = `
                <div>
                    <h3>${destino}</h3>
                    <p>${personas} personas - ${dias} dias</p>
                    <p>total: $${calcularTotal(paquete)}</p>
                </div>
                <button class="boton-eliminar" data-indice="${indice}">
                    eliminar
                </button>
            `;

            contenedorCarrito.appendChild(tarjeta);
        });

        let total = 0;

        carrito.forEach(function (paquete) {
            total += calcularTotal(paquete);
        });

        totalCarrito.textContent = "total del carrito: $" + total;
    }
}

// evento para consultar un viaje

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const destino = inputDestino.value;
    const personas = parseInt(inputPersonas.value);
    const dias = parseInt(inputDias.value);

    const paqueteBase = paquetes.find(function (paquete) {
        return paquete.destino === destino;
    });

    if (paqueteBase) {
        const nuevaCotizacion = new PaqueteViaje(
            paqueteBase.destino,
            paqueteBase.precio,
            dias,
            personas
        );

        mostrarCotizacion(nuevaCotizacion);
        mostrarMensaje("cotizacion realizada");
    }
});

// evento de teclado para buscar destinos

buscador.addEventListener("input", function () {
    const textoBuscado = buscador.value.trim().toLowerCase();

    const paquetesFiltrados = paquetes.filter(function (paquete) {
        return paquete.destino.includes(textoBuscado);
    });

    mostrarPaquetes(paquetesFiltrados);
});

// evento para consultar desde las tarjetas

contenedorPaquetes.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("boton-consultar")) {
        const destino = evento.target.dataset.destino;
        inputDestino.value = destino;

        const paquete = paquetes.find(function (paquete) {
            return paquete.destino === destino;
        });

        if (paquete) {
            const personas = parseInt(inputPersonas.value);
            const dias = parseInt(inputDias.value);

            const nuevaCotizacion = new PaqueteViaje(
                paquete.destino,
                paquete.precio,
                dias,
                personas
            );

            mostrarCotizacion(nuevaCotizacion);
            mostrarMensaje("cotizacion realizada");
        }
    }
});

// evento para eliminar viajes del carrito

contenedorCarrito.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("boton-eliminar")) {
        const indice = parseInt(evento.target.dataset.indice);
        const paqueteEliminado = carrito[indice];

        carrito.splice(indice, 1);
        guardarCarrito();
        mostrarCarrito();

        mostrarMensaje("se elimino " + (paqueteEliminado?.destino ?? "el viaje") + " del carrito");
    }
});

// muestro los destinos y recupero el carrito al cargar la pagina

mostrarPaquetes(paquetes);
mostrarCarrito();