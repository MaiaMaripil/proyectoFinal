// Para la pagina proximos estrenos
const apiKey = "775288778129dbdce6e1dcad87ee9d5d";
const hoy = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
cargarPelis();

// Cargar los próximos estrenos
function cargarPelis() {
   fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=AR&release_date.gte=${hoy}&sort_by=release_date.asc&language=es-ES`)
    .then(res => res.json())
  .then(data => {
      // Filtro adicional por fecha (por si algunas fechas no son correctas)
      const pelisFiltradas = data.results.filter(p => p.release_date && p.release_date > hoy);
      mostrarPeliculas(pelisFiltradas);
    }) 
  .catch(err => console.error("Error al cargar próximos estrenos en Argentina:", err));
}

// Mostrar las películas en el contenedor
// Se crea un div por cada película y se añade al contenedor
function mostrarPeliculas(peliculas) {
    const contenedor = document.getElementById("proxestrenos");
    contenedor.innerHTML = "";

    peliculas.forEach(peli => {
        const div = document.createElement("div");
        div.classList.add("pelicula")

        div.innerHTML = ` <div class="cadaPeli"> <h3>${peli.title}</h3>
  <img src="https://image.tmdb.org/t/p/original${peli.backdrop_path}" alt="${peli.title}">
   <button class="verMasBtn" data-id="${peli.id}">Ver más</button></div>
`;
        contenedor.appendChild(div);// Añade el div al contenedor principal
    });

    // Añadir evento a los botones "Ver más"
    // Cada botón tiene un data-id con el ID de la película
     document.querySelectorAll(".verMasBtn").forEach(boton => {
    boton.addEventListener("click", () => {
      const idPeli = boton.dataset.id;
      mostrarDetallesPelicula(idPeli); // Llama a la función para mostrar los detalles de la película
    });
  });
} 


// Mostrar los detalles de la película seleccionada
// Limpia el contenedor donde estan todas las pelis y muestra los detalles de la película
function mostrarDetallesPelicula(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`)
    .then(res => res.json())
    .then(peli => {
      const contenedor = document.getElementById("proxestrenos");
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

      // Añadir evento al botón "Volver"
      // Al hacer clic, se vuelve a cargar la lista de películas
      document.getElementById("volverBtn").addEventListener("click", cargarPeliculas);
    });
}


// Limpia el contenedor y vuelve a cargar las películas
function cargarPeliculas() {
  const contenedor = document.getElementById("proxestrenos");
  contenedor.innerHTML = "";
  cargarPelis();
}








