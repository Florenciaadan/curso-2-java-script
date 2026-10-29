
const formulario = document.getElementById("formulario-viaje");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    window.gestorViajes.consultarPaquete(
        document.getElementById("destino").value
    );
});

document.getElementById("buscador").addEventListener("input", () => {
    window.gestorViajes.filtrarPaquetes();
});

window.gestorViajes.mostrarCarrito();
window.gestorViajes.cargarPaquetes();

setTimeout(() => {
    const recordatorio = document.createElement("div");

    recordatorio.id = "recordatorio-carrito";
    recordatorio.textContent = "no te olvides de tu carrito!";

    document.body.appendChild(recordatorio);
}, 20000);
