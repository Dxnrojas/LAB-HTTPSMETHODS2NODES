function obtenerJugadores() {
  fetch("http://localhost:3000/usuarios")
    .then((respuesta) => respuesta.json())
    .then((datos) => console.log("Respuesta GET", datos))
    .catch((error) => console.error("Error:", error));
}

const enviarJugador = () => {
  const nombreJugador = document.getElementById("nombreJugador").value;
  const jugadaSeleccionada = document.querySelector(
    'input[name="jugada"]:checked'
  );

  if (!jugadaSeleccionada) {
    alert("Por favor selecciona una jugada");
    return;
  }

  const jugada = jugadaSeleccionada.value;

  const usuario = {
    nombre: nombreJugador,
    jugada: jugada,
  };

  alert(`${nombreJugador} ha elegido ${jugada}!`);

  document.getElementById(
    "mensaje-confirmacion"
  ).innerHTML = `<p style="color:rgb(141, 143, 244); font-weight: bold;">${nombreJugador} ha elegido ${jugada}!</p>`;

  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => console.log("Respuesta POST", datos))
    .catch((error) => console.error("Error:", error));
};

document.getElementById("boton-jugar").addEventListener("click", enviarJugador);
