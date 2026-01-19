import Header from "../components/Header/Header.jsx"
import IntroPicture from "../components/IntroPicture/IntroPart.jsx"
import ProductList from "../components/ProductList/ProductList.jsx";
import { useState, useEffect } from 'react'
import { LIST_KEY } from "../services/ProductStorage.jsx";
import initialList from "../TruthSource/SourceData.jsx";

export default function HomePage() {
  
  // state cho whole product list
  const [productList, setProductList] = useState(() => {
    const data = localStorage.getItem(LIST_KEY);
    return data ? JSON.parse(data) : initialList;
  });

  //state for adding items
  const [isAddingOn, setIsAddingOn] = useState(false);

  //productList updated -> localStorage automatically trigger UI update
  useEffect(() => {
    localStorage.setItem(LIST_KEY, JSON.stringify(productList))
    console.log(productList);
  }, [productList]);

  useEffect(() => {
    console.log(isAddingOn ? "Overlay is turned on" : "The overlay is turned off")
  }, [isAddingOn])

  return (
    <>
      <Header 
      setIsAddingOn = {setIsAddingOn}
      />

      <IntroPicture />
      <ProductList
        productList={productList}
        setProductList={setProductList}
        isAddingOn = {isAddingOn}
        setIsAddingOn = {setIsAddingOn}
      />
    </>
  )
}