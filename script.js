document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Player de Áudio: Pausa automática ao iniciar outro ---
  const audioPlayers = document.querySelectorAll('.track-player audio');

  audioPlayers.forEach(player => {
    player.addEventListener('play', function() {
      audioPlayers.forEach(otherPlayer => {
        if (otherPlayer !== this && !otherPlayer.paused) {
          otherPlayer.pause();
        }
      });
    });
  });

  // --- 2. Clique no título da faixa para abrir no Internet Archive ---
  const trackTitles = document.querySelectorAll('.track-title');

  trackTitles.forEach(title => {
    title.addEventListener('click', function(e) {
      e.stopPropagation(); // Evita conflitos com outros cliques
      const archiveLink = this.dataset.archiveLink;
      if (archiveLink) {
        // Abre em uma nova aba/janela
        window.open(archiveLink, '_blank');
      } else {
        console.warn('Link do Internet Archive não configurado para esta faixa.');
      }
    });
  });

  // --- 3. Efeito de rolagem suave para links âncora (se houver) ---
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // --- 4. (Opcional) Log para depuração e boas-vindas ---
  console.log('✨ Aos Pés Femininos — Poesia, Música e IA.');
  console.log('📖 Explore as 12 faixas e o livro digital no Internet Archive.');
});
