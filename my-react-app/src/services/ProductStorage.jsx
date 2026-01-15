export const LIST_KEY = "LIST_KEY";

export function getProductList(currentList) {
    const data = localStorage.getItem(LIST_KEY);

    if(data === null) {
        localStorage.setItem(LIST_KEY, JSON.stringify(currentList));
        return currentList;
    }

    return JSON.parse(data); 
}

export function deleteProduct(deletedIndex) {
    const data = localStorage.getItem(LIST_KEY);
    const currentList = JSON.parse(data);

    const newList = currentList.filter((_, index) => index != deletedIndex);
    localStorage.setItem(LIST_KEY, JSON.stringify(newList));
    return newList;
} 

export function addProduct(addedField) {
    const data = localStorage.getItem(LIST_KEY);
    const currentList = JSON.parse(data);

    const newList = [...currentList, addedField];
    return newList;
}

export function updateList(updatedProduct, updatedIndex) {
    const data = localStorage.getItem(LIST_KEY);
    const currentList = JSON.parse(data);

    const newList = currentList.map((product, index) => 
        index === updatedIndex ? updatedProduct : product
    );

    localStorage.setItem(LIST_KEY, JSON.stringify(newList));

    return newList;
}