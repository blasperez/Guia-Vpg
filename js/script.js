function playVideo(episodeTitle, driveId) {
    const videoContainer = document.getElementById('videoContainer');
    
    // Extraer el número de episodio del título
    const episodeNumber = episodeTitle.split('x')[1];
    
    // Crear el iframe con el video de Drive
    videoContainer.innerHTML = `
        <div class="video-wrapper">
            <iframe src="https://drive.google.com/file/d/${driveId}/preview"
                    allow="autoplay; fullscreen"
                    allowfullscreen>
            </iframe>
        </div>
        <button id="closeVideo" onclick="closeVideo('${episodeNumber}')">
            Close
        </button>
    `;
    
    // Mostrar el contenedor
    videoContainer.style.display = 'flex';

    // Añadir clase para bloquear el scroll del body
    document.body.classList.add('video-playing');

    // Añadir evento para cerrar con la tecla ESC
    document.addEventListener('keydown', handleEscKey);

    // Detectar orientación en móviles
    checkOrientation();
    window.addEventListener('orientationchange', checkOrientation);
}

function closeVideo(episodeNumber) {
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.style.display = 'none';
    videoContainer.innerHTML = '';
    
    // Marcar como visto
    markAsWatched(episodeNumber);
    
    // Remover clase que bloquea el scroll
    document.body.classList.remove('video-playing');
    
    // Remover eventos
    document.removeEventListener('keydown', handleEscKey);
    window.removeEventListener('orientationchange', checkOrientation);
}

function markAsWatched(episodeNumber) {
    // Guardar en localStorage
    localStorage.setItem(`heroes_s1_ep${episodeNumber}`, 'watched');
    
    // Actualizar la apariencia del enlace
    const episodeLink = document.querySelector(`[data-episode="${episodeNumber}"]`);
    if (episodeLink) {
        episodeLink.classList.add('watched');
        if (!episodeLink.querySelector('.watched-mark')) {
            episodeLink.innerHTML += '<span class="watched-mark">✓</span>';
        }
    }
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeVideo();
    }
}

function checkOrientation() {
    const videoContainer = document.getElementById('videoContainer');
    if (window.matchMedia("(max-width: 900px)").matches) {
        if (window.orientation === 0 || window.orientation === 180) { // Modo retrato
            videoContainer.classList.add('show-rotation-message');
        } else {
            videoContainer.classList.remove('show-rotation-message');
        }
    }
}

function resetWatchedEpisodes() {
    if (confirm('¿Estás seguro de que quieres reiniciar todos los episodios vistos?')) {
        for (let i = 1; i <= 23; i++) {
            const episodeNumber = i.toString().padStart(2, '0');
            localStorage.removeItem(`heroes_s1_ep${episodeNumber}`);
        }
        location.reload();
    }
}

// Prevenir que el contenido se arrastre
document.addEventListener('dragstart', function(event) {
    event.preventDefault();
});
