
/* Initiaize arrays*/

const heroUrls = []
for (let i = 1; i <= 3; i++) {
    heroUrls.push(`util/hero/${i}.png`);
}

const artistUrls = []
for (let i = 1; i <= 6; i++) {
    artistUrls.push(`util/artists/${i}.png`);
}

const inspirationUrls = []
for (let i = 1; i <= 7; i++) {
    inspirationUrls.push(`util/inspirations/${i}.jpg`);
}

const faqs = [
  { title: 'What is your booking policy?', text: 'We recommend booking at least 2 weeks in advance.' },
  { title: 'Do you accept walk-ins?', text: 'Yes, but availability is not guaranteed.' },
  { title: 'How should I prepare for my appointment?', text: 'Stay hydrated and get plenty of sleep!' }
];

/* define variables*/

const inspirations = document.getElementById('insHighlights');
const innerInspirations = inspirations.querySelector('.innerinspirations');
const showMore = document.getElementById('insShowmore');
const initialCount = 3;
var expanded = false;

/* functions to make website go bang-bang*/

/* reusable toggle hide/unhide */
function setupToggle(triggerSelector, targetSelector, activeClass = 'active') {
    const trigger = document.querySelector(triggerSelector);
    const target = document.querySelector(targetSelector);
    
    if (!trigger || !target) return;

    trigger.addEventListener('click', () => {
        target.classList.toggle(activeClass);
    });
}

/* reusable carousel*/
function initCarousel(containerId, imageUrls, options = {}) {
    const container = document.getElementById(containerId);
    if(!container) return;

    var currentIndex = 0;
    const autoplayInterval = options.autoplayInterval || 4000;
    var autoplayTimer;
    const trackClass = options.trackClass || 'carousel-track';
    const imageClass = options.imageClass || '';

    const track = document.createElement('div');
    track.classList.add(trackClass);
    container.appendChild(track);

    imageUrls.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        if (imageClass) img.classList.add(imageClass);
        track.appendChild(img);
    });

    const totalSlides = imageUrls.length;
    
    const images = container.querySelectorAll('img');
    
    const dotsWrapper = document.createElement('div');
    dotsWrapper.classList.add('carousel-dots');
    container.appendChild(dotsWrapper);

    imageUrls.forEach((_, index) => {
        const dot = document.createElement('span');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
        dotsWrapper.appendChild(dot);
    });


    const dots = dotsWrapper.querySelectorAll('span');

    function updateCarousel() {
        const percentage = -(currentIndex * 100);
        track.style.transform = `translateX(${percentage}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function goToSlide(index) {
        currentIndex = (index + images.length) % images.length;
        updateCarousel();
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            goToSlide(currentIndex +1);
        }, autoplayInterval);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    var touchStartX = 0;
    var touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    })

    function handleSwipe() {
        const swipeThreshold = 50;
        const delta = touchEndX - touchStartX;
        if (delta > swipeThreshold) {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        } else if (delta < -swipeThreshold) {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        }
    }

    updateCarousel();
    startAutoplay();
}


/* show/hide navbar */
document.addEventListener('DOMContentLoaded', () => {
    const navWrapper = document.querySelector('.navwrapper');
    const landingHeight = window.innerHeight;
    const threshold = landingHeight * 0.3;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        if (scrollTop > threshold) {
            navWrapper.classList.add('visible');
        } else {
            navWrapper.classList.remove('visible');
        }
    });
});

/* initialize carousels*/
initCarousel('carouselHero', heroUrls, {autoPlayInterval: 4000, trackClass:'herocarousel-track'});
initCarousel('carouselArtists', artistUrls, {autoplayInterval: 7000, trackClass:'artistscarousel-track', imageClass: 'artistscarousel-img'});

/* initialize toggles */
setupToggle('#burger','#nav','active');

/* *special* faq toggle */
document.addEventListener('DOMContentLoaded', () => {
    const faqWrapper = document.getElementById('faq-wrapper');

    faqs.forEach((faq, index) => {
        const item = document.createElement('div');
        item.classList.add('faq-item');

        const titleId = `faq-title-${index}`;
        const bodyId = `faq-body-${index}`;
        const arrowId = `faq-arrow-${index}`;

        item.innerHTML = `<div class="faq-toggle">
                                <button class="faq-title" id="${titleId}">
                                    ${faq.title}
                                </button>
                                <p class="faq-arrow green w800 font-b size-m" id="${arrowId}">V</p>
                            </div>
                            <div class="faq-body" id="${bodyId}">
                                ${faq.text}
                            </div>`;

        faqWrapper.appendChild(item);

        const titleBtn = document.getElementById(titleId);
        const body = document.getElementById(bodyId);
        const arrow = document.getElementById(arrowId);

        titleBtn.addEventListener('click', () => {
            body.classList.toggle('slide-open');
            arrow.textContent = body.classList.contains('slide-open') ? 'Ʌ' : 'V';
        });

        arrow.addEventListener('click', () => {
            body.classList.toggle('slide-open');
            arrow.textContent = body.classList.contains('slide-open') ? 'Ʌ' : 'V';
        });

        /* setupToggle(`#${titleId}`,`#${bodyId}`,'slide-open'); */
    });

    const faqToggle = document.getElementById('faqtoggle');
    const faqWrapperDiv = document.getElementById('faq-wrapper');
    const arrowMain = faqToggle.querySelector('p');

    faqToggle.addEventListener('click', () => {
        faqWrapperDiv.classList.toggle('slide-open');
        arrowMain.textContent = faqWrapperDiv.classList.contains('slide-open') ? 'Ʌ' : 'V';
    });

    /* setupToggle('#faqtoggle', '#faq-wrapper', 'slide-open'); */
});

/*inspirations display*/
function displayImages(start, end) {
    for (let i = start; i < end; i++) {
        if (inspirationUrls[i]) {
            const img = document.createElement('img');
            img.src = inspirationUrls[i];
            img.classList.add('fade-in');
            innerInspirations.appendChild(img);
        }
    }
}

displayImages(0, initialCount);

showMore.addEventListener('click', () => {
    if (!expanded) {
        displayImages(initialCount,inspirationUrls.length);
        inspirations.classList.add('expanded');
        showMore.textContent = 'Ʌ';
        expanded = true;
    } else {
        showMore.classList.add('slideout','hide')
        /* inspirations.addEventListener('transitionend', () => {
            innerInspirations.innerHTML='';
            displayImages(0, initialCount);
        }, {once: true}); */
        
        setTimeout(() => {
            inspirations.classList.remove('expanded');
            innerInspirations.innerHTML='';
            displayImages(0, initialCount);
        }, 200);
        showMore.textContent = 'V';
        expanded = false;
        setTimeout(() => {
            showMore.classList.remove('hide');
        }, 200);
    }
});