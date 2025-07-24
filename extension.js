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



const apiKey = "775288778129dbdce6e1dcad87ee9d5d";
const indicadores = document.querySelector(".carousel-indicators"); 
const inner = document.querySelector(".carousel-inner");
const contenedorEstrenando = document.getElementById("estrenando");
 const hoy = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

// llamado a api para la cartelera y carousel 

fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=1`)
  .then(response => response.json())
  .then(data => {
    const pelis = data.results.filter(p => p.backdrop_path);
    // Pelis para la cartelera: las siguientes 10 
const pelisCartelera = pelis.slice(0, 9);
    cargarPeliculasEnCarousel(pelis.slice(0, 5));
    mostrarPeliculas(pelisCartelera);
    
  })
  .catch(error => console.error("Error al cargar pelis:", error));

function cargarPeliculasEnCarousel(peliculas) {
  indicadores.innerHTML = "";
  inner.innerHTML = "";

  peliculas.forEach((peli, i) => {
    //crea botones para los indicadores del carrusel
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-bs-target", "#carouselExampleIndicators"); 
    btn.setAttribute("data-bs-slide-to", i);
    btn.setAttribute("aria-label", `Slide ${i + 1}`); 

    //si es el primer slide, agregar clases para que se muestre como activo
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
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-4">
        <h5>${peli.title}</h5>
        <p >${peli.overview.substring(0, 150)}...</p>
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
      <div class="cadaPeli"> 
  <h3>${peli.title}</h3>
  <img src="https://image.tmdb.org/t/p/original${peli.backdrop_path}" alt="${peli.title}">
  
      <a href="./entradas.html"><button id="quieroEntrada">Quiero mi entrada!</button></a></div>
    `;

    contenedorEstrenando.appendChild(div);
  });
}

// para el carusel de proximos estrenos
const innerProximos = document.getElementById("innerProximos");

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=AR&release_date.gte=${hoy}&sort_by=release_date.asc&language=es-ES`)
  .then(response => response.json())
  .then(data => {
     // Filtro adicional por fecha (por si algunas fechas no son correctas)
      const pelisFiltradas = data.results.filter(p => p.release_date && p.release_date > hoy);
    const pelis = pelisFiltradas.filter(p => p.backdrop_path);
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
      <div class="card-body d-md-block  text-white bg-dark  rounded p-4">
        <h5 class="card-title ">${peli.title}</h5>
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

