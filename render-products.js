import {allProducts} from "./product-details.js";
export {renderHTML}

renderHTML();

function renderHTML() {
  let html = "";
  allProducts.forEach((product) => {
    html +=  `
        <li class="card-items">
          <div class="preview-div">
            <img class="preview-image" src="${product.preview_image}" alt="picture of a man with a shirt">
            <div id="preview-image-overlay"></div>
            <button class="crud-options-button"> ⋮ </button>
            <div class="concrete-options">
              <div class="options-button view-button"> Quick view </div>
              <div class="options-button update-button"> Update product</div>
              <div class="options-button delete-button"> Delete product</div>
            </div>
          </div>
          
          <div class="product-description">
            <p>${product.product_description}</p>
            <p><span id="original-price">${product.original_price}{</span> <span id="discount-price">${product.discount_price}</span></p>
          </div>
        </li>
          `;
  })

  document.querySelector('.all-products').innerHTML = html;
}


