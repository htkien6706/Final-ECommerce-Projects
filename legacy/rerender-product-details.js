import { KEY_LOCAL_STORAGE } from "./products-services.js";
import { renderHTML_products } from "./render-product-details.js";
const view_idx = Number(localStorage.getItem("view-index"));

renderHTML_products(JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE)), view_idx);
