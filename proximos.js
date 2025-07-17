// Para la pagina proximos estrenos
const apiKey = "775288778129dbdce6e1dcad87ee9d5d";
const hoy = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
cargarPelis();

function cargarPelis() {
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=es-ES&region=AR&page=1`)
  .then(res => res.json())
  .then(data => mostrarPeliculas(data.results))
  .catch(err => console.error("Error al cargar próximos estrenos en Argentina:", err));
}


function alfabeticaAZ(){
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&region=AR&sort_by=primary_release_date.asc&primary_release_date.gte=${hoy}`)
   .then(response => response.json())
    .then(data => {
      data.results.sort((a, b) => a.title.localeCompare(b.title));
      mostrarPeliculas(data.results);
    })
    .catch(error => console.error("Error al cargar pelis:", error));
}

function alfabeticaZA(){
   fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&region=AR&sort_by=primary_release_date.asc&primary_release_date.gte=${hoy}`)
    .then(response => response.json())
    .then(data => {
     data.results.sort((a, b) => b.title.localeCompare(a.title));
      mostrarPeliculas(data.results);})
    .catch(error => console.error("Error al cargar pelis:", error));
}


function mostrarPeliculas(peliculas) {
    const contenedor = document.getElementById("proxestrenos");
    contenedor.innerHTML = "";

    peliculas.forEach(peli => {
        const div = document.createElement("div");
        div.classList.add("pelicula")


        div.innerHTML = `
  <h3>${peli.title}</h3>
  <img src="https://image.tmdb.org/t/p/original${peli.backdrop_path}" alt="${peli.title}">
  <p class="sinopsis">${peli.overview.substring(0, 100)}...</p>
`;

        contenedor.appendChild(div);
    });
} 
//si se aplican filtros
function filtros(){
    const selectFiltro = document.getElementById("ordenarPeliculas");
  const filtro = selectFiltro.value;

  switch (filtro) {
    case "alfabeticaAZ":
      alfabeticaAZ();
      break;
    case "alfabeticaZA":
      alfabeticaZA();
      break;
    default:
      console.error("Filtro no reconocido");
  }

}






