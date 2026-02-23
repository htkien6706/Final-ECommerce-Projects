import Header from "../components/Header/Header.jsx"
import IntroPicture from "../components/IntroPicture/IntroPart.jsx"
import ProductList from "../components/ProductList/ProductList.jsx";

export default function HomePage({productList, setProductList, isAddingOn, setIsAddingOn}) {
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