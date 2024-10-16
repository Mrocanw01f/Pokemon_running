const botaoIniciar = document.getElementById("iniciar");
const cenario = document.getElementById("cenario");
const lucario = document.getElementById("lucario");

// Dimensões e velocidade
const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;
const larguraLucario = lucario.offsetWidth;
const alturaLucario = lucario.offsetHeight;

const velocidadeLucario = 15;
const velocidadeTiro = 20;

let posicaoHorizontal = 0;
let posicaoVertical = 390;
let direcaoHorizontal = 0;
let direcaoVertical = 0;
let tiroEmProgresso = false;

const teclaPressionada = (tecla) => {
    if (tecla.key.toLowerCase() === "d") direcaoHorizontal = 1;
    else if (tecla.key.toLowerCase() === "a") direcaoHorizontal = -1;
    else if (tecla.key.toLowerCase() === "s") direcaoVertical = 1;
    else if (tecla.key.toLowerCase() === "w") direcaoVertical = -1;
};

const teclaSolta = (tecla) => {
    if (tecla.key.toLowerCase() === "d" || tecla.key.toLowerCase() === "a") direcaoHorizontal = 0;
    else if (tecla.key.toLowerCase() === "w" || tecla.key.toLowerCase() === "s") direcaoVertical = 0;
};

const moveLucario = () => {
    posicaoHorizontal += direcaoHorizontal * velocidadeLucario;
    posicaoVertical += direcaoVertical * velocidadeLucario;

    // Limites
    if (posicaoHorizontal < 0) posicaoHorizontal = 0;
    else if (posicaoHorizontal + larguraLucario > larguraCenario) posicaoHorizontal = larguraCenario - larguraLucario;

    if (posicaoVertical < 430) posicaoVertical = 430;
    else if (posicaoVertical + alturaLucario > alturaCenario) posicaoVertical = alturaCenario - alturaLucario;

    lucario.style.left = posicaoHorizontal + "px";
    lucario.style.top = posicaoVertical + "px";
};

const dispararTiro = () => {
    if (!tiroEmProgresso) {
        lucario.style.backgroundImage = "url('./assents/lucario2.png')"; // Caminho relativo
        tiroEmProgresso = true;

        const tiro = document.createElement("div");
        tiro.classList.add("tiro");
        cenario.appendChild(tiro);

        let posicaoTiro = posicaoHorizontal + larguraLucario;
        tiro.style.left = posicaoTiro + "px";
        tiro.style.top = (posicaoVertical + alturaLucario / 2) + "px";

        const moverTiro = setInterval(() => {
            posicaoTiro += velocidadeTiro;
            tiro.style.left = posicaoTiro + "px";

            if (posicaoTiro > larguraCenario) {
                clearInterval(moverTiro);
                tiro.remove();
                tiroEmProgresso = false;
            }
        }, 50);

        setTimeout(() => {
            lucario.style.backgroundImage = "url('./assents/lucario.gif')"; // Caminho relativo
        }, 800);
    }
};

const iniciarJogo = () => {
    console.log("Jogo iniciado!");
    document.addEventListener("keydown", teclaPressionada);
    document.addEventListener("keyup", teclaSolta);
    document.addEventListener("keydown", (event) => {
        if (event.key === " ") dispararTiro();
    });
    setInterval(moveLucario, 50);
    botaoIniciar.style.display = "none";
};

botaoIniciar.addEventListener("click", iniciarJogo);

// CSS para o tiro
const style = document.createElement('style');
style.innerHTML = `
    .tiro {
        position: absolute;
        width: 70px;
        height: 70px;
        background-image: url('./assents/tiro.png'); /* Caminho relativo */
        background-size: cover;
    }
`;
document.head.appendChild(style);
