import { useState, useEffect } from "react";

const CatDetail = ({ onCategorySelected }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(process.env.NEXT_PUBLIC_DIRECTUS + "items/kategoria", {
        cache: "no-store",
      }).then((res) => res.json());
      setCategories(res.data);
    }

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedCategoryId = event.target.value;
    onCategorySelected(selectedCategoryId); 
  };

  return (
    <select onChange={handleSelectChange}>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.nazov}</option>
      ))}
    </select>
  );
}

export default CatDetail;
