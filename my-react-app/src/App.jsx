import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/HomePage" element={<HomePage />} />
    </Routes>
  );
}
