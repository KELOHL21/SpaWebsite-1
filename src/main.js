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
         <div>

            <div class='imgContainer'>
               <img src="${product.img}">
            </div>
            
            <h2>${product.title}</h2>
            <p>${product.price}</p>
            <div class="detailBtns">
               <button class="infoBtn" onclick="moreInfo(${product.id})">More Info</button>
               <button onclick="addCartBtn(${product.id})">Add to cart</button>
            </div>
         </div>
      `;

      dataList.appendChild(newProduct);
   });
}



// Instagram Carousel
let imgCopy = document.querySelector('.carousel-slide').cloneNode(true);
document.querySelector('.carousel-slider').appendChild(imgCopy);
