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
   console.log(products);
   injectData();
})

// Displaying data
let dataList = document.querySelector('.productSection');
let cartList =document.querySelector('.cart');

function injectData(){
   // creater foreach loop to loop over the products

   products.forEach(product => {

         let newProduct = document.createElement('a');
         let newCartItem =document.createElement('div');
         // redirects to the product selected detailed page

         newProduct.href = '/src/pages/productDetails/productDetails.html?id=' + product.id;
         newProduct.classList.add('productItem');

         newCartItem.href = '/src/pages/productDetails/productDetails.html?id=' + product.id;
         newCartItem.classList.add('cartItem');

         // injecting the data into html
         newProduct.innerHTML = `
            <div>
                  <img src="${product.img}">
                  <h2>${product.title}</h2>
                  <p>${product.price}</p>
                  <button onclick="addCartBtn(${product.id})" >Add to cart</button>
            </div>
         `

         newCartItem.innerHTML =`
      
            <div class="cartItem"> 

                     <div class="cartImageContainer">
                        <img src="${product.img}"> 
                     </div>
                     
                     <div class="cartItemHeader">
                        <h2>${product.title}</h2>
                        <p>${product.price}</p>
                     </div>

                     <div class="content">
                        <button> - </button>
                           <span class="amount" >3</span>
                        <button> + </button>
                     </div>                   
         <div>   
         `
         // add itemElement to listElement
         dataList.appendChild(newProduct);
         cartList.appendChild(newCartItem);

   });
 
}

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


// Cart List
let listCart = [];

// Checking Cart
function checkCart(){
   var cookieValue = document.cookie
   .split(' ; ')
   .find(row => row.startsWith('listCart='));
   if (cookieValue) {
      listCart = JSON.parse(cookieValue.split('=')[1]);
   }
};

// Calling Function

checkCart();

// Adding Items to Cart
function addCartBtn($idProduct){
   let productCopy = JSON.parse(JSON.stringify(products));
   
   // If not in Cart
   if (!listCart[$idProduct]) {
      let dataProduct = productCopy.filter(
         product => product.id == $idProduct
      )[0];
      // Adding data into Cart
      listCart[$idProduct] = dataProduct;
      listCart[$idProduct].quantity = 1;
   }else{
      listCart[$idProduct].quantity++;
   }

   // Saving in Cookies
   let timeSave = 'expires=Thu, 31 Dec 2028 23:59:59 UCT';
   document.cookie = 'listCart='+ JSON.stringify(listCart)+"; "+timeSave+"; path=/;";
   CartToHTML();
};

CartToHTML();
function  CartToHTML() {
   // CLEAR COOKIE DATAT DEFAULT

   let listCartHTML = documenet.querySelector('.listCart');
   listCart.innerHTML = '';

   let totalHTML =document.querySelector('.totalPrice');

   let totalPrice = 0;

   if (listCart) {
      listCart.forEach(product => {
         if (product) {
            let newCart = document.createElement('div');
            newCart.classList('item');
            newCart.innerHTML
         }
      })
   }
}

