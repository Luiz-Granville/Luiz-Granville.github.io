// Drawing.js - Desenho interativo com p5.js inspirado em girassóis e sol
let flowers = [];
let particles = [];
let sunX, sunY;
let colorPalette;
let canvas;
let hiddenMessage = "";
let showMessage = false;
let messageAlpha = 0;

function setup() {
    // Cria o canvas dentro do container específico com tamanho responsivo
    let container = document.getElementById("p5-canvas");
    let containerWidth = container ? container.offsetWidth : 600;
    let canvasWidth = min(containerWidth - 40, 600);
    let canvasHeight = (canvasWidth / 600) * 400;
    
    // Ajusta para celular
    if (window.innerWidth <= 768) {
        canvasWidth = min(containerWidth - 20, 350);
        canvasHeight = (canvasWidth / 350) * 250;
    }
    
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5-canvas");
    
    // Paleta de cores inspirada no tema
    colorPalette = {
        sun: color(255, 204, 102),
        sunGlow: color(255, 235, 153, 100),
        sunflowerPetal: color(255, 215, 0),
        sunflowerCenter: color(139, 69, 19),
        sunflowerDark: color(160, 82, 45),
        stem: color(144, 238, 144),
        background: color(255, 248, 220, 50),
        particle: color(255, 215, 0, 150)
    };
    
    // Posição inicial do sol
    sunX = width * 0.8;
    sunY = height * 0.2;
    
    // Inicializa alguns girassóis com posições fixas para evitar sobreposição
    let flowerScale = canvasWidth / 600; // Escala baseada no tamanho do canvas
    flowers.push(new Sunflower(width * 0.2, height * 0.7, flowerScale));
    flowers.push(new Sunflower(width * 0.5, height * 0.8, flowerScale));
    flowers.push(new Sunflower(width * 0.7, height * 0.65, flowerScale));
    
    // Inicializa partículas
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
    
    console.log("p5.js setup completed");
}

function draw() {
    // Fundo gradiente suave
    drawBackground();
    
    // Desenha partículas flutuantes
    updateAndDrawParticles();
    
    // Desenha o sol
    drawSun();
    
    // Desenha os girassóis
    for (let flower of flowers) {
        flower.update();
        flower.display();
    }
    
    // Efeito de interação com o mouse
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        drawMouseEffect();
    }
    
    // Verifica se deve mostrar mensagem escondida
    checkHiddenMessage();
    
    // Desenha mensagem escondida se necessário
    if (showMessage) {
        drawHiddenMessage();
    }
    
    // Instrução sutil
    drawInstructions();
}

function checkHiddenMessage() {
    if (flowers.length >= 8 && !showMessage) {
        showMessage = true;
        hiddenMessage = "Você criou um jardim de girassóis! 🌻\nCada flor que você plantou carrega um pedacinho\ndo seu carinho e esperança por nós.";
    }
    
    if (showMessage && messageAlpha < 255) {
        messageAlpha += 2;
    }
}

function drawHiddenMessage() {
    push();
    
    // Fundo semi-transparente
    fill(255, 255, 255, messageAlpha * 0.9);
    stroke(colorPalette.sunflowerPetal);
    strokeWeight(2);
    rectMode(CENTER);
    rect(width/2, height/2, 400, 120, 15);
    
    // Texto da mensagem
    fill(139, 111, 71, messageAlpha);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(hiddenMessage, width/2, height/2);
    
    pop();
}

function drawBackground() {
    // Gradiente suave de fundo
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(255, 248, 220), color(255, 235, 205), inter);
        stroke(c);
        line(0, i, width, i);
    }
}

function drawSun() {
    push();
    
    // Brilho do sol
    for (let r = 80; r > 0; r--) {
        let alpha = map(r, 0, 80, 255, 0);
        fill(red(colorPalette.sunGlow), green(colorPalette.sunGlow), blue(colorPalette.sunGlow), alpha * 0.3);
        noStroke();
        ellipse(sunX, sunY, r * 2);
    }
    
    // Sol principal
    fill(colorPalette.sun);
    noStroke();
    ellipse(sunX, sunY, 60);
    
    // Raios do sol
    stroke(colorPalette.sun);
    strokeWeight(3);
    for (let angle = 0; angle < TWO_PI; angle += PI/8) {
        let x1 = sunX + cos(angle) * 40;
        let y1 = sunY + sin(angle) * 40;
        let x2 = sunX + cos(angle) * 55;
        let y2 = sunY + sin(angle) * 55;
        line(x1, y1, x2, y2);
    }
    
    pop();
}

function updateAndDrawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        
        if (particles[i].isDead()) {
            particles.splice(i, 1);
            particles.push(new Particle(random(width), random(height)));
        }
    }
}

function drawMouseEffect() {
    // Efeito suave ao redor do mouse
    push();
    let distance = dist(mouseX, mouseY, sunX, sunY);
    if (distance < 100) {
        // Efeito especial quando próximo ao sol
        fill(255, 215, 0, 30);
        noStroke();
        ellipse(mouseX, mouseY, 50);
    } else {
        // Efeito normal
        fill(255, 182, 193, 50);
        noStroke();
        ellipse(mouseX, mouseY, 30);
    }
    pop();
}

function drawInstructions() {
    push();
    fill(139, 111, 71, 150);
    textAlign(CENTER);
    textSize(14);
    text("Clique para plantar flores", width/2, height - 20);
    pop();
}

