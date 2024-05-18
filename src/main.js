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

// ----------------------------------------------------

// Shop Section
// Fetching Products
let products = null;
fetch('/src/productData/productDetails.json')
.then(reponse => reponse.json())
.then(data => {
   // Putting my data into the products variable that was orginally null
   products = data;
   injectData();
   // addCartToHTML();
})

// Displaying data
function injectData() {
   let dataList = document.querySelector('.productSection');
   let firstSixProducts = products.slice(0, 6); // Extract the first six products

   firstSixProducts.forEach(product => {
      let newProduct = document.createElement('div');

      newProduct.classList.add('productItem');

      newProduct.innerHTML = `
  
         <div onclick="moreInfo(${product.id})">

            <div class='imgContainer'>
               <img src="${product.img}">
            </div>
            
            <h2>${product.title}</h2>
            <p>${product.price}</p>

         </div>
         
      `;

      dataList.appendChild(newProduct);
   });
}

function moreInfo(productId) {
   window.location.href = '/src/pages/productDetails/productDetails.html?id=' + productId;
}



// ----------------------------------------------------

// Service Section
// Fetching Services
let services = null;
fetch('/src/serviceData/srvData,.json')
.then(reponse => reponse.json())
.then(data => {
   // Putting my data into the products variable that was orginally null
   services = data;
   injectServiceData();
   // addCartToHTML();
})

// Displaying data
function injectServiceData() {
   let serviceContainer = document.querySelector('.srvListContainer');
   let firstFourServices =services.slice(0, 4); // Corrected to iterate through the first 4 products
 
   firstFourServices.forEach(service => {
     let newService = document.createElement('div');
     newService.classList.add('srvItemContainer');
 
     newService.innerHTML = `
     <div>

       <div class="srvImgContainer">
         <img class="srvImg" src="${service.image}">
       </div>
 
       <div class="srvDetails">
         <div>
           <h2>${service.title}</h2>
           <p>${service.description}</p>
           <p>${service.price}</p>
         </div>
         
         <div class="selectBooking">
           <button>Book Now</button>
         </div>
       </div>
       </div>
     `;
 
     serviceContainer.appendChild(newService);
   });
 }
 



// Instagram Carousel
let imgCopy = document.querySelector('.carousel-slide').cloneNode(true);
document.querySelector('.carousel-slider').appendChild(imgCopy);

