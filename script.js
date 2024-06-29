let intentos = 6;
let palabra;

fetch("https://random-word.ryanrk.com/api/en/word/random/?Length=5")
  .then(response => response.json())
  .then(response => {
    palabra = response[0].toUpperCase();
    console.log(palabra); // Muestra la palabra correcta
  })
  .catch(err => {
    console.log("Oops! sucedió un error.");
    let listapalabras = ["PERRO", "GATO", "CABALLO", "ELEFANTE", "LEON", "TIGRE", "JIRAFA",
                         "COCODRILO", "CANGURO", "GORILA", "HIPOPOTAMO", "PANTERA", "RINOCERONTE",
                         "AVESTRUZ", "PINGUINO", "CONEJO", "ERIZO", "ZORRO", "BURRO", "BISONTE", "ALCE",
                         "ANTILOPE", "BUFALO", "CAMELLO", "CIERVO", "GUEPARDO", "IGUANA", "KOALA", 
                         "LAGARTO", "MAPACHE"];
    let posicion = Math.floor(Math.random() * listapalabras.length);
    palabra = listapalabras[posicion];
    console.log(palabra);
  });

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("guess-input");
  const boton = document.getElementById("guess-button");
  const restartButton = document.getElementById("restart-button");

  // Event listener para el botón de intentar
  boton.addEventListener("click", () => intentar(input));
  // Event listener para la tecla Enter
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      intentar(input);
    }
  });

  // Event listener para el botón de reiniciar
  restartButton.addEventListener("click", reiniciar);
});

function intentar(input) {
  if (!palabra) {
    mostrarMensaje("<h1>Esperando la palabra...</h1>");
    return;
  }

  const intento = input.value.toUpperCase().trim();

  mostrarMensaje(""); // Limpia cualquier mensaje previo

  // Verifica que la palabra tenga la cantidad correcta de letras y sólo letras
  if (intento.length !== palabra.length || !/^[A-Z]+$/.test(intento)) {
    mostrarMensaje(`<h1>Escribir una palabra de ${palabra.length} letras</h1>`);
    return;
  }

  const grid = document.getElementById("grid");
  const row = document.createElement("div");
  row.className = "row";

  // Crea una fila con las letras del intento del usuario
  for (let i = 0; i < palabra.length; i++) {
    const span = document.createElement("span");
    span.className = "letter";
    span.innerHTML = intento[i];

    if (intento[i] === palabra[i]) {
      span.style.backgroundColor = "green";
    } else if (palabra.includes(intento[i])) {
      span.style.backgroundColor = "yellow";
    } else {
      span.style.backgroundColor = "grey";
    }

    row.appendChild(span);
  }

  grid.appendChild(row);
  input.value = "";
  input.focus();
  intentos--;

  // Verifica si el usuario ha ganado o perdido
  if (intento === palabra) {
    mostrarMensaje("<h1>¡GANASTE!</h1>", true);
  } else if (intentos === 0) {
    mostrarMensaje(`<h1>¡PERDISTE! La palabra era ${palabra}</h1>`, true);
  }
}

// Muestra mensajes en la interfaz y controla la visibilidad de los botones
function mostrarMensaje(mensaje, ocultarBoton = false) {
  const estado = document.getElementById("guesses");
  const input = document.getElementById("guess-input");
  const boton = document.getElementById("guess-button");
  const restartButton = document.getElementById("restart-button");

  input.disabled = ocultarBoton;
  boton.style.display = ocultarBoton ? "none" : "inline-block";
  restartButton.style.display = ocultarBoton ? "inline-block" : "none";
  estado.innerHTML = mensaje;
}

// Reinicia el juego
function reiniciar() {
  intentos = 6; // Reinicia el número de intentos
  palabra = undefined; // Limpia la palabra anterior

  fetch("https://random-word.ryanrk.com/api/en/word/random/?Length=5")
    .then(response => response.json())
    .then(response => {
      palabra = response[0].toUpperCase();
      console.log(palabra); // Muestra la nueva palabra después de reiniciar
    })
    .catch(err => {
      console.log("Oops! sucedió un error.");
      let listapalabras = ["PERRO", "GATO", "CABALLO", "ELEFANTE", "LEON", "TIGRE", "JIRAFA",
                           "COCODRILO", "CANGURO", "GORILA", "HIPOPOTAMO", "PANTERA", "RINOCERONTE",
                           "AVESTRUZ", "PINGUINO", "CONEJO", "ERIZO", "ZORRO", "BURRO", "BISONTE", "ALCE",
                           "ANTILOPE", "BUFALO", "CAMELLO", "CIERVO", "GUEPARDO", "IGUANA", "KOALA", 
                           "LAGARTO", "MAPACHE"];
      let posicion = Math.floor(Math.random() * listapalabras.length);
      palabra = listapalabras[posicion];
      console.log(palabra);
    });

  const input = document.getElementById("guess-input");
  const boton = document.getElementById("guess-button");
  const grid = document.getElementById("grid");
  const estado = document.getElementById("guesses");
  const restartButton = document.getElementById("restart-button");

  // Reinicia el estado de la interfaz
  input.disabled = false;
  boton.style.display = "inline-block";
  restartButton.style.display = "none";
  estado.innerHTML = "";
  grid.innerHTML = "";
  input.value = "";
  input.focus();
}
