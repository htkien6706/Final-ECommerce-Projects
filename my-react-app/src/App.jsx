import Category from "./components/Header/Category.jsx";
import Header from "./components/Header/Header.jsx";
import IntroPicture from  "./components/IntroPicture/IntroPart.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import ProductType from "./components/ProductTypes/ProductType.jsx";

export default function App() {
  return (
    <>
      <Header/>
      <IntroPicture/>
      <ProductList/>
    </>
  )
}