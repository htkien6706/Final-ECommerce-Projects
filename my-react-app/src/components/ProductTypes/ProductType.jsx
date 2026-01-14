import "./ProductTypes.css"
import allShirt from "../../assets/image/all-shirt-image.avif"
import shirt from "../../assets/image/shirt-image.avif"
import sweater from "../../assets/image/sweater-image.avif"
import tee from "../../assets/image/tee-image.avif"
import polo from "../../assets/image/polo-image.avif"
import football from "../../assets/image/football-image.avif"

export default function ProductTypes() {
  const types = [
    { sourceFile: allShirt, uniqueId: crypto.randomUUID() },
    { sourceFile: shirt, uniqueId: crypto.randomUUID() },
    { sourceFile: sweater, uniqueId: crypto.randomUUID() },
    { sourceFile: tee, uniqueId: crypto.randomUUID() },
    { sourceFile: polo, uniqueId: crypto.randomUUID() },
    { sourceFile: football, uniqueId: crypto.randomUUID() },
  ];

  return (
    <>
      <TrendingProducts />
      <ul className="general-types">
        {types.map((type) => {
          const isFootball = type.sourceFile === football;

          return (
            <li key={type.uniqueId}>
              <img
                src={type.sourceFile}
                style={isFootball ? { width: "538px" } : {}}
              ></img>
            </li>
          );
        })}
      </ul>

      <p
        style={{
          fontWeight: "550",
          fontSize: "30px",
          marginTop: "50px",
        }}
      >
        Men's Shirts, Sweeters, Tees & Polos
      </p>
    </>
  );
}

function TrendingProducts() {
  return <p style={{ fontWidth: "bold", fontSize: "30px" }}>WHAT'S HOT ?</p>;
}
