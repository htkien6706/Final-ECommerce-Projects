import {allProducts as products} from "./product-details.js";
import {renderHTML} from "./render-card-items.js";

let removed_index = null;
let view_index = null;

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
    else if(e.target.matches('.update-button')) {
        console.log("It's update button !");
    }

    // view actions when clicking in view button
    // also need view action when click in preview-div(handle later)
    else if(e.target.matches('.view-button')) {
        console.log("It's view button !");
        e.stopPropagation();
        view_index = Array.from(document.querySelectorAll('.view-button')).indexOf(e.target);
        console.log(view_index);
        localStorage.setItem("view-index", "" + view_index);

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

    //cancel deleting action
    if(e.target.matches('.cancel-button')) {
        console.log("It's cancel button !");
        popup_overlay.classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('showcase');

    }

    // confirm action of deleting 
    else if(e.target.matches('.confirm-delete-button')) {
        console.log("Confirm deleting items !");
        popup_overlay.classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('showcase');

        const new_prods = products.splice(removed_index, 1);
        renderHTML();
    }

    //This is the add button in add functionality
    if(e.target.matches('.confirm-add-button')) {
        console.log("Confirmed !")
        e.preventDefault(); // prevent the form from submitting automatically as defautl

        popup_overlay.classList.remove("active");
        document.querySelector('.add-items-overlay').classList.remove("showcase");
        document.querySelector('.add-items-overlay').classList.remove("active");

        let added_products = {
            product_description: "Heritage Cable Knit Turtleneck Sweater",
            preview_image: "image/preview-image-1.webp",
            original_price: "$98.00",
            discount_price: "$62.00",
            detailed_description:
            "Inspired by classic heritage knitwear, this cable-knit turtleneck sweater is crafted from a premium mid-weight wool blend that provides warmth without excessive bulk. The intricate cable texture adds depth and character, while the high turtleneck collar offers natural insulation against cold weather. Designed for refined layering, this piece balances timeless style with modern comfort, making it a versatile essential for both casual and elevated outfits.",
            total_buyer: 240,
            rating: 4.7,
            product_images: [
            "image/preview-image-1.1.avif",
            "image/preview-image-1.2.avif",
            "image/preview-image-1.3.avif",
            "image/preview-image-1.4.avif",
            "image/preview-image-1.5.avif"
            ]
        }

        products.push(added_products);
        renderHTML();
    }

    //this is the cancel action of add functionality
    if(e.target.matches('.cancel-add-button')) {
        console.log("It's cancel button of add functionality");
        e.preventDefault();

        popup_overlay.classList.remove("active");
        document.querySelector('.add-items-overlay').classList.remove("showcase");
        document.querySelector('.add-items-overlay').classList.remove("active");
    }


})

//turn the add item overlay on, handle it in the upper code
document.querySelector('.add-product-button').addEventListener('click', e=> {
    e.stopPropagation();
    popup_overlay.classList.add("active");
    document.querySelector('.add-items-overlay').classList.add("showcase");
    document.querySelector('.add-items-overlay').classList.add("active")
})





