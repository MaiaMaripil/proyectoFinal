let asientoSolicitado = prompt("¿Que asiento deseas?");
const asientoDisponibles = Array.from({ length: 21 }, (_, i) => i + 1);

function verificarAsiento(asientoDisponibles, asientoSolicitado) {
    if (asientoDisponibles.includes(asientoSolicitado)) {
        return `Felicitaciones, el asiento número ${asientoSolicitado} está disponible!`;
    } //else {
    //  return `Lo sentimos, el asiento número ${asientoSolicitado} no esta disponible, pero aún quedan ${asientoDisponibles.length} asientos disponibles`;
    // }
}


const mensaje = verificarAsiento(asientoDisponibles, asientoSolicitado);
alert(mensaje);

console.log(asientoDisponibles);


