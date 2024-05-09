"use client";
import AddCat from "../../componets/add_cat";
import AddProduct from "../../componets/add_prod";
import { useState, useEffect } from "react";
import CatDetail from "../../componets/category_dropdown";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "@/app/componets/back_button";

const Admin_addprod = () => {
  const [imageProd, setImageProd] = useState(null); // Fotka pre produkt
  const [imageCat, setImageCat] = useState(null); // Fotka pre kategori
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); //Kategoria produkt

  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    avaibility: "",
    quantity: "",
    category: "",
  });

  const [category, setCategory] = useState({
    category_name: "",
  });

  useEffect(() => {
    if (selectedCategoryId) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: selectedCategoryId,
      }));
    }
  }, [selectedCategoryId]);

  const handleCategorySelected = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleChangeProduct = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeCategory = (event) => {
    const { name, value } = event.target;
    setCategory((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChangeProd = (e) => {
    setImageProd(e.target.files[0]);
  };

  const handleImageChangeCat = (e) => {
    setImageCat(e.target.files[0]);
  };

  return (
    <div className=" justify-center m-8">
      <BackButton />
      <div className="justify-center bg-white2 m-6 p-6 rounded-lg ">
        <p className="font-plus-jakarta text-h3 text-center">
          Pridanie produktu
        </p>
        <div>
          <div className=" p-8 bg-white1 my-6">
            <p className=" font-plus-jakarta">Obrazok produktu (Prosim pridávajte vždy vo formáte PNG)</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChangeProd}
            />
          </div>

          <input
            className="w-full p-2 my-4"
            placeholder="Nazov produktu"
            type="text"
            name="product_name"
            value={product.product_name}
            onChange={handleChangeProduct}
          />
          <textarea
            className="w-full p-2 my-4"
            placeholder="Popis produktu"
            type="text"
            name="description"
            rows={5}
            value={product.description}
            onChange={handleChangeProduct}
          />
          <input
            className="w-full p-2 my-4"
            placeholder="Cena produktu"
            type="number"
            name="price"
            min={0}
            value={product.price}
            onChange={handleChangeProduct}
          />
          <div className=" items-center flex my-4 space-x-2">
            <p className=" font-plus-jakarta">Dostupnost produktu</p>
            <input
              className=" p-2"
              placeholder="Dostupnost produktu"
              type="checkbox"
              name="avaibility"
              value={product.avaibility}
              onChange={handleChangeProduct}
            />
          </div>
          <input
            className="w-full p-2 my-4"
            placeholder="Mnozstvo produktu na sklade"
            type="number"
            min={0}
            name="quantity"
            value={product.quantity}
            onChange={handleChangeProduct}
          />
          <div className=" justify-center">
            <p className=" font-plus-jakarta my-4">Kategoria produktu</p>
            <CatDetail onCategorySelected={handleCategorySelected} />
          </div>
          <div className=" justify-center flex">
            <AddProduct product={product} image={imageProd} />
          </div>
        </div>
      </div>

      <div className="justify-center bg-white2 m-6 p-6 rounded-lg">
        <p className="font-plus-jakarta text-h3 text-center">
          Pridavanie kategorie
        </p>
        <div>
          <div className=" p-8 bg-white1 my-6">
            <p className=" font-plus-jakarta">Obrazok kategorie</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChangeCat}
            />
          </div>

          <input
            className="w-full p-2"
            placeholder="Nazov kategorie"
            type="text"
            name="category_name"
            value={category.category_name}
            onChange={handleChangeCategory}
          />
          <div className=" justify-center flex my-4">
            <AddCat category={category} image={imageCat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_addprod;
