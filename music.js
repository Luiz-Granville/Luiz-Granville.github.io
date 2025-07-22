// Music.js - Controle da música ambiente com botão flutuante
class MusicController {
    constructor() {
        this.ambientMusic = document.getElementById("ambient-music");
        this.toggleButton = document.getElementById("music-toggle-btn");
        this.musicIcon = this.toggleButton.querySelector(".music-icon");
        this.muteIcon = this.toggleButton.querySelector(".mute-icon");
        this.isPlaying = false;
        this.volume = 0.3; // Volume baixo para música ambiente
        this.init();
    }

    init() {
        if (this.ambientMusic && this.toggleButton) {
            this.ambientMusic.volume = this.volume;
            this.toggleButton.addEventListener("click", () => this.togglePlayPause());

            this.ambientMusic.addEventListener("loadeddata", () => {
                console.log("Música ambiente carregada");
            });

            this.ambientMusic.addEventListener("error", (e) => {
                console.log("Erro ao carregar música ambiente:", e);
                this.handleMusicError();
            });

            // Tenta reproduzir automaticamente ao carregar a página
            this.attemptAutoPlay();
        }
    }

    async attemptAutoPlay() {
        try {
            await this.ambientMusic.play();
            this.isPlaying = true;
            this.updateToggleButton();
        } catch (error) {
            console.log("Auto-play bloqueado pelo navegador. Usuário precisa interagir primeiro.");
            this.isPlaying = false;
            this.updateToggleButton();
            this.addFirstInteractionListener();
        }
    }

    addFirstInteractionListener() {
        const startMusic = () => {
            this.play();
            document.removeEventListener("click", startMusic);
            document.removeEventListener("touchstart", startMusic);
        };

        document.addEventListener("click", startMusic);
        document.addEventListener("touchstart", startMusic);
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    async play() {
        try {
            await this.ambientMusic.play();
            this.isPlaying = true;
            this.updateToggleButton();
        } catch (error) {
            console.log("Erro ao reproduzir música:", error);
        }
    }

    pause() {
        this.ambientMusic.pause();
        this.isPlaying = false;
        this.updateToggleButton();
    }

    updateToggleButton() {
        if (this.isPlaying) {
            this.musicIcon.style.display = "inline";
            this.muteIcon.style.display = "none";
        } else {
            this.musicIcon.style.display = "none";
            this.muteIcon.style.display = "inline";
        }
    }

    handleMusicError() {
        console.error("Não foi possível carregar a música ambiente.");
        if (this.toggleButton) {
            this.toggleButton.style.display = "none"; // Esconde o botão se a música não carregar
        }
    }
}

// Inicializa o controlador de música quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    window.musicController = new MusicController();
});


