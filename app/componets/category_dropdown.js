import { useState, useEffect } from "react";

const CatDetail = ({ onCategorySelected }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/category').then((res) => res.json());
      setCategories(res);
    }
    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    const selectedCategoryId = event.target.value;
    onCategorySelected(selectedCategoryId); 
  };

  return (
    <select className=" p-2"  onChange={handleSelectChange}>
      <option value="">Vyberte kategóriu</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.nazov}</option>
      ))}
    </select>
  );
}

export default CatDetail;
