//mé nó phải reset localStorage để làm lại ạ khổ cực vãi đái ra
//căn bản mình đã ngáo ngơ khi set localStorage với value là normal object nên nó bị lỗi
//lẽ ra phải stringify nhưng không, mình chỉ để object thường chứ không có json.stringify()làm cho localStroage bị lỗi -> càng CRUD càng bug


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

        products = getProduct(); //lấy ra sản phẩm ở trong localStorage

        document.querySelector(".update-items-overlay").querySelector(".product-name").value = products[current_index].product_description;
        document.querySelector(".update-items-overlay").querySelector(".preview-image").value = products[current_index].preview_image;
        document.querySelector(".update-items-overlay").querySelector(".original-price").value = products[current_index].original_price;
        document.querySelector(".update-items-overlay").querySelector(".discount-price").value = products[current_index].discount_price;
        document.querySelector(".update-items-overlay").querySelector(".detailed_description").value = products[current_index].detailed_description;


        
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

        //xóa sản phẩm ở trong localStorage, đồng thời trả lại luôn số sản phẩm hiện tại
        // lưu ý là dùng spread operator nên là khi return thì return tham trị, nhưng gán lại rồi thì lúc này products 
        // cũng đã bị thay đổi theo
        products = getProduct();
        products = deleteProduct(products, removed_index);

        //reupdate the products after deleting items
        // if no use localStorage, the data interexchanged between two files is just temporary and just vanish when refresh..
        // we always want permanently store data, but now, no backend, just use localStorage
        renderHTML(products);
    }

    //This is the add button in add functionality
    if(e.target.matches('.confirm-add-button')) {
        console.log("Confirmed !")
        e.preventDefault(); // prevent the form from submitting automatically as defautl

        popup_overlay.classList.remove("active");
        document.querySelector('.add-items-overlay').classList.remove("showcase");
        document.querySelector('.add-items-overlay').classList.remove("active");

        let added_product_name = document.querySelector('.add-items-overlay').querySelector(".product-name").value;
        let added_preview_image = document.querySelector(".add-items-overlay").querySelector(".preview-image").value;
        let added_original_price = document.querySelector(".add-items-overlay").querySelector(".original-price").value;
        let added_discount_price = document.querySelector(".add-items-overlay").querySelector(".discount-price").value;
        let added_detailed_description = document.querySelector(".add-items-overlay").querySelector(".detailed_description").value;
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

        products = getProduct();
        products = addProduct(products, added_product);
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

        //get products in localStorage for the lastest version of products
        products = getProduct();

        //use spread operator to shalow copy and allow overrwrite
        products[current_index] = {
                ...products[current_index],
                product_description: document.querySelector(".update-items-overlay").querySelector(".product-name").value,
                preview_image: document.querySelector(".update-items-overlay").querySelector('.preview-image').value,
                original_price: document.querySelector(".update-items-overlay").querySelector('.original-price').value,
                discount_price: document.querySelector(".update-items-overlay").querySelector('.discount-price').value,
                detailed_description: document.querySelector(".update-items-overlay").querySelector('.detailed_description').value
        };

        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(products));

       


        //remove the popup after finishing update items
        document.querySelector('.popup-overlay').classList.remove('active');
        document.querySelector('.update-items-overlay').classList.remove('showcase');
        document.querySelector('.update-items-overlay').classList.remove('active');

         // just the update in the UI of webpage, also need update in product details
        renderHTML(products); 
    }


})

//turn the add item overlay on, handle it in the upper code
document.querySelector('.add-product-button').addEventListener('click', e=> {
    e.stopPropagation();
    popup_overlay.classList.add("active");
    document.querySelector('.add-items-overlay').classList.add("showcase");
    document.querySelector('.add-items-overlay').classList.add("active");
})









