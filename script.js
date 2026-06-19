document.addEventListener('DOMContentLoaded', () => {
    const audioPlayers = document.querySelectorAll('.track-player audio');

    audioPlayers.forEach(player => {
        player.addEventListener('play', function() {
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== this && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });

        player.addEventListener('error', function(e) {
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

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== "#") {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const hero = document.querySelector('.hero');
    if (hero) {
        const img = new Image();
        img.onload = function() {
            console.log('✅ Imagem de fundo carregada com sucesso!');
        };
        img.onerror = function() {
            console.warn('⚠️ Imagem de fundo não encontrada. Verifique se o arquivo capa-aos-pes-femininos.jpg existe no repositório.');
            hero.style.backgroundColor = '#2c1810';
        };
        
        const bgImage = window.getComputedStyle(hero).backgroundImage;
        if (bgImage && bgImage !== 'none') {
            const url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            img.src = url;
        }
    }

    console.log('✨ Aos Pés Femininos — Poesia, Música e IA.');
    console.log('📖 Explore as 12 faixas e o livro digital no Internet Archive.');
    console.log('🎵 Clique no título de cada faixa para abrir no Internet Archive.');
});
