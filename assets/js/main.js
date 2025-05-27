// === TESTIMONIAL CAROUSEL ===

// Start at the first slide (index 0)
let index = 0;

// Select the container that holds all the slides
const slides = document.querySelector('.slides');

// Total number of slides in your carousel (update if you add/remove slides)
const totalSlides = 5;

// Function to display the current slide based on `index`
// It shifts the whole slide container to the left using translateX
function showSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Go to the next slide
// Wraps back to the first slide after the last one (circular/looping)
function nextSlide() {
  index = (index + 1) % totalSlides; // Increments index and wraps around
  showSlide(); // Update the slide position
}

// Go to the previous slide
// Wraps to the last slide if you're at the first one
function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides; // Decrements with wraparound
  showSlide(); // Update the slide position
}

// Automatically move to the next slide every 5000 milliseconds (5 seconds)
setInterval(nextSlide, 10000);

// Make sure the next/prev functions are accessible from HTML inline handlers
// (e.g., onclick="nextSlide()")
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
