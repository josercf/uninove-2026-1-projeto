/* ============================================
   Quiz System - UNINOVE Projeto Integrador
   ============================================ */

function initQuizzes() {
  var quizSlides = document.querySelectorAll('.quiz-slide');
  quizSlides.forEach(initQuiz);
}

function initQuiz(slide) {
  var options = slide.querySelectorAll('.quiz-options li');
  var feedback = slide.querySelector('.quiz-feedback');
  var answered = false;

  options.forEach(function(option) {
    option.style.pointerEvents = '';
    option.classList.remove('correct', 'incorrect');
    option.addEventListener('click', function() {
      if (answered) return;
      answered = true;

      var isCorrect = this.dataset.correct === 'true';

      options.forEach(function(opt) {
        opt.style.pointerEvents = 'none';
        if (opt.dataset.correct === 'true') {
          opt.classList.add('correct');
        } else if (opt === option && !isCorrect) {
          opt.classList.add('incorrect');
        }
      }.bind(this));

      if (feedback) {
        feedback.classList.add('show');
        if (isCorrect) {
          feedback.classList.add('correct');
          feedback.innerHTML = '<strong>Correto!</strong> ' + (feedback.dataset.correctMsg || '');
        } else {
          feedback.classList.add('incorrect');
          feedback.innerHTML = '<strong>Incorreto.</strong> ' + (feedback.dataset.incorrectMsg || '');
        }
      }
    });
  });
}

function resetQuizOnSlideChange() {
  if (typeof Reveal === 'undefined') return;

  Reveal.on('slidechanged', function(event) {
    var prevSlide = event.previousSlide;
    if (prevSlide && prevSlide.classList.contains('quiz-slide')) {
      var options = prevSlide.querySelectorAll('.quiz-options li');
      var feedback = prevSlide.querySelector('.quiz-feedback');

      options.forEach(function(opt) {
        opt.classList.remove('correct', 'incorrect');
        opt.style.pointerEvents = '';
      });

      if (feedback) {
        feedback.classList.remove('show', 'correct', 'incorrect');
        feedback.innerHTML = '';
      }

      initQuiz(prevSlide);
    }
  });
}

function bootstrap() {
  initQuizzes();
  resetQuizOnSlideChange();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(bootstrap, 500);
  });
} else {
  setTimeout(bootstrap, 500);
}