function mousePressed() {
    // Adiciona um novo girassol onde o usuário clicou
    if (mouseX > 0 && mouseX < width && mouseY > height * 0.4 && mouseY < height) {
        let flowerScale = width / 600; // Escala baseada no tamanho atual do canvas
        flowers.push(new Sunflower(mouseX, mouseY, flowerScale));
        
        // Adiciona algumas partículas no local do clique
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(mouseX + random(-20, 20), mouseY + random(-20, 20)));
        }
        console.log("Novo girassol plantado em:", mouseX, mouseY);
    }
}

// Classe Sunflower (Girassol)
class Sunflower {
    constructor(x, y, scale = 1) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.stemHeight = random(40, 80) * scale;
        this.petalCount = 16; // Girassóis têm muitas pétalas
        this.petalSize = random(20, 30) * scale;
        this.centerSize = random(15, 25) * scale;
        this.swayAmount = random(0.02, 0.05);
        this.swayOffset = random(TWO_PI);
        this.growth = 0;
        this.maxGrowth = 1;
        this.bloomTime = millis();
        this.facesSun = true; // Girassóis seguem o sol
    }
    
    update() {
        // Animação de crescimento
        if (this.growth < this.maxGrowth) {
            this.growth += 0.02;
        }
        
        // Efeito de proximidade com o sol
        let distanceToSun = dist(this.x, this.y - this.stemHeight, sunX, sunY);
        if (distanceToSun < 150) {
            this.petalSize = lerp(this.petalSize, 30, 0.02);
        }
    }
    
    display() {
        push();
        
        // Caule
        let sway = sin(millis() * this.swayAmount + this.swayOffset) * 3;
        stroke(colorPalette.stem);
        strokeWeight(4);
        line(this.x, this.y, this.x + sway, this.y - this.stemHeight * this.growth);
        
        // Folhas
        if (this.growth > 0.5) {
            this.drawLeaves(sway);
        }
        
        // Girassol
        if (this.growth > 0.7) {
            this.drawSunflower(sway);
        }
        
        pop();
    }
    
    drawLeaves(sway) {
        push();
        fill(colorPalette.stem);
        noStroke();
        
        // Folha esquerda
        let leafY = this.y - this.stemHeight * 0.6;
        ellipse(this.x + sway - 15, leafY, 25, 15);
        
        // Folha direita
        ellipse(this.x + sway + 15, leafY + 10, 25, 15);
        
        pop();
    }
    
    drawSunflower(sway) {
        push();
        translate(this.x + sway, this.y - this.stemHeight * this.growth);
        
        // Rotação para "seguir" o sol
        if (this.facesSun) {
            let angleToSun = atan2(sunY - (this.y - this.stemHeight * this.growth), sunX - (this.x + sway));
            rotate(angleToSun * 0.1); // Rotação sutil
        }
        
        // Pétalas do girassol (amarelas)
        fill(colorPalette.sunflowerPetal);
        noStroke();
        
        for (let i = 0; i < this.petalCount; i++) {
            let angle = (TWO_PI / this.petalCount) * i;
            let petalX = cos(angle) * this.petalSize * 0.8;
            let petalY = sin(angle) * this.petalSize * 0.8;
            
            push();
            translate(petalX, petalY);
            rotate(angle);
            // Pétalas alongadas típicas de girassol
            ellipse(0, 0, this.petalSize * 0.8, this.petalSize * 0.3);
            pop();
        }
        
        // Centro do girassol (marrom escuro com padrão)
        fill(colorPalette.sunflowerCenter);
        ellipse(0, 0, this.centerSize);
        
        // Padrão espiral no centro (típico de girassóis)
        fill(colorPalette.sunflowerDark);
        for (let i = 0; i < 8; i++) {
            let spiralAngle = (TWO_PI / 8) * i + millis() * 0.001;
            let spiralRadius = this.centerSize * 0.2;
            let spiralX = cos(spiralAngle) * spiralRadius;
            let spiralY = sin(spiralAngle) * spiralRadius;
            ellipse(spiralX, spiralY, 3);
        }
        
        pop();
    }
}

// Classe Particle
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.life = 255;
        this.decay = random(1, 3);
        this.size = random(2, 6);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        
        // Movimento suave
        this.vx += random(-0.1, 0.1);
        this.vy += random(-0.1, 0.1);
        
        // Limita a velocidade
        this.vx = constrain(this.vx, -2, 2);
        this.vy = constrain(this.vy, -2, 2);
        
        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
    
    display() {
        push();
        fill(red(colorPalette.particle), green(colorPalette.particle), blue(colorPalette.particle), this.life);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();
    }
    
    isDead() {
        return this.life <= 0;
    }
}

// Função para redimensionar o canvas responsivamente
function windowResized() {
    let container = document.getElementById("p5-canvas");
    if (container) {
        let containerWidth = container.offsetWidth;
        let newWidth = min(containerWidth - 40, 600);
        let newHeight = (newWidth / 600) * 400;
        
        // Ajusta para celular
        if (window.innerWidth <= 768) {
            newWidth = min(containerWidth - 20, 350);
            newHeight = (newWidth / 350) * 250;
        }
        
        resizeCanvas(newWidth, newHeight);
        
        // Reposiciona o sol
        sunX = width * 0.8;
        sunY = height * 0.2;
        
        // Atualiza a escala das flores existentes
        let newScale = newWidth / 600;
        for (let flower of flowers) {
            flower.scale = newScale;
            flower.stemHeight = flower.stemHeight / flower.scale * newScale;
            flower.petalSize = flower.petalSize / flower.scale * newScale;
            flower.centerSize = flower.centerSize / flower.scale * newScale;
        }
    }
}


