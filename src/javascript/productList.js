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


// ALL CART BELOW

// Add to Cart Functionality
 let iconCart = document.querySelector('.cartIcon');
 let cart = document.querySelector('.cart');
 let container = document.querySelector('.productListContainer')
 let closeCart = document.querySelector('.close');

//  Allows Access to Cart Via clicking Icon

iconCart.addEventListener("click", () => {
   if (cart.style.right == '-100%') {
      cart.style.right = '0';
      container.style.transform = 'translateX(-400px)';
   }else{
      cart.style.right = '-100%';
      container.style.transform = 'translateX(0)';
   }
})

// FIX CLOSE BUTTON
closeCart.addEventListener("click", () => {
   cart.style.right = '-100%';
   container.style.transform = 'translateX(0)';
});


// Fetching Products

let products = null;
fetch('/src/productData/productDetails.json')
.then(reponse => reponse.json())
.then(data => {
   // Putting my data into the products variable that was orginally null
   products = data;
   injectData();
   addCartToHTML();
})

// Displaying data
function injectData(){

   let dataList = document.querySelector('.productSection');

   products.forEach(product => {
         let newProduct = document.createElement('div');
         newProduct.classList.add('productItem');

         newProduct.innerHTML = `
            <div>
                  <img src="${product.img}">
                  <h2>${product.title}</h2>
                  <p>${product.price}</p>

                   <div class="detailBtns">
                        <button class="infoBtn" onclick="moreInfo(${product.id})" >More Info</button>
                        <button onclick="addCartBtn(${product.id})">Add to cart</button>
                   </div>            
            </div>
         `;

         dataList.appendChild(newProduct);        
   });
}

function moreInfo(productId) {
   window.location.href = '/src/pages/productDetails/productDetails.html?id=' + productId;
}


// CART
let listCart = [];

// Checking Cart cookie data
function checkCart() {
   const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('listCart='));
   
   if (cookieValue) {
      listCart = JSON.parse(cookieValue.split('=')[1]);
   } else {
      listCart = [];
   }
}
checkCart();

// Adding Items to Cart
function addCartBtn($idProduct){

   const existingProduct = listCart.find(product => product.id == $idProduct);

   if (!existingProduct) {
      const productToAdd = products.find(product => product.id == $idProduct);
      if (productToAdd) {
         productToAdd.quantity = 1;
         listCart.push(productToAdd);
      }
   } else {
      existingProduct.quantity++;
   }

   addCartToHTML();
   saveCartToCookie();

};

function saveCartToCookie() {
   const expiryDate = new Date('Thu, 31 Dec 2025 23:59:59 UTC').toUTCString();
   document.cookie = `listCart=${JSON.stringify(listCart)}; expires=${expiryDate}; path=/;`;
}

function checkCart(){
   const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('listCart='));
   
   if (cookieValue) {
      listCart = JSON.parse(cookieValue.split('=')[1]);
   } else {
      listCart = []; // Set an empty array if the cookie doesn't exist
   }
}
checkCart();

addCartToHTML();
function  addCartToHTML() {

   // CLEAR COOKIE DATA DEFAULT
   let listCartHTML = document.querySelector('.cartItemsList');

   listCartHTML.innerHTML = '';

   let totalHTML =document.querySelector('.totalValue');

   let totalPrice = 0;

   if (listCart) {
      listCart.forEach(product => {

         if(product) {

            let newCart = document.createElement('div');

            newCart.href = '/src/pages/productDetails/productDetails.html?id=' + product.id;
            newCart.classList.add('cartItem');

            newCart.innerHTML =`
                     <div class="cartImageContainer">
                        <img src="${product.img}"> 
                     </div>
                     
                     <div class="cartItemHeader">
                        <h2>${product.title}</h2>
                        <p>${product.price}</p>
                     </div>

                     <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>
                     
            `

            listCartHTML.appendChild(newCart);
            totalPrice = totalPrice + product.quantity;
         }
      })
   }
   totalHTML.innerHTML= totalPrice;
}

// Quantity Decrease & Increase

function changeQuantity($idProduct, $type){
   const itemIndex = listCart.findIndex(product => product.id == $idProduct);

   if (itemIndex !== -1) {
       switch ($type) {
           case '+':
               listCart[itemIndex].quantity++;
               break;
           case '-':
               listCart[itemIndex].quantity--;

               if (listCart[itemIndex].quantity <= 0) {
                   listCart.splice(itemIndex, 1); // Remove item if quantity <= 0
               }
               break;
           default:
               break;
       }
       // Save updated data in the cookie
       const expiryDate = new Date('Thu, 31 Dec 2025 23:59:59 UTC').toUTCString();
       document.cookie = `listCart=${JSON.stringify(listCart)}; expires=${expiryDate}; path=/;`;

       // Reload list when window is closed
       addCartToHTML();
   } else {
       console.error('Product not found in cart'); // Handle the scenario where the product isn't found
   }
}




