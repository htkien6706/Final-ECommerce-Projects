import { Routes, Route, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import { useState, useEffect } from 'react'
import ProductPage from "./Pages/ProductPage.jsx";
import { router } from "./routes/app.route.js";

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
    <RouterProvider router={router}></RouterProvider>
  );
}
