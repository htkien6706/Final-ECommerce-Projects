export const LIST_KEY = "LIST_KEY";

export function deleteProduct(currentList, deletedIndex) {
    // delete Item just only do one work, delete item from currentList, not setLocalStorage
    return currentList.filter((product, index) => {return index != deletedIndex});
} 

export function addProduct(currentList, addedField) {
    const newList = [...currentList, addedField];
    return newList;
}

export function updateList(currentList, updatedProduct, updatedIndex) {
    return currentList.map((product, index) => 
        index === updatedIndex ? updatedProduct : product
    )
}