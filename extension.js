//para la pagina de inicio
function saludo() {
  let inicio = document.getElementById('Bienvenida');
  let nombreUsuario = prompt("Bienvenido/a! por favor ingrese su nombre");
  if (nombreUsuario != null) {
    sessionStorage.setItem("nombreUsuario", nombreUsuario);
    let cambio = inicio.innerHTML += " " + nombreUsuario + "!!";
    inicio.style.fontSize = '30px';
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

const indicadores = document.querySelector(".carousel-indicators");
const inner = document.querySelector(".carousel-inner");
const contenedorEstrenando = document.getElementById("estrenando");

// llamado a api para la cartelera y carousel 

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=1`)
  .then(response => response.json())
  .then(data => {
    const pelis = data.results.filter(p => p.backdrop_path);
    cargarPeliculasEnCarousel(pelis.slice(0, 5));
    mostrarPeliculas(pelis);
  })
  .catch(error => console.error("Error al cargar pelis:", error));

function cargarPeliculasEnCarousel(peliculas) {
  indicadores.innerHTML = "";
  inner.innerHTML = "";

  peliculas.forEach((peli, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-bs-target", "#carouselExampleIndicators");
    btn.setAttribute("data-bs-slide-to", i);
    btn.setAttribute("aria-label", `Slide ${i + 1}`);
    if (i === 0) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "true");
    }
    indicadores.appendChild(btn);


    // slides
    const item = document.createElement("div");
    item.className = "carousel-item" + (i === 0 ? " active" : "");
    item.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w780${peli.backdrop_path}" class="d-block w-100" alt="${peli.title}">
      <div class="carousel-caption d-none d-md-block">
        <h5>${peli.title}</h5>
        <p>${peli.overview.substring(0, 100)}...</p>
      </div>
    `;
    inner.appendChild(item);
  });
}

function mostrarPeliculas(peliculas) {
  contenedorEstrenando.innerHTML = "";

  peliculas.forEach(peli => {
    const div = document.createElement("div");
    div.classList.add("pelicula");

    div.innerHTML = `
      <h3>${peli.title}</h3>
      <div class="imagen-container">
        <img src="https://image.tmdb.org/t/p/original${peli.backdrop_path}" alt="${peli.title}">
        <p class="sinopsis">${peli.overview.substring(0, 100)}...</p>
      </div>
      <a href="./entradas.html"><button id="quieroEntrada">Quiero mi entrada!</button></a>
    `;

    contenedorEstrenando.appendChild(div);
  });
}

// para el carusel de proximos estrenos
const innerProximos = document.getElementById("innerProximos");

fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=es-ES&page=3`)
  .then(response => response.json())
  .then(data => {
    const pelis = data.results.filter(p => p.backdrop_path);
    cargarCarouselAgrupado(pelis, 4);
  })
  .catch(console.error);

function cargarCarouselAgrupado(peliculas, porSlide) {
  innerProximos.innerHTML = "";

  for (let i = 0; i < peliculas.length; i += porSlide) {
    const grupo = peliculas.slice(i, i + porSlide);

    const item = document.createElement("div");
    item.className = "carousel-item" + (i === 0 ? " active" : "");

    const fila = document.createElement("div");
    fila.className = "row justify-content-center";

    grupo.forEach(peli => {
      const col = document.createElement("div");
      col.className = "col-md-3";

      col.innerHTML = `
      <div class= "card h-100">
      <img src="https://image.tmdb.org/t/p/w780${peli.backdrop_path}" class="card-img-top" alt="${peli.title}">
      <div class="card-body">
        <h5 class="card-title">${peli.title}</h5>
        <p class="card-text">${peli.overview.substring(0, 80)}...</p>
        </div>
</div>
      `;
      fila.appendChild(col);
    });
    item.appendChild(fila);
    innerProximos.appendChild(item);
  }
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