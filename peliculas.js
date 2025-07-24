const apiKey = "775288778129dbdce6e1dcad87ee9d5d";
  const hoy = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
//Por defecto siempre se ordea de mas reciente a mas antiguas
masRecientes();

 
function masRecientes() {

  //La api solo muestra 20 pelis por pagina ,para que muestre mas pelis hago un for
  for (let i = 1; i <= 2; i++) {
    
     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=AR&release_date.lte=${hoy}&sort_by=release_date.desc&language=es-ES`)
      .then(res => res.json())
      .then(data => mostrarPeliculas(data.results))
      .catch(err => console.error("Error al cargar películas de Argentina:", err));

  }
}

// Cargar las películas más antiguas
function masAntiguas() {
  for (let i = 1; i <= 2; i++) {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=AR&release_date.lte=${hoy}&sort_by=release_date.asc&language=es-ES`)
          .then(response => response.json())
      .then(data => {
        data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        mostrarPeliculas(data.results);
      })
      .catch(error => console.error("Error al cargar pelis:", error));
  }
}

// Ordenar alfabéticamente de A a Z
// Se usa el método localeCompare para comparar los títulos de las películas
function alfabeticaAZ() {
  for (let i = 1; i <= 2; i++) {
     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=AR&release_date.lte=${hoy}&sort_by=release_date.desc&language=es-ES`)
      .then(response => response.json())
      .then(data => {
        data.results.sort((a, b) => a.title.localeCompare(b.title));
        mostrarPeliculas(data.results);
      })
      .catch(error => console.error("Error al cargar pelis:", error));
  }
}

// Ordenar alfabéticamente de Z a A
// Similar al anterior, pero invierte el orden de comparación
function alfabeticaZA() {
  for (let i = 1; i <= 2; i++) {
     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=AR&release_date.lte=${hoy}&sort_by=release_date.desc&language=es-ES`)
      .then(response => response.json())
      .then(data => {
        data.results.sort((a, b) => b.title.localeCompare(a.title));
        mostrarPeliculas(data.results);
      })
      .catch(error => console.error("Error al cargar pelis:", error));
  }
}


// Cargar todas las películas
function mostrarPeliculas(peliculas) {
  const contenedor = document.getElementById("todaspelis");

  peliculas.forEach(peli => {
    const div = document.createElement("div");
    div.classList.add("pelicula");
    div.innerHTML = `<div class="cadaPeli"> 
  <h3>${peli.title}</h3>
  <img src="https://image.tmdb.org/t/p/original${peli.backdrop_path}" alt="${peli.title}">
  
  <button class="verMasBtn" data-id="${peli.id}">Ver más</button></div>
`;

    contenedor.appendChild(div);
  });

  // Añadir evento a los botones "Ver más"
  // Cada botón tiene un data-id con el ID de la película
  document.querySelectorAll(".verMasBtn").forEach(boton => {
    boton.addEventListener("click", () => {
      const idPeli = boton.dataset.id;
      mostrarDetallesPelicula(idPeli);
    });
  });
}

// Mostrar los detalles de la película seleccionada
// Limpia el contenedor donde estan todas las pelis y muestra los detalles de la película
function mostrarDetallesPelicula(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`)
    .then(res => res.json())
    .then(peli => {
      const contenedor = document.getElementById("todaspelis");
      contenedor.innerHTML = ""; // Limpia el contenedor antes de mostrar los detalles
      contenedor.innerHTML = `
        <button id="volverBtn">← Volver</button>
        <div class="detalle">
          <img src="https://image.tmdb.org/t/p/w400${peli.poster_path}" />
          <div class="detalle-info">
            <h2>${peli.title}</h2>
            <p><strong>Fecha de estreno:</strong> ${peli.release_date}</p>
            <p><strong>Sinopsis:</strong> ${peli.overview}</p>
            <p><strong>Idioma original:</strong> ${peli.original_language}</p>
          </div>
        </div>
      `;

      document.getElementById("volverBtn").addEventListener("click", cargarPeliculas);
    });
}

// Limpia el contenedor y vuelve a cargar las películas
// Esta función se llama al hacer clic en el botón "Volver"
function cargarPeliculas() {
  const contenedor = document.getElementById("todaspelis");
  contenedor.innerHTML = "";
  filtros();
}

// Función para aplicar los filtros seleccionados

function filtros() {
  const selectFiltro = document.getElementById("ordenarPeliculas");
  const filtro = selectFiltro.value;
  const contenedor = document.getElementById("todaspelis");

  // Dependiendo del valor seleccionado se cargan las películas correspondientes
  switch (filtro) {
    case "recientes":
      contenedor.innerHTML = ""; //antes de aplicar el filtro limpia las pelis que estaban antes
      masRecientes();
      break;
    case "antiguas":
      contenedor.innerHTML = "";
      masAntiguas();
      break;
    case "alfabeticaAZ":
      contenedor.innerHTML = "";
      alfabeticaAZ();
      break;
    case "alfabeticaZA":
      contenedor.innerHTML = "";
      alfabeticaZA();
      break;
    default:
      console.error("Filtro no reconocido");
  }

}

// Resetea los filtros al valor por defecto
function limpiarFiltros() {
  const selectFiltro = document.getElementById("ordenarPeliculas");
  selectFiltro.value = "recientes"; // Resetea al valor por defecto
  masRecientes(); // Vuelve a cargar las películas por defecto
}




