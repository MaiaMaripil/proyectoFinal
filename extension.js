//para la pagina de inicio
function saludo() {
   let inicio=document.getElementById('Bienvenida');
  let nombreUsuario = prompt("Bienvenido/a! por favor ingrese su nombre");
  if(nombreUsuario!=null){
    sessionStorage.setItem("nombreUsuario", nombreUsuario);
    let cambio= inicio.innerHTML+=" "+nombreUsuario+"!!";
    inicio.style.fontSize='30px';
    console.log(cambio);
  }
}

function mostrarNombreGuardado() {
  let inicio = document.getElementById('Bienvenida');
  const nombreGuardado = sessionStorage.getItem("nombreUsuario");
//Si ya hay un nombre guardado
  if (nombreGuardado) {
    inicio.innerHTML += " " + nombreGuardado + "!!";
    inicio.style.fontSize = '30px';
  } else {
    saludo(); // si no hay nada guardado, pedir el nombre
  }
}
mostrarNombreGuardado();


const apiKey = "775288778129dbdce6e1dcad87ee9d5d"; // <-- pegá tu clave aquí

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=1`)
  .then(response => response.json())
  .then(data => mostrarPeliculas(data.results))
  .catch(error => console.error("Error al cargar pelis:", error));

function mostrarPeliculas(peliculas) {
  const contenedor = document.getElementById("estrenos");

  peliculas.forEach(peli => {
    const div = document.createElement("div");
    div.classList.add("slide");

    div.innerHTML = `
    <h3>${peli.title}</h3>
      <img src="https://image.tmdb.org/t/p/original${peli.backdrop_path}" alt="${peli.title}">
      
      <p>Estreno: ${peli.release_date}</p>
      <p>${peli.overview.substring(0, 80)}...</p>
       <a href="./entradas.html"><button id="quieroEntrada" >Quiero mi entrada!</button></a>
       
    `;

    contenedor.appendChild(div);
  });
}

//para el boton de "quiero mi entrada"
/*
function entrada() {
  alert("Conseguiste tus entradas!")
}*/

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