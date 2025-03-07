const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

let usuarios = [];
let cuentaRegresiva = 10;
let tiempoJuego = null;

function calcularGanador(jugador1, jugador2) {
    if (jugador1.jugada === jugador2.jugada) {
        return "¡Es un empate!";
    }

    if (
        (jugador1.jugada === "piedra" && jugador2.jugada === "tijeras") ||
        (jugador1.jugada === "papel" && jugador2.jugada === "piedra") ||
        (jugador1.jugada === "tijeras" && jugador2.jugada === "papel")
    ) {
        return `${jugador1.nombre} gana!`;
    } else {
        return `${jugador2.nombre} gana!`;
    }
}

function reiniciarJuego() {
    usuarios = [];
    cuentaRegresiva = 10;
    console.log("Juego reiniciado. Esperando nuevos jugadores.");
}

app.get("/usuarios", (req, res) => {
    let resultado = null;
    if (usuarios.length === 2) {
        resultado = calcularGanador(usuarios[0], usuarios[1]);
    }
    res.status(200).json({ usuarios, cuentaRegresiva, resultado });
});

app.post("/usuarios", (req, res) => {
    const usuario = req.body;

    if (usuarios.length >= 2) {
        return res.status(400).json({ mensaje: "Solo se permiten 2 jugadores." });
    }

    usuarios.push(usuario);

    if (usuarios.length === 1) {
        tiempoJuego = setInterval(() => {
            cuentaRegresiva--;
            if (cuentaRegresiva <= 0) {
                clearInterval(tiempoJuego);
                reiniciarJuego();
            }
        }, 1000);
    }

    if (usuarios.length === 2) {
        clearInterval(tiempoJuego);
        setTimeout(reiniciarJuego, 10000);
    }

    res.status(201).json(usuario);
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});
