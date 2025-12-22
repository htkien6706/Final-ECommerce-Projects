import {allProducts as defaultProducts} from "./product-details.js";
import {renderHTML} from "./render-card-items.js";
import { addProduct, deleteProduct, getProduct, KEY_LOCAL_STORAGE, initProducts } from "./products-services.js";

let removed_index = null;
let current_index = null;

// nếu mà muốn dùng products thì dùng cái này chung cho toàn bộ chương trình từ đầu đến cuối
let products = initProducts(defaultProducts);
renderHTML(products);
console.log(products);

const all_products = document.querySelector('.all-products');
all_products.addEventListener('click', e=> {
    if(e.target.matches('.crud-options-button')) {
        e.stopPropagation();
        console.log(e.target);
        const option_button = e.target;
        const concrete_option = e.target.parentElement.querySelector('.concrete-options');
        console.log("Crud-option clicked");
        all_products.querySelectorAll('.concrete-options').forEach((option) => {
            option.style.visibility = "hidden";
            console.log(option);
        })

        concrete_option.style.visibility = "visible";
    }

    // đây là phần delete items, ban đầu định tách riêng xử lí từng thằng một, nhưng mà bây giờ xử lí cả 3 options luôn
    if(e.target.matches('.delete-button')) {
        console.log("It's a delete button");
        removed_index = Array.from(document.querySelectorAll('.delete-button')).indexOf(e.target);
        console.log(removed_index);
        e.stopPropagation();
        const popup_overlay = document.querySelector('.popup-overlay');
        popup_overlay.classList.add('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.add('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.add('showcase');

    }

    //have not yet handled the update button
    //handle it after accomplishing the add functionality

    // completed !, move on to confirm update button and cancel update button
    else if(e.target.matches('.update-button')) {
        console.log("It's update button !");
        e.stopPropagation();
        const popup_overlay = document.querySelector('.popup-overlay');
        popup_overlay.classList.add('active');
        popup_overlay.querySelector('.update-items-overlay').classList.add('active');
        popup_overlay.querySelector('.update-items-overlay').classList.add('showcase');

        // first, find the index of the element we want to update
        current_index = Array.from(document.querySelectorAll('.update-button')).indexOf(e.target);
        console.log(current_index);

        products = getProduct();

        document.getElementById("product-name").value = products[current_index].product_description;
        document.getElementById("preview-image").value = products[current_index].preview_image;
        document.getElementById("original-price").value = products[current_index].original_price;
        document.getElementsByTagName("discount-price").value = products[current_index].discount_price;
        document.getElementById("detailed_description").value = products[current_index].detailed_description;


        
    }

    // view actions when clicking in view button
    // also need view action when click in preview-div(handle later)
    else if(e.target.matches('.view-button')) {
        console.log("It's view button !");
        e.stopPropagation();
        current_index = Array.from(document.querySelectorAll('.view-button')).indexOf(e.target);
        console.log(current_index);
        localStorage.setItem("view-index", "" + current_index);

        window.location.href = "product-details.html";
    }
})

//hide all options when click in the document, 
// no worry about the element inside doucment, because it has stoppropagtion
// so, their action cannbot be bubbled to the document to hidden all the details
document.addEventListener('click', e=>{
    document.querySelectorAll('.concrete-options').forEach((option) => {
        option.style.visibility = "hidden";
    })
})

const popup_overlay = document.querySelector('.popup-overlay')
popup_overlay.addEventListener('click', e=> {
    e.stopPropagation();

    //cancel deleting action (completed!)
    if(e.target.matches('.cancel-button')) {
        console.log("It's cancel button !");
        popup_overlay.classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('showcase');

    }

    // confirm action of deleting (completed !)
    else if(e.target.matches('.confirm-delete-button')) {
        console.log("Confirm deleting items !");
        popup_overlay.classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('showcase');

        deleteProduct(products, removed_index);

        //reupdate the products after deleting items
        // if no use localStorage, the data interexchanged between two files is just temporary and just vanish when refresh..
        // we always want permanently store data, but now, no backend, just use localStorage
        products = getProduct();
        renderHTML(products);
    }

    //This is the add button in add functionality
    if(e.target.matches('.confirm-add-button')) {
        console.log("Confirmed !")
        e.preventDefault(); // prevent the form from submitting automatically as defautl

        popup_overlay.classList.remove("active");
        document.querySelector('.add-items-overlay').classList.remove("showcase");
        document.querySelector('.add-items-overlay').classList.remove("active");

        let added_product_name = document.getElementById("product-name").value;
        let added_preview_image = document.getElementById("preview-image");
        let added_original_price = document.getElementById("original-price").value;
        let added_discount_price = document.getElementById("discount-price").value;
        let added_detailed_description = document.getElementById("detailed_description").value;
        let added_total_buyer = 0;
        let added_rating = 0;
        let added_product_images = [
      "image/preview-image-1.1.avif",
      "image/preview-image-1.2.avif",
      "image/preview-image-1.3.avif",
      "image/preview-image-1.4.avif",
      "image/preview-image-1.5.avif"
    ]


        let added_product = {
            product_description: added_product_name,
            preview_image: "image/preview-image-1.1.avif",
            original_price: added_original_price,
            discount_price:added_discount_price,
            detailed_description:added_detailed_description,
            total_buyer: added_total_buyer,
            rating:added_rating ,
            product_images: added_product_images
        }

        addProduct(products, added_product);
        //reupdate the localStorage for permanent storage of items
        products = getProduct();

        renderHTML(products);
    }

    //this is the cancel action of add functionality
    if(e.target.matches('.cancel-add-button')) {
        console.log("It's cancel button of add functionality");
        e.preventDefault();

        popup_overlay.classList.remove("active");
        document.querySelector('.add-items-overlay').classList.remove("showcase");
        document.querySelector('.add-items-overlay').classList.remove("active");
    }

    //completed !
    if(e.target.matches('.cancel-update-button')) {
        console.log("cancel button of update functionality clicked!");
        e.stopPropagation();
        e.preventDefault();

        document.querySelector('.popup-overlay').classList.remove('active');
        document.querySelector('.update-items-overlay').classList.remove('showcase');
        document.querySelector('.update-items-overlay').classList.remove('active');
    }

    if(e.target.matches('.confirm-update-button')) {
        e.stopPropagation();
        e.preventDefault();

        document.querySelector('.popup-overlay').classList.remove('active');
        document.querySelector('.update-items-overlay').classList.remove('showcase');
        document.querySelector('.update-items-overlay').classList.remove('active');


        products = getProduct();

        //Step 0: save all the modified dât to localStorage, and next step update it
        products[current_index].product_description = document.getElementById("product-name").value;
        products[current_index].preview_image = document.getElementById("preview-image").value;
        products[current_index].original_price = document.getElementById("original-price").value;
        products[current_index].discount_price = document.getElementById("discount-price").value;

        // Step 1: update teh localStorage for future storage
        localStorage.setItem(KEY_LOCAL_STORAGE, products);

        products = getProduct();

        //Step 2: using JS, fetch data for main screen, prepare for changing UI
        // note that js changed cannot lead to DOM change, must render UI again
        products[current_index].querySelector('.preview-image').src = products[current_index].preview_image;
        
        //children[0] synonymous with <p> product description
        products[current_index].querySelector('.product-description').children[0].value = products[current_index].product_description;
        products[current_index].getElementById("original-price").value = products[current_index].original_price;
        products[current_index].getElementById("discount-price").value = products[current_index].discount_price;

        //Step 3: render the UI of the webpage again to also change the DOM as wish
        





    }


})

//turn the add item overlay on, handle it in the upper code
document.querySelector('.add-product-button').addEventListener('click', e=> {
    e.stopPropagation();
    popup_overlay.classList.add("active");
    document.querySelector('.add-items-overlay').classList.add("showcase");
    document.querySelector('.add-items-overlay').classList.add("active")
})

console.log(products[products.length - 1]);







