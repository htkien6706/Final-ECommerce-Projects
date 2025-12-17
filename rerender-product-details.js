import { renderHTML_products as render_html_products } from "./render-product-details.js";
let view_index = Number(localStorage.getItem("view-index"));
console.log(view_index);

render_html_products(view_index);
