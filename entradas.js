/*function elegirAsiento() {
    let asientoSolicitado = parseInt(prompt("¿Que asiento deseas?"));
    const asientosDisponibles = Array.from({ length: 21 }, (_, i) => i + 1);
    const mensaje = verificarAsiento(asientosDisponibles, asientoSolicitado);
    alert(mensaje);
}*/
function elegirAsiento() {
  const selectPeli = document.getElementById('filtrarPelicula');
  const idPelicula = selectPeli.value;

  if (!idPelicula) {
    alert("Por favor seleccioná una película antes de elegir un asiento.");
    return;
  }
  let asientoSolicitado = parseInt(prompt("¿Que asiento deseas?"));
  if (isNaN(asientoSolicitado) || asientoSolicitado < 1 || asientoSolicitado > 30) {
    alert("Asiento inválido. Debe estar entre 1 y 30.");
    return;
  }

  let asientos = JSON.parse(localStorage.getItem("asientosDisponibles")) || {};
  let asientosDisponibles = asientos[idPelicula] || [];
  const mensaje = verificarAsiento(asientosDisponibles, asientoSolicitado, idPelicula);
  alert(mensaje);
}

function verificarAsiento(asientosDisponibles, asientoSolicitado, idPelicula) {
  let cambiarBoton = document.getElementById('asientos');//Selecciona el boton
  const contenedor = document.getElementById('infoAsiento');

  if (asientosDisponibles.includes(asientoSolicitado)) {
    // Cambia el texto del botón
    cambiarBoton.innerHTML = 'Cambiar de asiento';

    // Crea un texto con la info del asiento seleccionado
    let mostrarAsiento = document.createElement('p');
    mostrarAsiento.textContent = `Se ha seleccionado el asiento número ${asientoSolicitado}.`;

    // Agrega el texto al contenedor
    contenedor.innerHTML = '';
    contenedor.appendChild(mostrarAsiento);

    // Actualiza los asientos disponibles quitando el seleccionado
    let asientos = JSON.parse(localStorage.getItem("asientosDisponibles")) || {};
    asientos[idPelicula] = asientosDisponibles.filter(a => a !== asientoSolicitado);
    localStorage.setItem("asientosDisponibles", JSON.stringify(asientos));

    // Guardar asiento seleccionado temporalmente
    localStorage.setItem("asientoSeleccionado", JSON.stringify({
      idPelicula,
      asiento: asientoSolicitado
    }));
    return `Felicitaciones, el asiento número ${asientoSolicitado} está disponible!`;
  } else {
    cambiarBoton.innerHTML = 'Elegir asiento';
    contenedor.innerHTML = '';
    return `Lo sentimos, el asiento número ${asientoSolicitado} no está disponible, vuelva a intentarlo`;
  }
}

cargarPelis();
function cargarPelis() {
  const apiKey = "775288778129dbdce6e1dcad87ee9d5d"; // <-- pegá tu clave aquí

  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&region=AR&page=1`)
    .then(response => response.json())
    .then(data => {
      mostrarPeliculas(data.results);
      inicializarAsientos(data.results);
      disponibilidad();
    })
    .catch(error => console.error("Error al cargar nombre de las pelis:", error));
}
function mostrarPeliculas(peliculas) {
  const contenedor = document.getElementById("filtrarPelicula");
  contenedor.innerHTML = "";
  peliculas.forEach(peli => {
    const option = document.createElement("option");
    option.value = peli.id;
    option.textContent = peli.title;
    contenedor.appendChild(option);
    //option.onclick=asientos(peli.id);
  });

}

function inicializarAsientos(peliculas) {
  let asientosDisponibles = JSON.parse(localStorage.getItem("asientosDisponibles")) || {};

  peliculas.forEach(peli => {
    if (!asientosDisponibles[peli.id]) {
      asientosDisponibles[peli.id] = Array.from({ length: 30 }, (_, i) => i + 1); // [1, 2, ..., 30]
    }
  });

  localStorage.setItem("asientosDisponibles", JSON.stringify(asientosDisponibles));
}

function disponibilidad() {
  const select = document.getElementById("filtrarPelicula");
  const contenedor = document.getElementById("asientosDisp");


  select.addEventListener("change", () => {
    const idSeleccionado = select.value;
    const nombrePeli = select.options[select.selectedIndex].text;
    console.log("Película seleccionada:", idSeleccionado, nombrePeli);

    const asientos = JSON.parse(localStorage.getItem("asientosDisponibles")) || {};
     const disponibles = asientos[idSeleccionado] || [];
    const cant = disponibles.length;
    contenedor.innerHTML = `<p id="cantAsientos">La película "${nombrePeli}" tiene ${cant} asientos disponibles.</p>`;
    // No usar document.appendChild, el contenedor ya está en el DOM
  });
}

function comprarEntrada() {
  const selectPeli = document.getElementById("filtrarPelicula");
  const peliSeleccionada = selectPeli.value;

  const selectCine = document.getElementById("elegirCine");
  const cineSeleccionado = selectCine.value;

  const asientoSeleccionado = JSON.parse(localStorage.getItem("asientoSeleccionado"));

  // Validaciones
  if (!cineSeleccionado) {
    alert("Por favor, seleccioná un cine antes de continuar.");
    return;
  }

  if (!peliSeleccionada) {
    alert("Por favor, seleccioná una película antes de continuar.");
    return;
  }

  if (!asientoSeleccionado || asientoSeleccionado.idPelicula !== peliSeleccionada) {
    alert("Por favor, elegí un asiento disponible antes de continuar.");
    return;
  }

  // Limpia el asiento seleccionado
  localStorage.removeItem("asientoSeleccionado");

  // Mostrar mensaje de éxito
  alert(`✅ Entrada comprada para la película "${selectPeli.options[selectPeli.selectedIndex].text}"
  en el cine "${selectCine.options[selectCine.selectedIndex].text}". Asiento número ${asientoSeleccionado.asiento}.`);
}




