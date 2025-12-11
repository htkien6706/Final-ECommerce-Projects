const products = [
  {
    product_description: "Turtleneck Everyday Performance Merino Wool Sweater",
    preview_image: "image/preview-image-1.webp",
    original_price: "$78.00",
    discount_price: "$45.00",
  },
  {
    product_description: "Crew Neck Everyday Performance Merino Wool Sweater",
    preview_image: "image/preview-image-2.avif",
    original_price: "$78.00",
    discount_price: "$45.00",
  },
  {
    product_description:
      "Slim Solid Wrinkle-Resistant Everyday Performance Dress Shirt",
    preview_image: "image/preview-image-3.avif",
    original_price: "$88.00",
    discount_price: "$52.00",
  },
  {
    product_description: "Perfect Pima Cotton Crew Neck T-Shirt",
    preview_image: "image/preview-image-4.avif",
    original_price: "$48.00",
    discount_price: "$28.00",
  },
  {
    product_description: "Slim Solid Cotton Stretch 1MX Dress Shirt",
    preview_image: "image/preview-image-5.avif",
    original_price: "$78.00",
    discount_price: "$45.00",
  },
  {
    product_description: "Relaxed Fleece Hoodie",
    preview_image: "image/preview-image-6.avif",
    original_price: "$65.00",
    discount_price: "$39.00",
  },
  {
    product_description: "Cable Knit Crew Neck Sweater",
    preview_image: "image/preview-image-7.avif",
    original_price: "$92.00",
    discount_price: "$55.00",
  },
  {
    product_description: "X-Logo Perfect Pima Cotton Pique Polo",
    preview_image: "image/preview-image-8.avif",
    original_price: "$52.00",
    discount_price: "$32.00",
  },
  {
    product_description: "Felted Mock Neck Sweater",
    preview_image: "image/preview-image-9.avif",
    original_price: "$89.00",
    discount_price: "$58.00",
  },
  {
    product_description: "Modern Prep Short Sleeve Sweater Polo",
    preview_image: "image/preview-image-10.avif",
    original_price: "$58.00",
    discount_price: "$35.00",
  },
  {
    product_description: "Fleece Quarter Zip Sweatshirt",
    preview_image: "image/preview-image-11.avif",
    original_price: "$72.00",
    discount_price: "$44.00",
  },
  {
    product_description: "Quarter Zip Everyday Performance Merino Wool Sweater",
    preview_image: "image/preview-image-12.avif",
    original_price: "$88.00",
    discount_price: "$56.00",
  },
  {
    product_description: "Hudson Bridge Perfect Pima Cotton Graphic T-Shirt",
    preview_image: "image/preview-image-13.avif",
    original_price: "$38.00",
    discount_price: "$24.00",
  },
  {
    product_description: "Foam Finger Patch Classic Fit Premium Weight Graphic T-Shirt",
    preview_image: "image/preview-image-14.avif",
    original_price: "$75.00",
    discount_price: "$49.00",
  },
  {
    product_description: "Mini Geo Textured Everyday Performance Henley.",
    preview_image: "image/preview-image-15.avif",
    original_price: "$48.00",
    discount_price: "$30.00",
  },
  {
    product_description: "Formula 1 McLaren Achievement Graphic T-Shirt",
    preview_image: "image/preview-image-16.avif",
    original_price: "$32.00",
    discount_price: "$19.00",
  },
  {
    product_description: "Perfect Pima Cotton Short Sleeve Henley..",
    preview_image: "image/preview-image-17.avif",
    original_price: "$62.00",
    discount_price: "$36.00",
  },
  {
    product_description: "Slim Supersoft Heather Crew Neck T-Shirt..",
    preview_image: "image/preview-image-18.avif",
    original_price: "$54.00",
    discount_price: "$31.00",
  },
  {
    product_description: "Circle X-Logo Graphic Cotton T-Shirt.",
    preview_image: "image/preview-image-19.avif",
    original_price: "$68.00",
    discount_price: "$42.00",
  },
  {
    product_description: "NYC is never good",
    preview_image: "image/preview-image-20.avif",
    original_price: "$70.00",
    discount_price: "$40.00",
  },
];

let product_html = "";
products.forEach((product) => {
  const p_html = 
            `
        <li class="card-items">
          <div class="preview-div">
            <img class="preview-image" src="${product.preview_image}" alt="picture of a man with a shirt">
            <div id="preview-image-overlay"></div>
            <button class="crude-options-button"> ⋮ </button>
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

  product_html = product_html + p_html;
});

const prods = document.querySelector('.all-products');
prods.innerHTML = product_html;

console.log(prods);