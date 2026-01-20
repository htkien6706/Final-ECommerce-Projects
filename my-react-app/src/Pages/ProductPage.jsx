import { useState } from "react";
import Header from "../components/Header/Header";
import "./ProductPage.css";
import { useParams } from "react-router-dom";

export default function ProductPage({ productList }) {
    const {index} = useParams();
    const viewingProduct = productList[index];
    console.log(productList);
    console.log(productList[index].product_images);
    const [mainImage, setMainImage] = useState(productList[index].product_images[0]);
    

    return (
        <div className="web-container">
            <Header />

            <div className="web-content">
                <div className="gallary-images">
                    <div className="main-image-div">
                        <img
                            className="main-image"
                            src={mainImage}
                            alt={"haha"}
                        />
                    </div>

                    <div className="support-images">
                        {viewingProduct.product_images.map((image) => {
                            return (
                                <div className="support-image-div">
                                    <img 
                                    className="support-image"
                                    src={image}
                                    alt="image of product"
                                    onClick={() => setMainImage(image)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="product-details">
                    <div className="product-name">{viewingProduct.product_description}</div>
                    <p className="product-description">
                        {viewingProduct.detailed_description}
                    </p>
                    <div className="user-rating">
                        <span className="star-background">★★★★★</span>
                        <span className="star-foreground">★★★★★</span>
                    </div>

                    <div className="price-group">
                        <span className="discount-price">{viewingProduct.discount_price}</span>
                        <span className="original-price">{viewingProduct.original_price}</span>
                    </div>

                    <div className="size">
                        Size:
                        <button>38</button>
                        <button>39</button>
                        <button>40</button>
                        <button>41</button>
                    </div>

                    <div className="utility-button">
                        <button className="add-to-cart">Add to cart</button>
                        <button className="buy-now">Buy now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
