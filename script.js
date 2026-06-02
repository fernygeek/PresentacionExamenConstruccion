// Lógica de navegación de diapositivas académicas
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressText = document.getElementById('slide-progress');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    function updatePresentation() {
        // Actualizar visibilidad de las diapositivas
        slides.forEach((slide, index) => {
            if (index === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualizar estado de los botones
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;

        // Actualizar texto de progreso
        progressText.textContent = `Diapositiva ${currentSlideIndex + 1} de ${totalSlides}`;
    }

    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updatePresentation();
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updatePresentation();
        }
    }

    // Eventos de los botones
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Eventos del teclado (Flechas de dirección)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Inicializar visualización
    updatePresentation();
});
