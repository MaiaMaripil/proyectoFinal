//para la pagina de inicio
function saludo() {
  let nombreUsuario = prompt("Bienvenido/a, por favor ingrese su nombre");
  alert("Bienvenido " + nombreUsuario);
}

//para el boton de "quiero mi entrada"
function entrada() {
  alert("Conseguiste tus entradas!")
}

//para los filtros de las peliculas
function filtroOrdenar() {
  switch (ordenSeleccionado) {
    case "recientes":
      // ordena por las más recientes
      break;
    case "antiguas":
      // ordena por las más antiguas
      break;
    case "MayorCalificacion":
      // ordena por las de mayor calificación
      break;
    case "menorCalificacion":
      // ordena por las de menor calificación
      break;
    case "alfabeticamenteAZ":
      // ordena de la A a la Z
      break;
    case "alfabeticamenteZA":
      // ordena de la Z a la A
      break;
    default:
      // opción por defecto si no coincide con ningún caso
      break;
  }
}

function filtroGenero() {
  switch (generoSeleccionado) {
    case "comedia":
      // solo muestra las pelis de comedia
      break;
    case "romance":
      // solo muestra las pelis de romance
      break;
    case "accion":
      // solo muestra las pelis de acción
      break;
    case "cienciaFiccion":
      // solo muestra las pelis de ciencia ficción
      break;
  }
}

function filtroAnio() {
  if (desde > hasta) {
    alert("Error en la selección del rango de años");
  } else {
    // muestra las pelis desde la variable "desde" hasta la variable "hasta"
  }
}