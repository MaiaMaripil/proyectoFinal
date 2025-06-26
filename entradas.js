let asientoSolicitado = parseInt(prompt("¿Que asiento deseas?"));
const asientosDisponibles = Array.from({ length: 21 }, (_, i) => i + 1);

function verificarAsiento(asientosDisponibles, asientoSolicitado) {
    if (asientosDisponibles.includes(asientoSolicitado) && asientoSolicitado>=0) {
        return `Felicitaciones, el asiento número ${asientoSolicitado} está disponible!`;
    } else {
     return `Lo sentimos, el asiento número ${asientoSolicitado} no esta disponible, vuelva a intentarlo`;
     }
}


const mensaje = verificarAsiento(asientosDisponibles, asientoSolicitado);
alert(mensaje);

//console.log(asientosDisponibles);


