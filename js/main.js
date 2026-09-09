// funcion para calcular el total
function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

// funcion flecha para revisar el presupuesto
const revisarPresupuesto = (total) => {
    if (total > 100000) {
        return "tu compra supera los $100000.";
    } else {
        return "tu compra esta dentro de tu presupuesto";
    }
};

// funcion para mostrar el resultado
function mostrarResultado(nombre, producto, cantidad, total, presupuesto) {
    const mensaje = "hola " + nombre + ", compraste " + cantidad +
        " unidades de " + producto +
        ". el total de tu compra es: $" + total +
        ". " + presupuesto;

    alert(mensaje);
}

// funcion para recorrer el array
function mostrarProductos(productos) {
    let mensaje = "productos disponibles:\n";

    for (const producto of productos) {
        mensaje = mensaje + "producto: " + producto + "\n";
    }

    alert(mensaje);
}

// funcion para buscar un producto
function buscarProducto(productos, productoBuscado) {
    if (productos.includes(productoBuscado)) {
        return productos.indexOf(productoBuscado);
    } else {
        return -1;
    }
}

// array de productos
const productos = [
    "laptop",
    "celular",
    "teclado",
    "mouse",
    "monitor"
];

// agrego un producto al final
productos.push("auriculares");

// agrego un producto al principio
productos.unshift("tablet");

// elimino el ultimo producto
const productoEliminado = productos.pop();

alert("se ha eliminado el elemento: " + productoEliminado);

// busco un producto
const productoBuscado = prompt("que producto queres buscar?");

// verifico si existe
const indiceProducto = buscarProducto(productos, productoBuscado);

if (indiceProducto !== -1) {
    alert("el producto existe y esta en el indice: " + indiceProducto);
} else {
    alert("el producto no existe en la lista");
}

// modifico un producto usando splice
productos.splice(2, 1, "teclado mecanico");

// muestro todos los productos
mostrarProductos(productos);

// ciclo para realizar la compra
let condicion;

do {

    const nombre = prompt("ingrese su nombre");
    const producto = prompt("que producto queres comprar");
    const precio = parseFloat(prompt("cual es el precio del producto?"));
    const cantidad = parseInt(prompt("que cantidad queres comprar de ese producto?"));

    // calculo el total
    const total = calcularTotal(precio, cantidad);

    // reviso el presupuesto
    const presupuesto = revisarPresupuesto(total);

    // muestro el resultado
    mostrarResultado(nombre, producto, cantidad, total, presupuesto);

    // pregunto si quiere realizar otra compra
    condicion = confirm("queres cargar otra compra?");

} while (condicion);