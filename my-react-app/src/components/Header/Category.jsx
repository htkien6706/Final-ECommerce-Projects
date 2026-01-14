import "./Category.css"

const categories = [
  { name: "NEWEST", uniqueId: crypto.randomUUID() },
  { name: "WOMAN", uniqueId: crypto.randomUUID() },
  { name: "MAN", uniqueId: crypto.randomUUID() },
  { name: "SWEATER", uniqueId: crypto.randomUUID() },
  { name: "SHIRT", uniqueId: crypto.randomUUID() },
  { name: "FOOTBALL", uniqueId: crypto.randomUUID() },
  { name: "BASKETBALL", uniqueId: crypto.randomUUID() },
  { name: "GIFT FOR GIRLFRIEND", uniqueId: crypto.randomUUID() },
];

export default function Categories() {
  return (
    <ul className="categories-list">
      {categories.map((category) => {
        return <li key={category.uniqueId}> {category.name}</li>;
      })}
    </ul>
  );
}
