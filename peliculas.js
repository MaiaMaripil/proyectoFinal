const apiKey = "775288778129dbdce6e1dcad87ee9d5d";

//Por defecto siempre se ordea de mas reciente a mas antiguas
masRecientes();
function masRecientes() {
    //La api solo muestra 20 pelis por pagina ,para que muestre mas pelis hago un for
    for (let i = 1; i <= 2; i++) {
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&region=AR&sort_by=primary_release_date.desc&page=${i}`)
  .then(res => res.json())
  .then(data => mostrarPeliculas(data.results))
  .catch(err => console.error("Error al cargar películas de Argentina:", err));

}
}

function masAntiguas(){
    for (let i = 1; i <= 2; i++) {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES&page=1`)
    .then(response => response.json())
    .then(data => { data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        mostrarPeliculas(data.results);})
    .catch(error => console.error("Error al cargar pelis:", error));
}}

function alfabeticaAZ(){
    for (let i = 1; i <= 2; i++) {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES&page=1`)
    .then(response => response.json())
    .then(data => {
      data.results.sort((a, b) => a.title.localeCompare(b.title));
      mostrarPeliculas(data.results);
    })
    .catch(error => console.error("Error al cargar pelis:", error));
}}

function alfabeticaZA(){
    for (let i = 1; i <= 2; i++) {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES&page=1`)
    .then(response => response.json())
    .then(data => {
     data.results.sort((a, b) => b.title.localeCompare(a.title));
      mostrarPeliculas(data.results);})
    .catch(error => console.error("Error al cargar pelis:", error));
}}




function mostrarPeliculas(peliculas) {
    const contenedor = document.getElementById("todaspelis");
    
    peliculas.forEach(peli => {
        const div = document.createElement("div");
        div.classList.add("pelicula");
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
const contenedor = document.getElementById("todaspelis");
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

function limpiarFiltros() {
  const selectFiltro = document.getElementById("ordenarPeliculas");
  selectFiltro.value = "recientes"; // Resetea al valor por defecto
  masRecientes(); // Vuelve a cargar las películas por defecto
}




