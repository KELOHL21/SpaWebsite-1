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
fetch('/src/serviceData/srvData,.json')
.then(reponse => reponse.json())
.then(data => {
   // Putting my data into the products variable that was orginally null
   services = data;
   injectData();
   // addCartToHTML();
})

// Displaying data
function injectData(){

   let serviceList = document.querySelector('.srvListContainer');

   services.forEach( service => {
         let newService = document.createElement('div');

         newService.classList.add('srvItemContainer');

         newService.innerHTML = `

            <div class="imgContainer">
                  <img class="srvImg" src="${service.image}">
            </div>

            <div class="srvDetails">
              
               <div>
                  <h2>${service.title}</h2>
                  <p >${service.description}</p>
                  <p >${service.price}</p>
               </div>
                
             
               <div class="selectBooking">
               <button> Book Now </button>
               </div>

            </div>    

         `;

         serviceList.appendChild(newService);        
   });
}

// NEED TO CREATE Function  for the above button
// onclick="moreInfo(${product.id})