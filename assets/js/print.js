/* ============================================
   Print/PDF System - UNINOVE Projeto Integrador
   ============================================ */

(function() {
  var printMode = /print-pdf/gi.test(window.location.search);

  function createPrintButton() {
    if (printMode) return;

    var btn = document.createElement('button');
    btn.id = 'uninove-print-btn';
    btn.className = 'uninove-print-fab';
    btn.setAttribute('aria-label', 'Imprimir slides em PDF');
    btn.setAttribute('title', 'Imprimir PDF');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>';

    btn.addEventListener('click', handlePrintClick);
    document.body.appendChild(btn);
  }

  function handlePrintClick() {
    var currentUrl = window.location.href.split('?')[0].split('#')[0];
    var printUrl = currentUrl + '?print-pdf';
    var printWindow = window.open(printUrl, '_blank');

    if (printWindow) {
      printWindow.addEventListener('load', function() {
        setTimeout(function() {
          printWindow.print();
        }, 1500);
      });
    }
  }

  function setupPrintMode() {
    if (!printMode) return;

    document.body.classList.add('print-pdf-mode');

    if (typeof Reveal !== 'undefined') {
      var checkReady = setInterval(function() {
        if (typeof Reveal.isReady === 'function' && Reveal.isReady()) {
          clearInterval(checkReady);
          afterRevealReady();
        }
      }, 200);

      setTimeout(function() {
        clearInterval(checkReady);
        afterRevealReady();
      }, 5000);
    }
  }

  function afterRevealReady() {
    // Show all fragments
    var fragments = document.querySelectorAll('.fragment');
    fragments.forEach(function(frag) {
      frag.classList.add('visible');
      frag.classList.remove('current-fragment');
      frag.style.opacity = '1';
      frag.style.visibility = 'visible';
      frag.style.transform = 'none';
    });

    // Show quiz answers
    var quizOptions = document.querySelectorAll('.quiz-options li[data-correct="true"]');
    quizOptions.forEach(function(opt) {
      opt.style.borderColor = '#27ae60';
      opt.style.background = '#eafaf1';
    });

    var feedbacks = document.querySelectorAll('.quiz-feedback');
    feedbacks.forEach(function(fb) {
      fb.classList.add('show', 'correct');
      fb.style.display = 'block';
      var msg = fb.dataset.correctMsg || '';
      fb.innerHTML = '<strong>Resposta:</strong> ' + msg;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      createPrintButton();
      setupPrintMode();
    });
  } else {
    createPrintButton();
    setupPrintMode();
  }
})();
