"use strict"

const botaoTrocarImagem = document.getElementById('trocar-imagem');
const botaoAuto = document.getElementById('auto');
const inserirImagem = document.getElementById('imagem');
let autoIntervalo = null;

//lista de imagens para o auto
const listaImagem = [
   'attackontitan.jpg',
    'jojo.jpg', 
    'naruto.jpg',
    'demonking.jpg',
    'dragonball.jpg'
];
let currentImageIndex = 0;

function trocarImagem() {
    const imagem = inserirImagem.value.trim();
    if (imagem) {
        // garante que o caminho da imagem esteja formatado de forma apropriada
        const urlImagem = `url('img/${imagem.endsWith('.jpg') || imagem.endsWith('.png') ? imagem : imagem + '.jpg'}')`;
        document.documentElement.style.setProperty('--bg-image', urlImagem);
    }
}

function trocarImagemAutomatico() {
    const imagem = listaImagem[currentImageIndex];
    const imageUrl = `url('img/${imagem}')`;
    document.documentElement.style.setProperty('--bg-image', imageUrl);
    currentImageIndex = (currentImageIndex + 1) % listaImagem.length;
}

function ativarAuto() {
    //usado para parar ou ativar o auto
    if (autoIntervalo) {
        clearInterval(autoIntervalo);
        autoIntervalo = null;
        botaoAuto.textContent = 'Auto';
    } else {
        trocarImagemAutomatico(); 
        autoIntervalo = setInterval(trocarImagemAutomatico, 2000); // muda a cada 3 segundos
        botaoAuto.textContent = 'Stop';
    }
}

// Event listeners
botaoTrocarImagem.addEventListener('click', trocarImagem);
botaoAuto.addEventListener('click', ativarAuto);

inserirImagem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        trocarImagem();
    }
}); 