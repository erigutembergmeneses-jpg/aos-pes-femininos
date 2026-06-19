document.addEventListener('DOMContentLoaded', () => {
    // 1. Pausa automática ao iniciar outro player
    const audioPlayers = document.querySelectorAll('.track-player audio');

    audioPlayers.forEach(player => {
        player.addEventListener('play', function() {
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== this && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });

        // Tratamento de erro
        player.addEventListener('error', function() {
            console.warn('Erro ao carregar o áudio:', this.src);
            const parentCard = this.closest('.track-card');
            if (parentCard) {
                const label = parentCard.querySelector('.player-label');
                if (label) {
                    label.textContent = '⚠️ Áudio indisponível no momento';
                    label.style.color = '#d32f2f';
                }
            }
        });
    });

    // 2. Clique no título abre o Internet Archive
    const trackTitles = document.querySelectorAll('.track-title');

    trackTitles.forEach(title => {
        title.addEventListener('click', function(e) {
            e.stopPropagation();
            const archiveLink = this.dataset.archiveLink;
            if (archiveLink) {
                window.open(archiveLink, '_blank');
            }
        });

        title.style.cursor = 'pointer';
    });

    // 3. Verificação da imagem de fundo
    const hero = document.querySelector('.hero');
    if (hero) {
        const img = new Image();
        img.onload = function() {
            console.log('✅ Imagem de capa carregada com sucesso!');
        };
        img.onerror = function() {
            console.warn('⚠️ Imagem de capa não carregou. Usando gradiente de fallback.');
            hero.style.backgroundColor = '#2c1810';
        };
        img.src = 'https://archive.org/services/img/pieds-feminins';
    }

    // 4. Mensagens no console
    console.log('✨ Aos Pés Femininos — Poesia, Música e IA.');
    console.log('📖 Coleção completa: https://archive.org/details/pieds-feminins');
    console.log('🎵 Clique no título de cada faixa para abrir no Internet Archive.');
});
