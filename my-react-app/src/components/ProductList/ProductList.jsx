import { useState } from 'react';
import ProductTypes from "../ProductTypes/ProductType.jsx"
import "./ProductList.css";
import "./Delete.css";
import "./Update.css";
import { LIST_KEY, deleteProduct, addProduct, updateList, getProductList } from '../../services/ProductStorage.jsx';

export default function ProductList({productList, setProductList, isAddingOn, setIsAddingOn}) {

 
  //state of just settingMenuIndex, if index === openedMneuIndex -> turn on 3 concrete-options
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

  //state of delete index, if index === deletedIndex -> list.filter((_, index) => index != deletedIndex) to remove product with deletedIndex
  const [deletedIndex, setDeletedIndex] = useState(null);
  const [isDeleteOn, setIsDeleteOn] = useState(false);

  //state of updated index
  const [updateIndex, setUpdateIndex] = useState(null);
  const [isUpdateOn, setIsUpdateOn] = useState(false);

  const [updateNameInput, setUpdateNameInput] = useState('');
  const [updateImageInput, setUpdateImageInput] = useState(null);
  const [updateOriginalPrice, setUpdateOriginalPrice] = useState(null);
  const [updateDiscountPrice, setUpdateDiscountPrice] = useState(null);
  const [updateDetailedDescription, setUpdateDetailedDescription] = useState(null);
  const [updateTotalBuyers, setUpdateTotalBuyers] = useState(null);
  const [updateOverallRating, setUpdateOverallRating] = useState(null);

  console.log(JSON.parse(localStorage.getItem("LIST_KEY")))



  //responsible for handling and toggling the menu button to turn on and off 3 concrete options bro
  function handleMenuButton(index) {
    setOpenedMenuIndex(prevIndex => {
      return prevIndex === index ? null : index;
    });
  }

  //this function is responsible for 1. TURNING ON THE POPUP OVERLAY and 2. GET THE INDEX OF THE DELETED VALUE
  function handleDeleteButton(index) {
    setDeletedIndex(index);
    setIsDeleteOn(true);
    setOpenedMenuIndex(null);
  }

  function handleCancelDelete() {
    setIsDeleteOn(false);
    setDeletedIndex(null);
    setOpenedMenuIndex(null);
  }

  function handleConfirmDelete() {
    setIsDeleteOn(false);
    setOpenedMenuIndex(null);
    // set state nốt của product để loại bỏ cái sản phẩm đó

    const newList = deleteProduct(deletedIndex);
    setProductList(newList);
    setDeletedIndex(null);
  }

  function handleUpdateButton(index) {
    //turn off the menu button
    setOpenedMenuIndex(null);
    setIsUpdateOn(true);
    setUpdateIndex(index);
    const currentList = getProductList(productList);
    console.log(currentList);

    //product-name input
    setUpdateNameInput(currentList[index].product_description);
    console.log(updateNameInput);

    //preview-image input
    setUpdateImageInput(currentList[index].preview_image);
    console.log(currentList[index].preview_image);

    //original-price input
    setUpdateOriginalPrice(currentList[index].original_price);
    console.log(updateOriginalPrice);

    //discount-price input
    setUpdateDiscountPrice(currentList[index].discount_price);
    console.log(updateDiscountPrice);

    //detailed-description input
    setUpdateDetailedDescription(currentList[index].detailed_description);
    console.log(setUpdateDetailedDescription); // nó sẽ bị chậm hơn so với index thật 1 lần render

    //buyers input
    setUpdateTotalBuyers(currentList[index].total_buyer);

    // overall-rating input
    setUpdateOverallRating(currentList[index].rating);
  }

  function handleCancelUpdate() {
    setUpdateIndex(null);
    setIsUpdateOn(false);
    setOpenedMenuIndex(null);
  }

  function handleConfirmUpdate() {
    setUpdateIndex(null);
    setIsUpdateOn(false);
    setOpenedMenuIndex(null);

    const updatedProduct = {
      product_description: updateNameInput,
      preview_image: updateImageInput,
      original_price: updateOriginalPrice,
      discount_price: updateDiscountPrice,
      detailed_description: updateDetailedDescription,
      total_buyer: updateTotalBuyers,
      rating: updateOverallRating
    }

    const updatedList = updateList(updatedProduct, updateIndex);
    setProductList(updatedList);

    
  }

  return (
    <>
      <div className="product-info">
        <ProductTypes />
        <ul className='all-products'>
          {productList.map((product, index) => {
            return (
              <li key={product.uniqueId} className='card-items'>
                <div className='preview-div'>
                  <img className='preview-image' src={product.preview_image} alt='somebody wears the viewing shirt' />
                  <button className='crud-options-button' onClick={(e) => {
                    e.stopPropagation();
                    handleMenuButton(index);
                  }}> ⋮
                  </button>

                  {/* Reason why dont put 3 concrete options of CRUD in here is that it depends on state -> when state change -> the UI change accrodingly, it only appear when we click in the kebab-menu button, click outside -> disappear */}

                  {index === openedMenuIndex && (
                    <div className='concrete-options'>
                      <div className="options-button view-button"> Quick view !</div>

                      <div className="options-button update-button" onClick={(e) => {
                        e.stopPropagation();
                        console.log(e.target);
                        handleUpdateButton(index);
                      }}> Update product !
                      </div>

                      <div className="options-button delete-button" onClick={(e) => {
                        console.log(e.target);
                        e.stopPropagation();
                        handleDeleteButton(index);
                      }}>
                        Delete product !
                      </div>
                    </div>
                  )}

                </div>

                <div className="product-description">
                  <p>{product.product_description}</p>
                  <p>
                    <span className='original-price'> {product.original_price} </span>
                    <span className='discount-price'> {product.discount_price}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {isDeleteOn && (
        <div className="popup-overlay">
          <div className="delete-items-overlay showcase">
            <h2 style={{ paddingLeft: "10px", marginBottom: "0px", fontSize: "28px" }}>
              Delete items
            </h2>
            <p
              style={{
                fontSize: "17px",
                paddingBottom: "6px",
                color: "",
                paddingLeft: "6px",
                fontFamily: "ui-sans-serif"
              }}
            >
              Are you sure to delete this item from product list ? Please note that
              this action cannot be restored
            </p>
            <div className="confirm-actions">
              <button className="cancel-button" onClick={(e) => {
                e.preventDefault();
                handleCancelDelete();
              }}>Cancel</button>
              <button className="confirm-delete-button" onClick={(e) => {
                e.stopPropagation();
                handleConfirmDelete();
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {isUpdateOn && (
        <div className='popup-overlay'>
          <div className="update-items-overlay showcase">
            <form className="update-items-form">
              <h2 style={{ display: "flex", justifyContent: "center" }}>Update Product</h2>
              <label>
                Product name
                <input
                  className="product-name"
                  type="text"
                  placeholder="Enter the product name:"
                  value={updateNameInput}
                  onChange={(e) => {
                    console.log(e.target.value);
                    return setUpdateNameInput(e.target.value);
                  }}
                />
              </label>

              <label>
                Preview image(Enter the URL)
                <input
                  className="preview-image"
                  type="text"
                  placeholder="Enter the preview-image"
                  value={updateImageInput}
                  onChange={(e) => { setUpdateImageInput(e.target.value) }}
                />
              </label>

              <div className="price-group">
                <label>
                  Original Price:
                  <input
                    className="original-price"
                    type="text"
                    value={updateOriginalPrice}
                    onChange={(e) => { setUpdateOriginalPrice(e.target.value) }}
                  />
                </label>

                <label>
                  Discount Price:
                  <input className="discount-price"
                    type="text"
                    value={updateDiscountPrice}
                    onChange={(e) => { setUpdateDiscountPrice(e.target.value) }}


                  />
                </label>
              </div>

              <label>
                Product full description
                <textarea
                  className="detailed_description"
                  value={updateDetailedDescription}
                  onChange={(e) => { setUpdateDetailedDescription(e.target.value) }}
                ></textarea>


              </label>

              <div className="user-exp">
                <label>
                  Total buyers
                  <input
                    type="text"
                    value={updateTotalBuyers}
                    onChange={(e) => { setUpdateTotalBuyers(e.target.value) }} />
                </label>

                <label>
                  Rating
                  <input type="text"
                    value={updateOverallRating}
                    onChange={(e) => { setUpdateOverallRating(e.target.value) }} />
                </label>
              </div>

              <div className="confirm-update-actions">
                <button
                  className="cancel-update-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCancelUpdate();
                  }}
                >Cancel</button>
                <button
                  className="confirm-update-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirmUpdate();
                  }}>Update !</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>

  )

}