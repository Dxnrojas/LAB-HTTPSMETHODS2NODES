const estadoJuego = document.getElementById("estado-juego");
const eleccionesJugadores = document.getElementById("elecciones-jugadores");
const resultadoJuego = document.getElementById("resultado-juego");

function actualizarEstadoJuego() {
  fetch("http://localhost:3000/usuarios")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log("Respuesta del servidor:", datos);
      const { usuarios, cuentaRegresiva, resultado } = datos;

      if (usuarios.length === 1) {
        estadoJuego.innerHTML = `<p>Esperando oponente... ${cuentaRegresiva} segundos restantes.</p>`;
        resultadoJuego.innerHTML = "";
      } else if (usuarios.length === 2) {
        estadoJuego.innerHTML = "";
        eleccionesJugadores.innerHTML = usuarios
          .map(
            (usuario, index) =>
              `<p>Jugador ${index + 1}: ${usuario.nombre} eligió ${
                usuario.jugada
              }</p>`
          )
          .join("");

        if (resultado) {
          resultadoJuego.innerHTML = `<h2>${resultado}</h2>`;
        }
      } else {
        estadoJuego.innerHTML = "<p>Esperando retadores...</p>";
        eleccionesJugadores.innerHTML = "";
        resultadoJuego.innerHTML = "";
      }
    })
    .catch((error) => console.error("Error:", error));
}

setInterval(actualizarEstadoJuego, 1000);
