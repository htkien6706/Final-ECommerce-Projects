export const KEY_LOCAL_STORAGE = "products";

export function addProduct(products, added_product) {
    products.push(added_product);
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(products));
}

export function deleteProduct(products, deleted_index) {
    products.splice(deleted_index, 1);
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(products));
}

export function getProduct() {
    return JSON.parse(localStorage.getItem(KEY_LOCAL_STORAGE));
}

export function initProducts(products) {
    const data = localStorage.getItem(KEY_LOCAL_STORAGE);
    if(!data) {
        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(products));
        return products;
    }

    return JSON.parse(data);
}