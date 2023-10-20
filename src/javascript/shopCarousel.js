const productContainer = [...document.querySelectorAll('.productContainer')];
const preBtn = [...document.querySelectorAll('.pre_btn')];
const nextBtn = [...document.querySelectorAll('.next_btn')];

function autoSlideNext(container, containerWidth) {
  container.scrollLeft += containerWidth;
}

function checkAndResetCarousel(item, containerWidth) {
  if (item.scrollLeft + item.clientWidth >= item.scrollWidth - 10) {
    // Check if the end of the carousel is reached (with a small buffer)
    item.scrollLeft = 0; // Reset to the first item
  }
}

productContainer.forEach((item, i) => {
  let containerSize = item.getBoundingClientRect();
  let containerWidth = containerSize.width;
  let autoSlideInterval;

  // Function to auto-slide to the next item
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      autoSlideNext(item, containerWidth);
      checkAndResetCarousel(item, containerWidth); // Check and reset on auto-slide
    }, 10000); // Adjust the interval duration as needed (e.g., 3000ms for 3 seconds)
  }

  // Pause auto-slide on user interaction
  item.addEventListener('mousedown', () => {
    clearInterval(autoSlideInterval);
  });

  item.addEventListener('mouseup', () => {
    startAutoSlide();
  });

  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
    checkAndResetCarousel(item, containerWidth); // Check and reset on button click
  });

  nextBtn[i].addEventListener('click', () => {
    autoSlideNext(item, containerWidth);
    checkAndResetCarousel(item, containerWidth); // Check and reset on button click
  });

  // Start auto-sliding when the page loads
  startAutoSlide();

  // Adjust containerWidth based on screen size
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    containerWidth = item.clientWidth; // Show one card at a time on mobile
  }
});
