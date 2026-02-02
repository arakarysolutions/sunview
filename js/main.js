// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll Reveal Animation
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

reveal();

// Navbar sticky
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Carousel Logic
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Start Carousel
if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
}

// Modal Logic
const modal = document.getElementById('subjectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close-btn');

// Make openModal global so html onclick can see it
window.openModal = function (element) {
    const title = element.innerText;
    // Use data attributes or fallback content
    const desc = element.getAttribute('data-desc') || "En SunView School, la asignatura de " + title + " está diseñada para potenciar las habilidades y el conocimiento de nuestros estudiantes con metodologías innovadoras.";
    const img = element.getAttribute('data-img') || "src/img/estudiantes.jpg"; // Default image

    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    modalImg.src = img;

    // Determine color based on index to match CSS nth-child logic
    // Get all li elements in the parent ul
    const parent = element.parentNode;
    const index = Array.from(parent.children).indexOf(element) + 1; // 1-based index like CSS nth-child

    let headerColor = 'var(--primary-blue)'; // Default
    if (index % 4 === 1) headerColor = 'var(--primary-blue)';
    else if (index % 4 === 2) headerColor = 'var(--secondary-orange)';
    else if (index % 4 === 3) headerColor = 'var(--accent-pink)';
    else if (index % 4 === 0) headerColor = 'var(--accent-cyan)';

    document.querySelector('.modal-header').style.background = headerColor;

    modal.style.display = "flex";
    // Small delay to allow display:flex to apply before adding opacity class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

if (closeBtn) {
    closeBtn.onclick = function () {
        closeModal();
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');

// Make openLightbox global
window.openLightbox = function (element) {
    const img = element.querySelector('img');
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    captionText.innerHTML = img.alt;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

// Prevent closing when clicking on the image itself
if (lightboxImg) {
    lightboxImg.onclick = function (e) {
        e.stopPropagation();
    }
}
