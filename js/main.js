
class PaqueteViaje {
    constructor(destino, precio, dias, personas) {
        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;
    }
}

const paqueteBrasil = new PaqueteViaje("brasil", 500, 1, 1);
const paquetePeru = new PaqueteViaje("peru", 600, 1, 1);
const paqueteColombia = new PaqueteViaje("colombia", 700, 1, 1);
const paqueteChile = new PaqueteViaje("chile", 400, 1, 1);
const paqueteMexico = new PaqueteViaje("mexico", 800, 1, 1);

const paquetes = [
    paqueteBrasil,
    paquetePeru,
    paqueteColombia,
    paqueteChile,
    paqueteMexico
];



const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

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

const calcularTotal = (paquete) => {
    const { precio, personas, dias, cantidad = 1 } = paquete;
    return precio * personas * dias * cantidad;
};

const guardarCarrito = () => {
    carrito.length === 0
        ? localStorage.removeItem("carrito")
        : localStorage.setItem("carrito", JSON.stringify(carrito));
};

const mostrarMensaje = (texto) => {
    mensaje.textContent = texto;
    mensaje.classList.add("mostrar");

    setTimeout(() => {
        mensaje.classList.remove("mostrar");
    }, 2000);
};

const validarDatos = () => {
    const personas = Number(inputPersonas.value);
    const dias = Number(inputDias.value);

    if (
        inputPersonas.value.trim() === "" ||
        inputDias.value.trim() === "" ||
        !Number.isInteger(personas) ||
        !Number.isInteger(dias) ||
        personas < 1 ||
        dias < 1
    ) {
        mostrarMensaje("ingresa una cantidad valida de personas y dias");
        return false;
    }

    return true;
};

const consultarPaquete = (destino) => {
    if (!validarDatos()) return;

    const paqueteBase = paquetes.find(
        (paquete) => paquete.destino === destino
    );

    if (!paqueteBase) {
        mostrarMensaje("selecciona un destino valido");
        return;
    }

    const nuevaCotizacion = new PaqueteViaje(
        paqueteBase.destino,
        paqueteBase.precio,
        Number(inputDias.value),
        Number(inputPersonas.value)
    );

    mostrarCotizacion(nuevaCotizacion);
    mostrarMensaje("cotizacion realizada");
};

const mostrarPaquetes = (lista) => {
    contenedorPaquetes.innerHTML = "";
    cantidadPaquetes.textContent = `${lista.length} destinos`;

    if (lista.length === 0) {
        contenedorPaquetes.innerHTML = `<p>no se encontraron destinos</p>`;
        return;
    }

    lista.forEach((paquete) => {
        const { destino, precio } = paquete;
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-paquete");

        tarjeta.innerHTML = `
            <h3>${destino}</h3>
            <p>precio base: $${precio}</p>
            <p>precio por persona y dia</p>
            <button id="consultar-${destino}">consultar</button>
        `;

        contenedorPaquetes.appendChild(tarjeta);

        document.getElementById(`consultar-${destino}`)
            .addEventListener("click", () => {
                inputDestino.value = destino;
                consultarPaquete(destino);
            });
    });
};

const mostrarCotizacion = (paquete) => {
    const { destino, personas, dias, precio } = paquete;
    const total = calcularTotal(paquete);

    contenedorCotizacion.innerHTML = `
        <div class="tarjeta-cotizacion">
            <h3>viaje a ${destino}</h3>
            <p>personas: ${personas}</p>
            <p>dias: ${dias}</p>
            <p>precio por persona y dia: $${precio}</p>
            <p class="precio-total">total del viaje: $${total}</p>
            <button id="boton-agregar-cotizacion">agregar al carrito</button>
        </div>
    `;

    document.getElementById("boton-agregar-cotizacion")
        .addEventListener("click", () => {
            const paqueteExistente = carrito.find(
                (item) =>
                    item.destino === paquete.destino &&
                    item.personas === paquete.personas &&
                    item.dias === paquete.dias
            );

            if (paqueteExistente) {
                paqueteExistente.cantidad =
                    (paqueteExistente.cantidad ?? 1) + 1;
            } else {
                carrito.push({ ...paquete, cantidad: 1 });
            }

            guardarCarrito();
            mostrarCarrito();
            mostrarMensaje("el viaje fue agregado al carrito");
        });
};

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    cantidadCarrito.textContent = `${carrito.length} viajes`;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p>el carrito esta vacio</p>`;
        totalCarrito.textContent = "";
        return;
    }

    carrito.forEach((paquete, indice) => {
        const { destino, personas, dias, cantidad = 1 } = paquete;
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-carrito");

        tarjeta.innerHTML = `
            <div>
                <h3>${destino}</h3>
                <p>${personas} personas - ${dias} dias</p>
                <p>cantidad: ${cantidad}</p>
                <p>subtotal: $${calcularTotal(paquete)}</p>
                <button id="eliminar-${indice}">eliminar</button>
            </div>
        `;

        contenedorCarrito.appendChild(tarjeta);

        document.getElementById(`eliminar-${indice}`)
            .addEventListener("click", () => {
                const paqueteEliminado = carrito[indice];

                if (paqueteEliminado.cantidad > 1) {
                    paqueteEliminado.cantidad--;
                } else {
                    carrito.splice(indice, 1);
                }

                guardarCarrito();
                mostrarCarrito();
                mostrarMensaje(`se actualizo el viaje a ${paqueteEliminado.destino}`);
            });
    });

    const total = carrito.reduce(
        (acumulado, paquete) => acumulado + calcularTotal(paquete),
        0
    );

    totalCarrito.textContent = `total del carrito: $${total}`;
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    consultarPaquete(inputDestino.value);
});

buscador.addEventListener("input", () => {
    const textoBuscado = buscador.value.trim().toLowerCase();

    const paquetesFiltrados = paquetes.filter(
        (paquete) => paquete.destino.includes(textoBuscado)
    );

    mostrarPaquetes(paquetesFiltrados);
});

mostrarPaquetes(paquetes);
mostrarCarrito();
