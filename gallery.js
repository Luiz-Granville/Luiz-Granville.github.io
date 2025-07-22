// Gallery.js - Script para carregar fotos dinamicamente
class DynamicGallery {
    constructor() {
        this.galleryContainer = document.getElementById("gallery");
        this.imageFolder = "assets/images/";
        this.imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
        this.loadedImages = [];
        this.init();
    }

    async init() {
        await this.loadImages();
        this.renderGallery();
    }

    async loadImages() {
        // Lista de imagens do usuário
        const userImages = [
            { name: "sol_momento_01.jpg", caption: "Nesse dia o sol tocou a nossa noite de festa na Caribbean." },
            { name: "sol_momento_02.jpg", caption: "Nesse dia o sol tocou o nosso reflexo no espelho na data mais especial da sua vida." },
            { name: "sol_momento_03.jpg", caption: "Nesse dia o sol tocou a nossa paixão pelo futebol pela primeira ve em um estádio." },
            { name: "sol_momento_04.jpg", caption: "Nesse dia o sol tocou seu descanso no meu colo depois de uma viagem cansativa" },
            { name: "sol_momento_05.jpg", caption: "Nesse dia o sol nosso momento leve e divertido com a Maia." },
            { name: "sol_momento_06.jpg", caption: "Nesse dia o sol tocou a nossa aventura de quem se arrisca e merece viver o extraordinário." },
            { name: "sol_momento_07.jpg", caption: "Nesse dia o sol tocou nossos rostos durante um beijo carinhoso sob a briza da natureza." },
            { name: "sol_momento_08.jpg", caption: "Nesse dia o sol tocou nossa pele em um banho de sol repleto de paz." },
            { name: "sol_momento_09.jpg", caption: "Nesse dia o sol tocou nosso descanso na rede, a gente gosta de dormir né KKK" },
            { name: "sol_momento_10.jpg", caption: "Nesse dia o sol tocou um momento especial em família entre músicas e drinks." },
            { name: "sol_momento_11.jpg", caption: "Nesse dia o sol tocou a nossa vontade de viver e aproveitar cada segundo da vida mesmo que em alta velocidade em um rio." }
            
        ];

        for (const image of userImages) {
            const imageUrl = this.imageFolder + image.name;
            if (await this.imageExists(imageUrl)) {
                this.loadedImages.push({
                    url: imageUrl,
                    name: image.name,
                    caption: image.caption
                });
            }
        }

        // Se não houver imagens, adiciona pelo menos os placeholders
        if (this.loadedImages.length === 0) {
            this.loadedImages = [
                {
                    url: this.imageFolder + "placeholder_1.png",
                    name: "placeholder_1.png",
                    caption: "Uma flor delicada esperando pelo sol"
                },
                {
                    url: this.imageFolder + "placeholder_2.png",
                    name: "placeholder_2.png",
                    caption: "Café da manhã aconchegante"
                },
                {
                    url: this.imageFolder + "placeholder_3.png",
                    name: "placeholder_3.png",
                    caption: "Paisagem serena ao amanhecer"
                }
            ];
        }
    }

    async imageExists(url) {
        try {
            const response = await fetch(url, { method: "HEAD" });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // A função generateCaption não é mais necessária, pois as legendas são definidas diretamente em userImages
    // generateCaption(imageName) {
    //     // Gera legendas no formato "Nesse dia o sol tocou isso..."
    //     if (imageName.includes("IMG_6651")) {
    //         return "Nesse dia o sol tocou esse momento de pura felicidade que guardei no coração.";
    //     } else if (imageName.includes("IMG_6669")) {
    //         return "Nesse dia o sol tocou essa noite especial onde nossos sorrisos se encontraram.";
    //     } else if (imageName.includes("IMG_8009")) {
    //         return "Nesse dia o sol tocou essa aventura que me fez pensar em você.";
    //     } else {
    //         // Para outras imagens, escolhe uma legenda padrão
    //         return "Nesse dia o sol tocou esse momento especial que guardei no coração.";
    //     }
    // }

    renderGallery() {
        if (this.loadedImages.length === 0) {
            this.galleryContainer.innerHTML = `
                <div class="no-images">
                    <p>Nenhuma imagem encontrada. Adicione suas fotos na pasta assets/images/</p>
                </div>
            `;
            return;
        }

        this.galleryContainer.innerHTML = "";

        this.loadedImages.forEach((image, index) => {
            const galleryItem = this.createGalleryItem(image, index);
            this.galleryContainer.appendChild(galleryItem);
        });

        // Adiciona animação de entrada
        this.animateGalleryItems();
    }

    createGalleryItem(image, index) {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.style.animationDelay = `${index * 0.1}s`;

        item.innerHTML = `
            <img src="${image.url}" alt="${image.caption}" loading="lazy">
            <div class="gallery-caption">
                <p>${image.caption}</p>
            </div>
        `;

        // Adiciona evento de clique para expandir a imagem
        item.addEventListener("click", () => this.expandImage(image));

        return item;
    }

    expandImage(image) {
        // Cria modal para exibir a imagem em tamanho maior
        const modal = document.createElement("div");
        modal.className = "image-modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${image.url}" alt="${image.caption}">
                <p class="modal-caption">${image.caption}</p>
            </div>
        `;

        document.body.appendChild(modal);

        // Adiciona estilos do modal se não existirem
        if (!document.querySelector("#modal-styles")) {
            const modalStyles = document.createElement("style");
            modalStyles.id = "modal-styles";
            modalStyles.textContent = `
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }

                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    text-align: center;
                }

                .modal-content img {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }

                .modal-caption {
                    color: white;
                    margin-top: 1rem;
                    font-size: 1.2rem;
                }

                .close-modal {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .close-modal:hover {
                    color: #d4a574;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(modalStyles);
        }

        // Eventos para fechar o modal
        const closeBtn = modal.querySelector(".close-modal");
        closeBtn.addEventListener("click", () => {
            modal.remove();
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Fechar com ESC
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                modal.remove();
                document.removeEventListener("keydown", handleEsc);
            }
        };
        document.addEventListener("keydown", handleEsc);
    }

    animateGalleryItems() {
        const items = this.galleryContainer.querySelectorAll(".gallery-item");
        items.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(30px)";
            
            setTimeout(() => {
                item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }, index * 100);
        });
    }

    // Método para adicionar nova imagem (pode ser chamado externamente)
    addImage(imageUrl, caption) {
        this.loadedImages.push({
            url: imageUrl,
            name: imageUrl.split("/").pop(),
            caption: caption || "Nova aventura especial 🌻"
        });
        this.renderGallery();
    }

    // Método para recarregar a galeria
    reload() {
        this.loadedImages = [];
        this.init();
    }
}

// Inicializa a galeria quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    window.gallery = new DynamicGallery();
});

// Adiciona funcionalidade de recarregar galeria (útil para desenvolvimento)
window.reloadGallery = () => {
    if (window.gallery) {
        window.gallery.reload();
    }
};

