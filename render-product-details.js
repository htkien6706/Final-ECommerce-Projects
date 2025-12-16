import {allProducts as products} from "./product-details.js"
let view_index = Number(localStorage.getItem("view-index"));
localStorage.clear();
console.log(view_index);

document.querySelector('.body-container').innerHTML = `
    <div class="product-image">
        <div class="slide-show">
          <button class="upward-button">⇧</button>
          <div class="small-image-div" data-index="1">
            <img
              class="small-image-img"
              src= ${products[view_index].product_images[0]}
            />
          </div>

          <div class="small-image-div" data-index="2">
            <img
              class="small-image-img"
              src=${products[view_index].product_images[1]}
            />
          </div>

          <div class="small-image-div" data-index="3">
            <img
              class="small-image-img"
              src=${products[view_index].product_images[2]}
            />
          </div>

          <div class="small-image-div" data-index="4">
            <img
              class="small-image-img"
              src=${products[view_index].product_images[3]};
            />
          </div>

          <div class="small-image-div" data-index="5">
            <img
              class="small-image-img"
              src=${products[view_index].product_images[4]}
            />
          </div>

          <button class="downward-button">⇩</button>
        </div>
        <div class="main-image">
          <img
            class="main-image-img"
            src= ${products[view_index].product_images[1]}
          />
        </div>
      </div>

      <div class="product-info">
        <p class="product-name">Heritage Cable Knit Turtleneck Sweater</p>
        <div class="price-container">
          <span class="new-price"> $105</span>
          <span class="old-price">$125</span>
        </div>

        <div class="description">
          <div class="description">
            <h3>Description</h3>
            <p>
              Elevate your winter wardrobe with our Heritage Cable Knit
              Turtleneck Sweater. Crafted from premium quality yarn, this
              timeless piece combines classic elegance with modern comfort.
            </p>
            <p>
              Perfect for layering or wearing on its own, this sweater features
              intricate cable knit patterns that add texture and visual interest
              to any outfit.
            </p>
          </div>

          <div class="utility-buttons">
            <button class="add-button">Add to Cart</button>
            <button class="buy-button">Buy it now !</button>
          </div>
        </div>
      </div>



`
