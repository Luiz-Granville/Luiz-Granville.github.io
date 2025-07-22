// Sistema de Chuva de Pétalas de Girassol
// Implementação usando Canvas HTML5 nativo

class PetalSystem {
    constructor() {
        this.canvases = new Map();
        this.contexts = new Map();
        this.petalSystems = new Map();
        this.animationId = null;
        this.isRunning = false;
        
        // Configurações
        this.config = {
            maxPetals: 12,
            spawnRate: 0.06,
            colors: [
                [255, 215, 0],    // Dourado
                [255, 165, 0],    // Laranja
                [230, 184, 0],    // Amarelo escuro
                [255, 193, 37],   // Amarelo médio
                [255, 140, 0]     // Laranja escuro
            ]
        };
        
        // Lista de seções com canvas de pétalas
        this.sections = [
            'petals-canvas',
            'petals-canvas-garden',
            'petals-canvas-music',
            'petals-canvas-letter',
            'petals-canvas-wheel',
            'petals-canvas-care',
            'petals-canvas-gallery',
            'petals-canvas-about'
        ];
        
        this.init();
    }
    
    init() {
        this.sections.forEach(sectionId => {
            const container = document.getElementById(sectionId);
            if (container && container.parentElement) {
                this.createCanvas(sectionId, container);
            }
        });
        
        this.setupEventListeners();
        this.start();
    }
    
