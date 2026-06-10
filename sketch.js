let particles = [];

function setup() {
    // Cria o canvas e o coloca no container específico
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-canvas-container');
    
    // Inicializa partículas para o fundo
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Remove a classe 'no-js' se existir para indicar que o script carregou
    document.body.classList.remove('no-js');
    
    // Inicialização da lógica de revelação imediata para o que estiver visível
    setTimeout(reveal, 100); 
}

function draw() {
    clear(); // Mantém o fundo transparente para o CSS
    
    // Atualiza e desenha partículas
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Classe para partículas decorativas (estilo "verde/natureza")
class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(2, 6);
        this.speedX = random(-0.5, 0.5);
        this.speedY = random(-0.5, 0.5);
        this.alpha = random(50, 150);
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }
    
    display() {
        noStroke();
        fill(39, 174, 96, this.alpha); // Cor var(--primary-green)
        circle(this.x, this.y, this.size);
    }
}

// --- Lógica de Integração com o DOM (Originalmente no script.js) ---

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    reveal();
});

function switchTab(event, tabId) {
    const triggers = document.querySelectorAll('.tab-trigger');
    const panes = document.querySelectorAll('.tab-pane');

    triggers.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}
