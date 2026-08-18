function iniciarSimulador() {

    const nombre = prompt("¿Cuál es tu nombre?");
    const destino = prompt("¿Cuál es tu destino?");
    const dias = parseInt(prompt("¿Cuántos días vas a viajar?"));
    const presupuestoDiario = parseFloat(
        prompt("¿Cuánto dinero pensás gastar por día?")
    );

    const presupuestoTotal = dias * presupuestoDiario;

    const mensaje = `Hola ${nombre}. Tu viaje a ${destino} será de ${dias} días.
Si gastás aproximadamente $${presupuestoDiario} por día,
necesitarás un presupuesto estimado de $${presupuestoTotal}.`;

    console.log(mensaje);
    alert(mensaje);
}