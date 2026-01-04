import {allProducts as products} from './product-details.js';

let slide_index = 0;
let view_index = Number(localStorage.getItem("view-index"));

document.querySelector('.body-container').addEventListener('click', e=> {
    if(e.target.matches('.upward-button')) {
        e.stopPropagation();
        console.log("it's upward button !");
        if(slide_index > 0) {
            slide_index = slide_index - 1;
        }
        console.log(slide_index);
        showImage();
    }

    else if(e.target.matches('.downward-button')) {
        e.stopPropagation();
        console.log("Its downward button");

        if(slide_index < products[view_index].product_images.length - 1) {
            slide_index ++;
        }
        console.log(slide_index);
        showImage();
    }
})

function showImage() {
    document.querySelector('.main-image-img').src = products[view_index].product_images[slide_index];
}