    createCanvas(sectionId, container) {
        const parentSection = container.parentElement;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Configurar canvas
        canvas.width = parentSection.offsetWidth;
        canvas.height = parentSection.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        // Adicionar ao container
        container.appendChild(canvas);
        
        // Armazenar referências
        this.canvases.set(sectionId, canvas);
        this.contexts.set(sectionId, ctx);
        this.petalSystems.set(sectionId, new SectionPetalSystem(canvas.width, canvas.height));
        
        // Adicionar event listener para cliques
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.petalSystems.get(sectionId).addBurst(x, y, 3);
        });
    }
    
    setupEventListeners() {
        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            this.sections.forEach(sectionId => {
                const canvas = this.canvases.get(sectionId);
                const container = document.getElementById(sectionId);
                if (canvas && container && container.parentElement) {
                    const parentSection = container.parentElement;
                    canvas.width = parentSection.offsetWidth;
                    canvas.height = parentSection.offsetHeight;
                    this.petalSystems.get(sectionId).updateDimensions(canvas.width, canvas.height);
                }
            });
        });
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        // Limpar e atualizar cada canvas
        this.sections.forEach(sectionId => {
            const canvas = this.canvases.get(sectionId);
            const ctx = this.contexts.get(sectionId);
            const system = this.petalSystems.get(sectionId);
            
            if (canvas && ctx && system && canvas.style.display !== 'none') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                system.update(ctx);
            }
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    toggle() {
        this.sections.forEach(sectionId => {
            const canvas = this.canvases.get(sectionId);
            if (canvas) {
                canvas.style.display = canvas.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}

class SectionPetalSystem {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.petals = [];
        this.spawnTimer = 0;
        this.config = {
            maxPetals: 12,
            spawnRate: 0.06,
            colors: [
                [255, 215, 0],    // Dourado
                [255, 165, 0],    // Laranja
                [230, 184, 0],    // Amarelo escuro
                [255, 193, 37],   // Amarelo médio
                [255, 140, 0]     // Laranja escuro
            ]
        };
    }
    
    updateDimensions(width, height) {
        this.width = width;
        this.height = height;
    }
    
    update(ctx) {
        // Spawn de novas pétalas
        this.spawnTimer++;
        if (this.spawnTimer > 60 / (this.config.spawnRate * 60)) {
            if (this.petals.length < this.config.maxPetals) {
                const spawnX = Math.random() * (this.width + 100) - 50;
                const spawnY = Math.random() * -80 - 20;
                this.petals.push(new Petal(spawnX, spawnY));
            }
            this.spawnTimer = 0;
        }
        
        // Atualizar e desenhar pétalas
        for (let i = this.petals.length - 1; i >= 0; i--) {
            this.petals[i].update();
            this.petals[i].draw(ctx);
            
            // Remover pétalas mortas
            if (this.petals[i].isDead(this.height)) {
                this.petals.splice(i, 1);
            }
        }
    }
    
    addBurst(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 40;
            this.petals.push(new Petal(x + offsetX, y + offsetY));
        }
    }
}

class Petal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = Math.random() * 1.2 + 0.8;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.16;
        this.size = Math.random() * 3 + 4;
        this.opacity = 0.7 + Math.random() * 0.3;
        this.lifespan = Math.random() * 100 + 200;
        this.maxLifespan = this.lifespan;
        
        // Escolher cor aleatória
        const colorIndex = Math.floor(Math.random() * 5);
        this.color = [255, 215, 0]; // Dourado padrão
        switch(colorIndex) {
            case 0: this.color = [255, 215, 0]; break;    // Dourado
            case 1: this.color = [255, 165, 0]; break;    // Laranja
            case 2: this.color = [230, 184, 0]; break;    // Amarelo escuro
            case 3: this.color = [255, 193, 37]; break;   // Amarelo médio
            case 4: this.color = [255, 140, 0]; break;    // Laranja escuro
        }
        
        // Propriedades para movimento orgânico
        this.swayAmount = Math.random() * 1.5 + 0.5;
        this.swaySpeed = Math.random() * 0.03 + 0.02;
        this.time = Math.random() * 1000;
    }
    
    update() {
        // Movimento básico
        this.vy += 0.02; // Gravidade mais suave
        
        // Movimento de balanço orgânico
        const sway = Math.sin(this.time * this.swaySpeed) * this.swayAmount;
        this.vx += sway * 0.1;
        
        // Aplicar velocidade
        this.x += this.vx;
        this.y += this.vy;
        
        // Rotação
        this.rotation += this.rotationSpeed;
        
        // Atualizar tempo e vida
        this.time++;
        this.lifespan--;
        
        // Calcular opacidade baseada na vida restante
        if (this.lifespan < 60) {
            this.opacity = this.lifespan / 60;
        }
        
        // Limitar velocidade
        if (Math.abs(this.vx) > 4) this.vx *= 0.9;
        if (this.vy > 4) this.vy = 4;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Aplicar cor e opacidade
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
        
        // Desenhar pétala com forma orgânica
        this.drawPetal(ctx);
        
        ctx.restore();
    }
    
    drawPetal(ctx) {
        const size = this.size;
        
        ctx.beginPath();
        // Forma orgânica de pétala de girassol
        ctx.moveTo(0, -size * 0.8);
        ctx.bezierCurveTo(-size * 0.3, -size * 0.6, -size * 0.4, -size * 0.2, -size * 0.2, 0);
        ctx.bezierCurveTo(-size * 0.3, size * 0.3, -size * 0.1, size * 0.6, 0, size * 0.4);
        ctx.bezierCurveTo(size * 0.1, size * 0.6, size * 0.3, size * 0.3, size * 0.2, 0);
        ctx.bezierCurveTo(size * 0.4, -size * 0.2, size * 0.3, -size * 0.6, 0, -size * 0.8);
        ctx.closePath();
        ctx.fill();
        
        // Adicionar brilho sutil
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.2, size * 0.3, size * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    isDead(canvasHeight) {
        return this.lifespan <= 0 || this.y > canvasHeight + 50;
    }
}

// Sistema global
let globalPetalSystem = null;

// Controle de acessibilidade
function togglePetals() {
    const button = document.getElementById('toggle-petals');
    const petalsIcon = button.querySelector('.petals-icon');
    const petalsOffIcon = button.querySelector('.petals-off-icon');
    
    if (globalPetalSystem) {
        globalPetalSystem.toggle();
        
        // Verificar estado atual baseado no primeiro canvas
        const firstCanvas = globalPetalSystem.canvases.get('petals-canvas');
        const isHidden = firstCanvas && firstCanvas.style.display === 'none';
        
        // Atualizar ícones
        if (isHidden) {
            petalsIcon.style.display = 'none';
            petalsOffIcon.style.display = 'block';
            button.setAttribute('aria-label', 'Habilitar chuva de pétalas');
        } else {
            petalsIcon.style.display = 'block';
            petalsOffIcon.style.display = 'none';
            button.setAttribute('aria-label', 'Desabilitar chuva de pétalas');
        }
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Verificar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Inicializar sistema de pétalas após um pequeno delay
        setTimeout(() => {
            globalPetalSystem = new PetalSystem();
        }, 100);
    }
    
    // Adicionar event listener para o botão de controle
    const toggleButton = document.getElementById('toggle-petals');
    if (toggleButton) {
        toggleButton.addEventListener('click', togglePetals);
    }
});

// Exportar para uso global se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PetalSystem, SectionPetalSystem, Petal };
}

