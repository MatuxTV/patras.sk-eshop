"use client";
import Nav from "../componets/nav";
import { useState } from "react";
import CatDetail from "../componets/category_dropdown";
import OrderList from "../componets/orders";
import AddCat from "../componets/add_cat";
import AddProduct from "../componets/add_prod";
import DelUser from "../componets/dell_user";

import SignOutButton from "../componets/signOutButton";

const Admin = () => {
  const [imageProd, setImageProd] = useState(null);
  const [imageCat, setImageCat] = useState(null);

  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    avaibility: "",
    quantity: "",
  });

  const [category, setCategory] = useState({
    category_name: "",
  });

  const handleChangeProduct = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
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
    <div>
      <Nav />
      <div className=" justify-center m-8">
        {/* {Pridavanie produktu} */}
        <div className="flex w-full">
          <p className=" font-plus-jakarta justify-start">
            Pridavanie produktu
          </p>
          <div className="flex justify-between border">
            <input
              className="w-full p-2  shadow-md"
              placeholder="Nazov produktu"
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChangeProduct}
            />
            <div>
              <p className=" font-plus-jakarta">Obrazok produktu</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChangeProd}
              />
            </div>

            <input
              className="w-full p-2  shadow-md"
              placeholder="Popis produktu"
              type="text"
              name="description"
              value={product.description}
              onChange={handleChangeProduct}
            />
            <input
              className="w-full p-2  shadow-md"
              placeholder="Cena produktu"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChangeProduct}
            />
            <div>
              <p>Dostupnost produktu</p>
              <input
                className=" p-2 shadow-md"
                placeholder="Cena produktu"
                type="checkbox"
                name="avaibility"
                value={product.avaibility}
                onChange={handleChangeProduct}
              />
            </div>

            <input
              className="w-full p-2  shadow-md"
              placeholder="Mnozstvo produktu na sklade"
              type=""
              name="quantity"
              value={product.quantity}
              onChange={handleChangeProduct}
            />
            <div>
              <p>Kategoria produktu</p>
              <CatDetail />
            </div>

            <AddProduct product={product} image={imageProd} />
            
          </div>
        </div>

        {/* {Nova kategoria} */}
        <div className="flex w-full my-9">
          <p className=" font-plus-jakarta justify-start">
            Pridavanie kategorie
          </p>
          <div className="flex justify-between border">
            <input
              className="w-full p-2  shadow-md"
              placeholder="Nazov kategorie"
              type="text"
              name="category_name"
              value={category.category_name}
              onChange={handleChangeCategory}
            />
            <div>
              <p className=" font-plus-jakarta">Obrazok kategorie</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChangeCat}
              />
            </div>

            <AddCat category={category} iamge={imageCat} />
          </div>
        </div>

        {/* {Zobrazenie objednavok} */}
        <div className=" mt-10  justify-center ">
          <h1 className=" text-center text-h5 font-plus-jakarta">Objednavky</h1>
          <div className=" justify-center">
            <OrderList />
          </div>
        </div>
        <div>
          <h1 className=" text-center text-h5 font-plus-jakarta">Uzivatelia</h1>
          <div>
            <DelUser />
          </div>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Admin;
