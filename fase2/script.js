const botaoIniciar = document.getElementById("iniciar");

const cenario = document.getElementById("cenario");
const lucario = document.getElementById("lucario");

const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;

const larguraLucario = lucario.offsetWidth;
const alturaLucario = lucario.offsetHeight;

const velocidadeLucario = 15;

let posicaoHorizontal = 0;
let posicaoVertical = 390; // Posição inicial do Lucario
let direcaoHorizontal = 0;
let direcaoVertical = 0;

const teclaPressionada = (tecla) => {
    if (tecla.key === "D") {
        direcaoHorizontal = 1;
    } else if (tecla.key === "A") {
        direcaoHorizontal = -1;
    } else if (tecla.key === "S") {
        direcaoVertical = 1;
    } else if (tecla.key === "W") {
        direcaoVertical = -1;
    }
}

const teclaSolta = (tecla) => {
    if (tecla.key === "D" || tecla.key === "A") {
        direcaoHorizontal = 0;
    } else if (tecla.key === "W" || tecla.key === "S") {
        direcaoVertical = 0;
    }
}

const moveLucario = () => {
    posicaoHorizontal += direcaoHorizontal * velocidadeLucario;
    posicaoVertical += direcaoVertical * velocidadeLucario;
    
    // Limites horizontais
    if (posicaoHorizontal < 0) {
        posicaoHorizontal = 0;
    } else if (posicaoHorizontal + larguraLucario > larguraCenario) {
        posicaoHorizontal = larguraCenario - larguraLucario;
    }

    // Limites verticais
    if (posicaoVertical < 300) { // Não permitir que a posição vertical seja menor que 444
        posicaoVertical = 300;
    } else if (posicaoVertical + alturaLucario > alturaCenario) {
        posicaoVertical = alturaCenario - alturaLucario;
    }
    
    lucario.style.left = posicaoHorizontal + "px";
    lucario.style.top = posicaoVertical + "px";
}

const iniciarJogo = () => {
    console.log("Jogo iniciado!");
    document.addEventListener("keydown", teclaPressionada);
    document.addEventListener("keyup", teclaSolta);
    checaMoveLucario = setInterval(moveLucario, 50);
    botaoIniciar.style.display = "none";
}

botaoIniciar.addEventListener("click", iniciarJogo);


//https://www.youtube.com/watch?v=MYbJzIDjEno