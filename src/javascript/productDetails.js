// Initialize products as an empty array
let products = [];

fetch('/src/productData/productDetails.json')
  .then(response => response.json())
  .then(data => {
    // Update the products array with the fetched data
    products = data;

    showProductDetails();
  });

function showProductDetails() {
  let details = document.querySelector('.productDetail');
  let prodId = new URLSearchParams(window.location.search).get('id');
  
  // Check if products is not empty before using filter
  if (products.length > 0) {
    let selectedProd = products.find(value => value.id == prodId);

    if (!selectedProd) {
      window.location.href = "/";
    }

    details.querySelector('.prodImg img').src = selectedProd.img;
    details.querySelector('.header').innerHTML = selectedProd.title;
    details.querySelector('.price').innerHTML = selectedProd.price;
    details.querySelector('.prodDescription').innerHTML = selectedProd.description;

    // Show all similar products
    let listProducts = document.querySelector('.productSection');
    products.filter(value => value.id != prodId)
      .forEach(product => {
        let newProduct = document.createElement('a');
        newProduct.href = '/src/pages/productDetails/productDetails.html?id=' + product.id;
        newProduct.classList.add('productItem');
        newProduct.innerHTML = `
          <div>
            <img src="${product.img}">
            <h2>${product.title}</h2>
            <p>${product.price}</p>

            <div class="detailBtns">
                <button class="infoBtn" onclick="moreInfo(${product.id})" >More Info</button>
                <button onclick="addCartBtn(${product.id})" >Add to cart</button>
          </div>     

          </div>
        `;
        
        listProducts.appendChild(newProduct);
      });
  } else {
    // Handle the case where products is empty, e.g., display an error message or redirect.
    console.error("Product data is not available.");
  }
}

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