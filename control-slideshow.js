import {allProducts as products} from './product-details.js';

let slide_index = 0;
moveSlide();

function moveSlide() {
    const slide_show = document.querySelector('.slide-show');
    slide_show.addEventListener('click', e=> {
        if(e.target.matches('.upward-button')) {
            e.stopPropagation();
            if(slide_index > 0) {
                slide_index --;
                changeImage();
            }
        }

        else if(e.target.matches('.downward-button')) {
            e.stopPropagation();
            if(slide_index < products[0].product_images.length - 1) {
                slide_index ++;
                changeImage();
            }
        }
    })
}

function changeImage() {
    document.querySelector('.main-image-img').src = products[0].product_images[slide_index];
}