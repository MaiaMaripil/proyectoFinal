const apiKey = "775288778129dbdce6e1dcad87ee9d5d";

//Por defecto siempre se ordea de mas reciente a mas antiguas
fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES&page=1`)
    .then(response => response.json())
    .then(data => mostrarPeliculas(data.results))
    .catch(error => console.error("Error al cargar pelis:", error));

function mostrarPeliculas(peliculas) {
    const contenedor = document.getElementById("todaspelis");
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

  if(filtro === "antiguas"){ 
    masAntiguas();
}

}


function masAntiguas(){
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=es-ES&page=1`)
    .then(response => response.json())
    .then(data => { data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        mostrarPeliculas(data.results);})
    .catch(error => console.error("Error al cargar pelis:", error));
}

