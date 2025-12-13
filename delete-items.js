import {allProducts as products} from "./product-details.js";
import {renderHTML} from "./render-products.js";

const crud_buttons = document.querySelectorAll('.crud-options-button');

crud_buttons.forEach((crud_button, index) => {
    crud_button.addEventListener('click', e=>{
        e.stopPropagation();
        const prev_div = crud_button.parentNode;
        const concrete_option = prev_div.querySelector('.concrete-options');
        console.log(concrete_option);
        
        document.querySelectorAll('.concrete-options').forEach((option) => {
            option.style.visibility = "hidden";
        })

        concrete_option.style.visibility = "visible";
    })
})

// document nos contain all, nen no se bat tat ca su kien
// muon customize rieng, thi phai co e.stoppropagtion
document.addEventListener('click', () => {
    document.querySelectorAll('.concrete-options').forEach((option, index) => {
        option.style.visibility = "hidden";
    })

})

// su dung event delegation de toi uu nhat, dang cap search engine
document.querySelectorAll('.concrete-options').forEach((option, index) => {
    option.addEventListener('click', e => {
        e.stopPropagation();

        if(e.target.matches('.delete-button')) {
            console.log("It's delete button");
            const overlay = document.querySelector('.popup-overlay');
            overlay.style.visibility = "visible";
            overlay.style.opacity = 1;
            
            document.body.classList.add('no-scroll');
            overlay.querySelector('.add-items-overlay').classList.add('showcase');

            // tiep tuc su dung event delegation hahah
            overlay.querySelector('.confirm-actions').addEventListener('click', e => {
                e.stopPropagation();

                if(e.target.matches('.cancel-button')) {
                    overlay.style.opacity = 0;
                    overlay.style.visibility = "hidden";
                    document.body.classList.remove('no-scroll');
                }
            })
        }
        
    })
})



