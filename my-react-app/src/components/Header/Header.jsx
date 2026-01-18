import Category from './Category.jsx'
import "./Header.css"
import webImage from "../../assets/image/web-name.png"
import userIcon from "../../assets/image/user-icon.jpg"
import userCart from "../../assets/image/cart-icon.jpg"

export default function Header({setIsAddingOn }) {
  return (
    <div className="header-container">

      <div className="web-header">
        <Shipping />
        <WebName />
        <div className="searchbar-and-users">
          <input
            type="text"
            id="search-input"
            placeholder="Search for items....."
          />
          <UserIcon />

          <AddButton 
          setIsAddingOn = {setIsAddingOn}
          />
        </div>

      </div>

      <hr />

      <WelcomeSlogan />

      <hr />
      <Category />
    </div>
  )
}

function Shipping() {
  return (
    <div className="shipping">
      Free Shiping orders larger than 150$
      <span className="shipping-details"> Details</span>
    </div>
  );
}

function WebName() {
  return (
    <div className="web-name" style={{ display: "flex", alignItems: "center" }}>
      <img id="web-image" src={webImage} alt='Picture is in loading' />
    </div>
  );
}

function UserIcon() {
  return (
    <>
      <div className="user-account" style={{ height: "60px" }}>
        <img id="user-image" src={userIcon} alt="user-icon image" />
      </div>

      <div className="user-bag">
        <img
          id="user-cart"
          src={userCart}
          alt="image of user's cart"
        />
      </div>
    </>
  )
}


function AddButton({setIsAddingOn}) {
  return <button 
  className="add-product-button"
  onClick={(e) => {
    e.stopPropagation();
    return setIsAddingOn(true);
    }
  }> + New Products</button>;
}

function WelcomeSlogan() {
  return (
    <div className="welcome-words">
      Celebrate Vietnam’s heritage with our latest Graphic Tee drop: inspired
      by Saigon, Hanoi, and Hoi An, reimagined for the street.
    </div>
  )
}



