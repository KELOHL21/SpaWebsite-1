//  Navbar Functionality
const toggleBtn = document.querySelector('.toggle_btn')
const toggleIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown')

toggleBtn.onclick = function () {
   dropDownMenu.classList.toggle('open')
   const isOpen = dropDownMenu.classList.contains('open')

   toggleIcon.classList = isOpen 
   ? 'fa-solid fa-xmark fa-2xl'
   : 'fa-solid fa-bars fa-2xl'
}

// Fecthing Product Data
// let product = null;
// fetch('./productData/productDetails.json');
// then(response => reponse.json())
// .then(

// )

// Instagram Carousel
let imgCopy = document.querySelector('.carousel-slide').cloneNode(true);
document.querySelector('.carousel-slider').appendChild(imgCopy);
