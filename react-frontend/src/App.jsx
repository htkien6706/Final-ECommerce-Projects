import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import { useState, useEffect } from 'react'
import { LIST_KEY } from "./services/ProductStorage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import Authenticate from "./auth/authenticate.jsx";

export default function App() {
  // state cho whole product list
  const [productList, setProductList] = useState([]);

  //state for adding items
  const [isAddingOn, setIsAddingOn] = useState(false);

  //call API for GET HTTP methods
  useEffect(() => {
    fetch("http://localhost:3000/api/product/seedData")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setProductList(data);
    })
  }, [])

  console.log(productList);

  useEffect(() => {
    console.log(isAddingOn ? "Overlay is turned on" : "The overlay is turned off")
  }, [isAddingOn])

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage
          productList={productList}
          setProductList={setProductList}
          isAddingOn={isAddingOn}
          setIsAddingOn={setIsAddingOn} />} />

      <Route
        path="/Product/:index"
        element={<ProductPage
          productList={productList}
        />} />

      <Route
      path="/authenticate"
      element= {<Authenticate/>}>
      </Route>
        
    </Routes>
  );
}
