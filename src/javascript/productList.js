// Fecthing Products

let products = null;
fetch('/src/productData/productDetails.json')
.then(reponse => reponse.json())
.then(data => {
   // Putting my data into the products variable that was orginally null
   products = data;
   console.log(products);
   injectData();
})

// displaying data

let dataList = document.querySelector('.productSection');
function injectData(){
   // creater foreach loop to loop over the products

   products.forEach(product => {

         let newProduct = document.createElement('a');
         // redirects to the product selected detailed page

         newProduct.href = '/src/pages/productDetails/productDetails.html?id=' + product.id;
         newProduct.classList.add('productItem');

         // injecting the data into html
         newProduct.innerHTML = `
            <div>
                  <img src="${product.img}">
                  <h2>${product.title}</h2>
                  <p>${product.price}</p>
            </div>
         `

         // add itemElement to listElement
         dataList.appendChild(newProduct);
   });
 
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