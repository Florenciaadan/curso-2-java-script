
class PaqueteViaje {
    constructor(destino, precio, dias, personas) {
        this.destino = destino;
        this.precio = precio;
        this.dias = dias;
        this.personas = personas;
    }
}

const paquetes = [];
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
const estadoCarga = document.getElementById("estado-carga");

const mostrarMensaje = (texto, tipo = "exito") => {
    const color = tipo === "error" ? "#c0392b" : "#287c9c";

    Toastify({
        text: texto,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: color
        }
    }).showToast();
};

const cargarPaquetes = async () => {
    estadoCarga.textContent = "cargando destinos...";
    estadoCarga.classList.add("cargando");

    try {
        const respuesta = await fetch("./db/data.json");

        if (!respuesta.ok) {
            throw new Error("no se pudieron cargar los destinos");
        }

        const datos = await respuesta.json();

        paquetes.length = 0;
        paquetes.push(...datos);

        mostrarPaquetes(paquetes);
        actualizarDestinos();

    estadoCarga.textContent = "";
    } catch (error) {
        estadoCarga.textContent = "no se pudieron cargar los destinos. intenta nuevamente.";
        contenedorPaquetes.innerHTML = "";
        cantidadPaquetes.textContent = "0 destinos";
        mostrarMensaje("error al cargar los destinos", "error");
    } finally {
        estadoCarga.classList.remove("cargando");
    }
};

const actualizarDestinos = () => {
    const destinoSeleccionado = inputDestino.value;

    inputDestino.innerHTML = "";

    paquetes.forEach((paquete) => {
        const opcion = document.createElement("option");
        opcion.value = paquete.destino;
        opcion.textContent = paquete.destino;
        inputDestino.appendChild(opcion);
    });

    const destinoDisponible = paquetes.find(
        (paquete) => paquete.destino === destinoSeleccionado
    );

    if (destinoDisponible) {
        inputDestino.value = destinoSeleccionado;
    }
};

const calcularTotal = (paquete) => {
    const { precio, personas, dias, cantidad = 1 } = paquete;
    const valores = [precio, personas, dias, cantidad];
    return valores.reduce((total, valor) => total * valor, 1);
};

const guardarCarrito = () => {
    carrito.length === 0
        ? localStorage.removeItem("carrito")
        : localStorage.setItem("carrito", JSON.stringify(carrito));
};

const validarDatos = () => {
    const personas = Number(inputPersonas.value);
    const dias = Number(inputDias.value);

    if (
        inputPersonas.value.trim() === "" ||
        inputDias.value.trim() === "" ||
        personas <= 0 ||
        dias <= 0
    ) {
        mostrarMensaje("ingresa una cantidad valida de personas y dias", "error");
        return false;
    }

    return true;
};

const consultarPaquete = (destino) => {
    if (validarDatos()) {
        const paqueteBase = paquetes.find(
            (paquete) => paquete.destino === destino
        );

        if (paqueteBase) {
            const nuevaCotizacion = new PaqueteViaje(
                paqueteBase.destino,
                paqueteBase.precio,
                Number(inputDias.value),
                Number(inputPersonas.value)
            );

            mostrarCotizacion(nuevaCotizacion);
            mostrarMensaje("cotizacion realizada");
        } else {
            mostrarMensaje("selecciona un destino valido", "error");
        }
    }
};

const mostrarPaquetes = (lista) => {
    contenedorPaquetes.innerHTML = "";
    cantidadPaquetes.textContent = `${lista.length} destinos`;

    if (lista.length === 0) {
        contenedorPaquetes.innerHTML = `<p>no se encontraron destinos</p>`;
    } else {
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
    }
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

    const botonVaciar = document.createElement("button");
    botonVaciar.id = "boton-vaciar-carrito";
    botonVaciar.textContent = "vaciar carrito";
    botonVaciar.disabled = carrito.length === 0;

    contenedorCarrito.appendChild(botonVaciar);

    botonVaciar.addEventListener("click", () => {
        carrito.length = 0;
        guardarCarrito();
        mostrarCarrito();
        mostrarMensaje("se vacio el carrito");
    });

    cantidadCarrito.textContent = `${carrito.length} viajes`;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p>el carrito esta vacio</p>`;
        contenedorCarrito.prepend(botonVaciar);
        totalCarrito.textContent = "";
    } else {
        carrito.forEach((paquete, indice) => {
            const { destino, personas, dias, cantidad = 1 } = paquete;
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-carrito");

            const subtotal = calcularTotal(paquete);

            tarjeta.innerHTML = `
                <div>
                    <h3>${destino}</h3>
                    <p>${personas} personas - ${dias} dias</p>
                    <p>cantidad: ${cantidad}</p>
                    <p>subtotal: $${subtotal}</p>
                    <button id="restar-${indice}">-</button>
                    <button id="sumar-${indice}">+</button>
                    <button id="eliminar-${indice}">eliminar</button>
                </div>
            `;

            contenedorCarrito.appendChild(tarjeta);

            document.getElementById(`sumar-${indice}`)
                .addEventListener("click", () => {
                    paquete.cantidad = cantidad + 1;
                    guardarCarrito();
                    mostrarCarrito();
                });

            document.getElementById(`restar-${indice}`)
                .addEventListener("click", () => {
                    if (cantidad > 1) {
                        paquete.cantidad = cantidad - 1;
                        guardarCarrito();
                        mostrarCarrito();
                    } else {
                        mostrarMensaje("la cantidad minima es 1", "error");
                    }
                });

            document.getElementById(`eliminar-${indice}`)
                .addEventListener("click", () => {
                    carrito.splice(indice, 1);
                    guardarCarrito();
                    mostrarCarrito();
                    mostrarMensaje("se elimino el producto del carrito");
                });
        });

        const total = carrito.reduce(
            (acumulado, paquete) => acumulado + calcularTotal(paquete),
            0
        );

        totalCarrito.textContent = `total del carrito: $${total}`;
    }
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

mostrarCarrito();
cargarPaquetes();

setTimeout(() => {
    const recordatorio = document.createElement("div");

    recordatorio.id = "recordatorio-carrito";
    recordatorio.textContent = "no te olvides de tu carrito!";

    document.body.appendChild(recordatorio);
}, 20000);
