document.querySelector('.header-container').innerHTML = 
`
    <div class="web-header">
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
    </div>

      <hr />

      <div class="welcome-words">
        Celebrate Vietnam’s heritage with our latest Graphic Tee drop: inspired
        by Saigon, Hanoi, and Hoi An, reimagined for the street.
      </div>

      <hr />

      <ul class="categories-list">
        <li>NEWEST</li>
        <li>WOMAN</li>
        <li>MAN</li>
        <li>SWEATER</li>
        <li>SHIRT</li>
        <li>FOOTBALL</li>
        <li>BASKETBALL</li>
        <li>GIFT FOR GIRLFRIEND</li>
      </ul>
    
`