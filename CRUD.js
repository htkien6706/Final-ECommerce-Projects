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

    else if(e.target.matches('.update-button')) {
        console.log("It's update button !");
    }

    else if(e.target.matches('.view-button')) {
        console.log("It's view button !");
        e.stopPropagation();
        view_index = Array.from(document.querySelectorAll('.view-button')).indexOf(e.target);
        console.log(view_index);
        localStorage.setItem("view-index", "" + view_index);

        window.location.href = "product-details.html";
    }
})

document.addEventListener('click', e=>{
    document.querySelectorAll('.concrete-options').forEach((option) => {
        option.style.visibility = "hidden";
    })
})

const popup_overlay = document.querySelector('.popup-overlay')
popup_overlay.addEventListener('click', e=> {
    e.stopPropagation();

    if(e.target.matches('.cancel-button')) {
        console.log("It's cancel button !");
        popup_overlay.classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('showcase');

    }

    else if(e.target.matches('.confirm-delete-button')) {
        console.log("Confirm deleting items !");
        popup_overlay.classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('active');
        popup_overlay.querySelector('.delete-items-overlay').classList.remove('showcase');

        const new_prods = products.splice(removed_index, 1);
        renderHTML();
    }


})

