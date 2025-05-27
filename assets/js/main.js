// TESTIMONIAL CAROUSEL
let index = 0;
const slides = document.querySelector('.slides');
function showSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}
function nextSlide() {
  index = (index + 1) % 3;
  showSlide();
}
setInterval(nextSlide, 5000);
function prevSlide() {
  index = (index - 1 + 3) % 3;
  showSlide();
}