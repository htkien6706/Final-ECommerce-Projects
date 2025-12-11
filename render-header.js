document.querySelector('.web-header').innerHTML = 
`
    <div class="shipping">
        Free Shiping orders > 150$
        <span class="shipping-details"> Details</span>
      </div>

      <div class="web-name" style="display: flex; align-items: center">
        <img id="web-image" src="image/web-name.png" />
      </div>
      <div class="searchbar-and-users">
        <input
          type="text"
          id="search-input"
          placeholder="Search for items....."
        />
        <div class="user-account" style="height: 60px">
          <img
            id="user-image"
            src="image/user-icon.jpg"
            alt="user-icon image"
          />
        </div>
        <div class="user-bag">
          <img
            id="user-cart"
            src="image/cart-icon.jpg"
            alt="image of user's cart"
          />
        </div>

        <button class="add-product-button"> + New Products</button>

      </div>
`