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

document.querySelectorAll('.concrete-options').forEach((option, index) => {
    option.addEventListener('click', e=> {
        e.stopPropagation();

        console.log(e.target);

        if(e.target.matches('.delete-button')) {
            console.log("It's delete button");
            products.splice(index, 1);
            console.log(products)
            renderHTML();
        }    
    })



    




})



