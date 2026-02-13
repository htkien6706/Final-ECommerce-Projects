import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProductTypes from "../Types/ProductType.jsx"
import "./ProductList.css";
import "./Delete.css";
import "./Update.css";
import "./Add.css";
import "./Rating.css"
import { LIST_KEY } from '../../services/ProductStorage.jsx';

export default function ProductList({ productList, setProductList, isAddingOn, setIsAddingOn }) {
  const navigate = useNavigate();


  //state of just settingMenuIndex, if index === openedMneuIndex -> turn on 3 concrete-options
  const [openedMenuIndex, setOpenedMenuIndex] = useState(null);

  //state of delete index, if index === deletedIndex -> list.filter((_, index) => index != deletedIndex) to remove product with deletedIndex
  const [deletedIndex, setDeletedIndex] = useState('');
  const [isDeleteOn, setIsDeleteOn] = useState(false);

  //state of updated index
  const [updateIndex, setUpdateIndex] = useState('');
  const [isUpdateOn, setIsUpdateOn] = useState(false);

  const [updateNameInput, setUpdateNameInput] = useState('');
  const [updateImageInput, setUpdateImageInput] = useState('');
  const [updateOriginalPrice, setUpdateOriginalPrice] = useState('');
  const [updateDiscountPrice, setUpdateDiscountPrice] = useState('');
  const [updateDetailedDescription, setUpdateDetailedDescription] = useState('');
  const [updateTotalBuyers, setUpdateTotalBuyers] = useState('');
  const [updateOverallRating, setUpdateOverallRating] = useState('');


  const [addNameInput, setAddNameInput] = useState('');
  const [addImageInput, setAddImageInput] = useState('');
  const [addOriginalPriceInput, setAddOriginalPriceInput] = useState('');
  const [addDiscountPriceInput, setAddDiscountPriceInput] = useState('');
  const [addDetailedDescriptionInput, setAddDetailedDescriptionInput] = useState('');
  const [addTotalBuyersInput, setAddTotalBuyersInput] = useState(0);
  const [addRatingInput, setAddRatingInput] = useState(0);



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
    const currentUniqueId = productList[deletedIndex].uniqueId;

    //delete product based on id
    fetch(`http://localhost:3000/api/product/${currentUniqueId}`, 
      {
        method:"DELETE",
        headers: {
          "Content-Type" : "application/json"
        }
      }
    ).then(response => {
      response.json();
      console.log(response);
    })
    .then(data => {
      console.log(data);
      setProductList(list => list.filter(product => product.uniqueId != currentUniqueId))
    });
  }

  function handleUpdateButton(index) {
    //turn off the menu button
    setOpenedMenuIndex(null);
    setIsUpdateOn(true);
    setUpdateIndex(index);
    console.log(productList);

    //product-name input
    setUpdateNameInput(productList[index].product_description);
    console.log(updateNameInput);

    //preview-image input
    setUpdateImageInput(productList[index].preview_image);
    console.log(productList[index].preview_image);

    //original-price input
    setUpdateOriginalPrice(productList[index].original_price);
    console.log(updateOriginalPrice);

    //discount-price input
    setUpdateDiscountPrice(productList[index].discount_price);
    console.log(updateDiscountPrice);

    //detailed-description input
    setUpdateDetailedDescription(productList[index].detailed_description);
    console.log(setUpdateDetailedDescription); // nó sẽ bị chậm hơn so với index thật 1 lần render

    //buyers input
    setUpdateTotalBuyers(productList[index].total_buyer);

    // overall-rating input
    setUpdateOverallRating(productList[index].rating);
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
      rating: updateOverallRating,
      uniqueId: productList[updateIndex].uniqueId,
      product_images: [
        "/image/preview-image-1.1.avif",
        "/image/preview-image-1.2.avif",
        "/image/preview-image-1.3.avif",
        "/image/preview-image-1.4.avif",
        "/image/preview-image-1.5.avif"
      ],
    }

    //cannot permanently update without database
    fetch("http://localhost:3000/api/product", {
      method:"PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(updatedProduct)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      setProductList(list => list.map(product => {
        return product.uniqueId === updatedProduct.uniqueId ? updatedProduct : product
      }))
    });
  }

  function handleAddAction() {
    return setIsAddingOn(false);
  }

  function handleConfirmAddAction() {
    const addPreviewImageInput = (addImageInput === null || addImageInput === '') ? productList[0].preview_image : addImageInput;

    const newProduct = {
      product_description : addNameInput,
      preview_image: addPreviewImageInput,
      original_price : addOriginalPriceInput,
      discount_price : addDiscountPriceInput,
      detailed_description : addDetailedDescriptionInput,
      total_buyer : addTotalBuyersInput,
      rating : addRatingInput,
      uniqueId: crypto.randomUUID(),
      product_images: [
        "/image/preview-image-1.1.avif",
        "/image/preview-image-1.2.avif",
        "/image/preview-image-1.3.avif",
        "/image/preview-image-1.4.avif",
        "/image/preview-image-1.5.avif"
      ],
    }

    //update the state of the product list 
    fetch("http://localhost:3000/api/product", {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newProduct)
    })
    .then(response => {
      response.json();
      console.log(response);
    })
    .then(data => {
      console.log(data);
      setProductList(list => [...list, newProduct]);
    });
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
                      <div 
                      // mình phải khai báo dynamic route ở phần browersrouter, routes, và route, nên khi navigate qua cái chỗ này thì dùng useParams để lấy phần slug = index để mà render
                      className="options-button view-button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/Product/${index}`);
                        console.log(index);
                      }}> Quick view !
                      
                      </div>

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
                  <div className='overall-rating' style={{"--rating": product.rating}}>
                    <span className='stars-background'>★★★★★</span>
                    <span className='stars-foreground'>★★★★★</span>
                  </div>

                  <span className='display-rating' style={{marginLeft: "5px"}}> {(`(${product.rating})`)}</span>

                  <p>
                    <span className='original-price'> {product.original_price} </span>
                    <span className='discount-price'> {product.discount_price}</span>
                  </p>

                  <p className='cnt-buyers' style={{fontSize: "17px"}}> Total sold: {product.total_buyer}</p>
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

      {isAddingOn && (
        <div className='popup-overlay'>
          <div className="add-items-overlay showcase">
            <form className="add-items-form">
              <h2 style={{ display: "flex", justifyContent: "center" }}>Add Product</h2>
              <label>
                Product name
                <input
                  className="product-name"
                  type="text"
                  placeholder="Enter the product name:"
                  value={addNameInput}
                  onChange={(e) => {return setAddNameInput(e.target.value)}}
                />
              </label>

              <label>
                Preview image(Enter the URL)
                <input
                  className="preview-image"
                  type="text"
                  placeholder="Enter the preview-image"
                  value={addImageInput}
                  onChange={(e) => setAddImageInput(e.target.value)}
                />
              </label>

              <div className="price-group">
                <label>
                  Original Price:
                  <input
                    className="original-price"
                    type="text"
                    value={addOriginalPriceInput}
                    onChange={e => setAddOriginalPriceInput(e.target.value)} />
                </label>

                <label>
                  Discount Price:
                  <input
                    className="discount-price"
                    type="text"
                    value={addDiscountPriceInput}
                    onChange={e => setAddDiscountPriceInput(e.target.value)} />
                </label>
              </div>

              <label>
                Product full description
                <textarea 
                className="detailed_description"
                value={addDetailedDescriptionInput}
                onChange={e => setAddDetailedDescriptionInput(e.target.value)}></textarea>
              </label>

              <div className="user-exp">
                <label>
                  Total buyers
                  <input type="text"
                    value={addTotalBuyersInput}
                    onChange={e => setAddTotalBuyersInput(e.target.value)} />
                </label>

                <label>
                  Rating
                  <input
                    type="text"
                    value={addRatingInput}
                    onChange={(e) => {
                      console.log(e.target.value);
                      return setAddRatingInput(e.target.value);
                    }} />

                </label>
              </div>

              <div className="confirm-actions">
                <button
                  className="cancel-add-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddAction();
                  }}>
                  Cancel

                </button>
                <button
                  className="confirm-add-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleConfirmAddAction();
                    setIsAddingOn(false);
                  }}
                >Add products !
                </button>
              </div>
            </form>
          </div>
        </div>

      )}

    </>

  )

}