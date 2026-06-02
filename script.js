const slides = Array.from(document.querySelectorAll('.slide'));
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const counter = document.getElementById('counter');
const progressBar = document.getElementById('progressBar');
const overviewBtn = document.getElementById('overviewBtn');
const printBtn = document.getElementById('printBtn');
const deck = document.getElementById('deck');

let current = 0;
let overview = false;

function updateSlide(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === current);
    slide.setAttribute('aria-hidden', i !== current);
  });
  counter.textContent = `${current + 1} / ${slides.length}`;
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  window.location.hash = `slide-${current + 1}`;
}

function toggleOverview() {
  overview = !overview;
  deck.classList.toggle('overview', overview);
  if (overview) {
    slides.forEach(slide => slide.classList.add('active'));
  } else {
    updateSlide(current);
  }
}

function goNext() {
  if (overview) return toggleOverview();
  updateSlide(current + 1);
}

function goPrev() {
  if (overview) return toggleOverview();
  updateSlide(current - 1);
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);
overviewBtn.addEventListener('click', toggleOverview);
printBtn.addEventListener('click', () => window.print());

slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    if (overview) {
      overview = false;
      deck.classList.remove('overview');
      updateSlide(i);
    }
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (['ArrowRight', 'PageDown', ' '].includes(key)) {
    event.preventDefault();
    goNext();
  }
  if (['ArrowLeft', 'PageUp', 'Backspace'].includes(key)) {
    event.preventDefault();
    goPrev();
  }
  if (key.toLowerCase() === 'o') toggleOverview();
  if (key === 'Home') updateSlide(0);
  if (key === 'End') updateSlide(slides.length - 1);
});

function loadFromHash() {
  const match = window.location.hash.match(/slide-(\d+)/);
  if (match) updateSlide(Number(match[1]) - 1);
  else updateSlide(0);
}

window.addEventListener('hashchange', loadFromHash);
loadFromHash();
