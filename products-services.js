export const KEY_LOCAL_STORAGE = "products";

//initProducts, getProduct, addProduct, deleteProduct
export function initProducts(defaultProducts) {
    const temp = localStorage.getItem(KEY_LOCAL_STORAGE);

    //case 1: localStorage chưa khởi tạo sản phẩm, tức là có sản phẩm nhưng mà localStorage chưa gán lần nào    
    if(!temp) {
        //-> solution: gán nó vào localStorage
        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(defaultProducts));
        return defaultProducts;
    }

    else {
        try{
            return JSON.parse(temp);
        } catch{
            localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(defaultProducts));
            return defaultProducts;
        }
    }
}

export function getProduct() {
    const raw = localStorage.getItem(KEY_LOCAL_STORAGE);
    if(!raw) {
        return []; // lưu ý rằng getProducts chỉ có tác dụng lấy sản phẩm
        // nếu mà không lấy được sản phẩm, null -> chả về mãng rỗng
    }

    else {
        try{
            return JSON.parse(raw);
        } catch{ // dữ liệu rác kiểu dạng [object Object]
            return[];
        }
    }
}

export function addProduct(products, added_product) {
    const newProduct = [...products, added_product];
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(newProduct));

    return newProduct;
}

export function deleteProduct(products, removed_index) {
    const newProduct = [...products];
    if(newProduct.length >= 1) {
        newProduct.splice(removed_index, 1);
        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(newProduct));
    }

    return newProduct;
    
}

