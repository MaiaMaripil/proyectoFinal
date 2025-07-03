function elegirAsiento() {
    let asientoSolicitado = parseInt(prompt("¿Que asiento deseas?"));
    const asientosDisponibles = Array.from({ length: 21 }, (_, i) => i + 1);
    const mensaje = verificarAsiento(asientosDisponibles, asientoSolicitado);
    alert(mensaje);
}


function verificarAsiento(asientosDisponibles, asientoSolicitado) {
    let cambiarBoton = document.getElementById('asientos');//Selecciona el boton
    const contenedor = document.getElementById('infoAsiento');

    if (asientosDisponibles.includes(asientoSolicitado) && asientoSolicitado >= 0) {
        //cambia el texto del boton
        cambiarBoton.innerHTML = 'Cambiar de asiento';

        //crea un texto con la info del asiento seleccionado
        let mostrarAsiento = document.createElement('p');
        mostrarAsiento.textContent = `Se ha seleccionado el asiento número ${asientoSolicitado}.`;

        //Agrega el texto a el contenedor
        contenedor.innerHTML = ''; // Limpia si ya había algo antes
        contenedor.appendChild(mostrarAsiento);
        return `Felicitaciones, el asiento número ${asientoSolicitado} está disponible!`;
    } else {
        //Si quiso cambiar el asiento, y al hacerlo se selecciono un asiento no valido vuelve a cambiar
        //el boton y elimina el texto anterior.
        cambiarBoton.innerHTML = 'Elegir asiento';
        const contenedor = document.getElementById('infoAsiento');
        contenedor.innerHTML = ''; // Limpia si ya había algo antes
        return `Lo sentimos, el asiento número ${asientoSolicitado} no esta disponible, vuelva a intentarlo`;
    }
}


//console.log(asientosDisponibles);


