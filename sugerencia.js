document.getElementById("formSugerencia").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value; //se verifica en html
  const mensaje = document.getElementById("mensaje").value;
  const respuesta = document.getElementById("respuesta");

  // Validar nombre (mínimo 2 caracteres, solo letras y espacios)
  const nombreValido = verificarNombre(nombre);
  function verificarNombre(nombre) {
    if(!nombre || nombre.length < 2) {
        return false;
    }else{
        return true;
    }
  }

  if (!nombreValido) {
    alert( "Por favor ingresa un nombre válido (mínimo 2 caracteres).");
    return;
  }

  if (!mensaje || mensaje.length < 5) {
    alert("La sugerencia debe tener al menos 5 caracteres.");
    return;
  }

  // Recuperar sugerencias previas o crear array vacío
  let sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];

  // Agregar la nueva sugerencia
  sugerencias.push({
    nombre,
    email,
    mensaje,
    fecha: new Date().toISOString()
  });

  // Guardar en localStorage
  localStorage.setItem("sugerencias", JSON.stringify(sugerencias));

  // Limpiar formulario y mostrar mensaje
  this.reset();
  alert("¡Gracias por tu sugerencia!");
});