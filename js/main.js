// como calcula el costo  del viaje

function calcularTotal(precio, personas, dias) {
    return precio * personas * dias;
}

// funccion flecha para revisar el presupuesto

const revisarPresupuesto = (total, presupuesto) => {
    if (total > presupuesto) {
        return "el viaje supera tu presupuesto";
    } else {
        return "el viaje esta dentro de tu presupuesto";
    }
};

// funcion para mostrar el resultado


function mostrarResultado(nombre, destino, personas, dias, total, presupuesto) {
    const mensaje = "hola " + nombre +
        ", tu viaje a " + destino +
        " para " + personas + " personas" +
        " durante " + dias + " dias" +
        " tiene un costo estimado de $" + total +
        ". " + presupuesto;

    alert(mensaje);
}

// uso el for-of
function mostrarDestinos(destinos) {
    let mensaje = "destinos disponibles:\n";

    for (const destino of destinos) {
        mensaje = mensaje + "destino: " + destino + "\n";
    }

    alert(mensaje);
}

// funcion para buscar un destino
function buscarDestino(destinos, destinoBuscado) {
    if (destinos.includes(destinoBuscado)) {
        return destinos.indexOf(destinoBuscado);
    } else {
        return -1;
    }
}

// array de destinos disponibles
const destinos = [
    "brasil",
    "chile",
    "uruguay",
    "mexico",
    "españa"
];

// agrego un destino al final
destinos.push("italia");

// agrego un destino al principio
destinos.unshift("argentina");

// elimino el ultimo destino
const destinoEliminado = destinos.pop();

alert("se ha eliminado el destino: " + destinoEliminado);

// muestro los destinos disponibles
mostrarDestinos(destinos);

// pregunto que destino quiere buscar
const destinoBuscado = prompt("que destino queres visitar?");

// busco el destino
const indiceDestino = buscarDestino(destinos, destinoBuscado);

if (indiceDestino !== -1) {
    alert("el destino existe y esta en el indice: " + indiceDestino);
} else {
    alert("el destino no esta disponible");
}

    // uso el splice para cambiar destino pos 2 (chile por peru)
destinos.splice(2, 1, "peru");

// muestro nuevamente los destinos
mostrarDestinos(destinos);

// ciclo para realizar una consulta de viaje
let condicion;

do {

    // entrada de datos
    const nombre = prompt("ingrese su nombre");
    const destino = prompt("que lugar queres visitar?");
    const personas = parseInt(prompt("cuantas personas viajan?"));
    const dias = parseInt(prompt("de cuantos dias queres que sea tu viaje?"));
    const presupuesto = parseFloat(prompt("cuanto queres gastar entre aereo/micro y alojamiento?"));

    // precio estimado por persona y por dia
    const precio = 100;

    // calculo el total
    const total = calcularTotal(precio, personas, dias);

    // reviso el presupuesto
    const resultadoPresupuesto = revisarPresupuesto(total, presupuesto);



      // muestro el resultado
            mostrarResultado(
                nombre,
        destino,
        personas,
          dias,
        total,
        resultadoPresupuesto
    );

    // pregunto si quiere hacer otra consulta
    condicion = confirm("queres consultar otro viaje?");

} while (condicion);