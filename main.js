// Esta función empieza cuando hago clic en el botón de la página.
function iniciarSimulador() {

    // Pido el nombre para poder personalizar el mensaje final.
    const nombre = prompt("¿Cuál es tu nombre?");

    // Le pregunto al usuario a dónde quiere viajar.
    const destino = prompt("¿Cuál es tu destino?");

    // prompt devuelve texto, por eso convierto los días a número.
    const dias = parseInt(prompt("¿Cuántos días vas a viajar?"));

    // En este caso uso parseFloat porque el presupuesto
    // podría tener decimales.
    const presupuestoDiario = parseFloat(
        prompt("¿Cuánto dinero pensás gastar por día?")
    );

    // Calculo cuánto dinero necesitaría para todo el viaje.
    const presupuestoTotal = dias * presupuestoDiario;

    // Armo un mensaje con los datos que ingresó el usuario.
    const mensaje = `Hola ${nombre}. Tu viaje a ${destino} será de ${dias} días.
Si gastás aproximadamente $${presupuestoDiario} por día,
necesitarás un presupuesto estimado de $${presupuestoTotal}.`;

    // Muestro el resultado en la consola.
    console.log(mensaje);

    // También lo muestro mediante una alerta.
    alert(mensaje);
}