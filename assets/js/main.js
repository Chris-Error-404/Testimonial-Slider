// TESTIMONIAL CAROUSEL – infinite looping version

// Wait until the DOM is fully parsed
document.addEventListener('DOMContentLoaded', () => {
    // 1. Select the slides container and all individual slides
    const slidesContainer = document.querySelector('.slides');
    const slides = Array.from(slidesContainer.children);
    const slideCount = slides.length;
  
    // 2. Clone first and last slides for the infinite-loop trick
    const firstClone = slides[0].cloneNode(true);
    const lastClone  = slides[slideCount - 1].cloneNode(true);
  
    // 3. Append/prepend clones
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);
  
    // 4. Update our "current index" to start at the real first slide (index = 1 in the cloned list)
    let index = 1;
  
    // 5. Size everything so it sits side by side
    //    (make sure your CSS .slides { display: flex; transition: transform 0.5s ease-in-out; } is in place)
    const updateWidth = () => {
      const slideWidth = slidesContainer.clientWidth / (slideCount + 2);
      slidesContainer.style.width = `${(slideCount + 2) * 100}%`;
      Array.from(slidesContainer.children).forEach(slide => {
        slide.style.width = `${100 / (slideCount + 2)}%`;
      });
      // Position at the correct translateX
      slidesContainer.style.transform = `translateX(-${index * (100 / (slideCount + 2))}%)`;
    };
    window.addEventListener('resize', updateWidth);
    updateWidth();
  
    // 6. Helper to move to a given index with animation
    const goTo = (newIndex) => {
      index = newIndex;
      slidesContainer.style.transition = 'transform 0.5s ease-in-out';
      slidesContainer.style.transform = `translateX(-${index * (100 / (slideCount + 2))}%)`;
    };
  
    // 7. Next/Prev controls
    function nextSlide() {
      goTo(index + 1);
    }
    function prevSlide() {
      goTo(index - 1);
    }
  
    // 8. When the transition ends, check for clones and jump (no animation) to real slide
    slidesContainer.addEventListener('transitionend', () => {
      // If we've moved past the last real slide...
      if (index === slideCount + 1) {
        // Jump back to the real first slide
        slidesContainer.style.transition = 'none';
        index = 1;
        slidesContainer.style.transform = `translateX(-${index * (100 / (slideCount + 2))}%)`;
      }
      // If we've moved before the first real slide...
      if (index === 0) {
        // Jump to the real last slid
        slidesContainer.style.transition = 'none';
        index = slideCount;
        slidesContainer.style.transform = `translateX(-${index * (100 / (slideCount + 2))}%)`;
      }
    });
  
    // 9. Auto-advance every 5 seconds
    let autoPlay = setInterval(nextSlide, 5000);
  
    // 10. Optional: pause on hover
    slidesContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
    slidesContainer.addEventListener('mouseleave', () => {
      autoPlay = setInterval(nextSlide, 5000);
    });
  
    // 11. Wire up your prev/next buttons
    document.querySelector('.buttons .next').addEventListener('click', nextSlide);
    document.querySelector('.buttons .prev').addEventListener('click', prevSlide);
  });
  