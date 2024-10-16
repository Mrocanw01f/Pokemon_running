const botaoIniciar = document.getElementById("iniciar");
const cenario = document.getElementById("cenario");
const lucario = document.getElementById("lucario");

// Definindo as dimensões do cenário e Lucario
const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;
const larguraLucario = lucario.offsetWidth;
const alturaLucario = lucario.offsetHeight;

const velocidadeLucario = 15;
const velocidadeTiro = 20; // Velocidade do tiro

let posicaoHorizontal = 0;
let posicaoVertical = 390; // Posição inicial de Lucario
let direcaoHorizontal = 0;
let direcaoVertical = 0;
let tiroEmProgresso = false; // Controle de disparo único

const teclaPressionada = (tecla) => {
    if (tecla.key.toLowerCase() === "d") {
        direcaoHorizontal = 1;
    } else if (tecla.key.toLowerCase() === "a") {
        direcaoHorizontal = -1;
    } else if (tecla.key.toLowerCase() === "s") {
        direcaoVertical = 1;
    } else if (tecla.key.toLowerCase() === "w") {
        direcaoVertical = -1;
    }
}

const teclaSolta = (tecla) => {
    if (tecla.key.toLowerCase() === "d" || tecla.key.toLowerCase() === "a") {
        direcaoHorizontal = 0;
    } else if (tecla.key.toLowerCase() === "w" || tecla.key.toLowerCase() === "s") {
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
    if (posicaoVertical < 430) {
        posicaoVertical = 430;
    } else if (posicaoVertical + alturaLucario > alturaCenario) {
        posicaoVertical = alturaCenario - alturaLucario;
    }

    lucario.style.left = posicaoHorizontal + "px";
    lucario.style.top = posicaoVertical + "px";
}

// Função para criar e disparar o tiro
const dispararTiro = () => {
    if (!tiroEmProgresso) { // Dispara apenas se não houver tiro em progresso        
        lucario.style.backgroundImage = "url('/assents/lucario2.png')"; // Mudar para lucario2.gif
        tiroEmProgresso = true;


        const tiro = document.createElement("div");
        tiro.classList.add("tiro");
        cenario.appendChild(tiro);

        let posicaoTiro = posicaoHorizontal + larguraLucario; // Começa na posição de Lucario
        tiro.style.left = posicaoTiro + "px";
        tiro.style.top = (posicaoVertical + alturaLucario / 2) + "px"; // Alinha com o centro do Lucario

        const moverTiro = setInterval(() => {
            posicaoTiro += velocidadeTiro;
            tiro.style.left = posicaoTiro + "px";

            // Remover o tiro quando sair da tela
            if (posicaoTiro > larguraCenario) {
                clearInterval(moverTiro);
                tiro.remove();
                tiroEmProgresso = false; // Permitir novo tiro
            }
        }, 50);

        // Após 2 segundos, voltar para a imagem original
        setTimeout(() => {
            lucario.style.backgroundImage = "url('/assents/lucario.gif')"; // Voltar para lucario.gif
        }, 900); // 1000 milissegundos = 1 segundo
    }
}

const iniciarJogo = () => {
    console.log("Jogo iniciado!");
    document.addEventListener("keydown", teclaPressionada);
    document.addEventListener("keyup", teclaSolta);
    document.addEventListener("keydown", (event) => {
        if (event.key === " ") { // Barra de espaço para disparar
            dispararTiro();
        }
    });
    setInterval(moveLucario, 50);
    botaoIniciar.style.display = "none";
}

botaoIniciar.addEventListener("click", iniciarJogo);

// CSS para o tiro
const style = document.createElement('style');
style.innerHTML = `
    .tiro {
        position: absolute;
        width: 70px;
        height: 70px;
        background-image: url('/assents/tiro.png'); /* Substitua pela URL da sua imagem de tiro */
        background-size: cover;
    }
`;
document.head.appendChild(style);
