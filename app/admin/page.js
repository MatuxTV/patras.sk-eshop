"use client";
import { toast } from "react-toastify";
import Nav from "../componets/nav";
import { useEffect, useState } from "react";
import CatDetail from "../componets/category_dropdown";
import OrderList from "../componets/orders";
import SignOutButton from "../componets/signOutButton";


const Admin = () => {
  const [image, setImage] = useState(null);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const formData = new FormData();

  formData.append("file", image);

  const handleNewProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Nepridali ste obrazok");
      return;
    }

    const formData = new FormData();

    formData.append("obrazok", image);
    formData.append("meno", product.product_name);
    formData.append("popisok", product.description);
    formData.append("cena", product.price);
    formData.append("dostupnost", product.avaibility);
    formData.append("mnozstvo", product.quantity);

    console.log(product);
    console.log(formData.getAll());

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS}items/produkty`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/",
          },
        }
      );
      toast.success("Produkt pridany");
      console.log(formData);
    } catch (error) {
      toast.error("Aj jaj, nieco sa nepodarilo, skuste to znova");
    }
  };

  const handleNewCategory = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Nepridali ste obrazok");
      return;
    }

    const formData = new FormData();

    formData.append("obrazok", image);
    formData.append("meno", product.category_name);

    console.log(category);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS}items/kategoria`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/",
          },
        }
      );
      toast.success("Kategoria pridany");
      console.log(formData);
    } catch (error) {
      toast.error("Aj jaj, nieco sa nepodarilo, skuste to znova");
    }
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
              onChange={handleChange}
            />
            <div>
              <p className=" font-plus-jakarta">Obrazok produktu</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <input
              className="w-full p-2  shadow-md"
              placeholder="Popis produktu"
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
            <input
              className="w-full p-2  shadow-md"
              placeholder="Cena produktu"
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            <div>
              <p>Dostupnost produktu</p>
              <input
                className=" p-2 shadow-md"
                placeholder="Cena produktu"
                type="checkbox"
                name="avaibility"
                value={product.avaibility}
                onChange={handleChange}
              />
            </div>

            <input
              className="w-full p-2  shadow-md"
              placeholder="Mnozstvo produktu na sklade"
              type=""
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
            <div>
              <p>Kategoria produktu</p>
              <CatDetail />
            </div>

            <button
              type="submit"
              className=" mt-4 py-2 bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6"
              onClick={handleNewProduct}
            >
              Pridat produkt
            </button>
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
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
            />
            <div>
              <p className=" font-plus-jakarta">Obrazok kategorie</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <button
              type="submit"
              className=" mt-4 py-2 bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6"
              onClick={handleNewCategory}
            >
              Pridat kategoriu
            </button>
          </div>
        </div>

        {/* {Zobrazenie objednavok} */}
        <div className=" mt-10  justify-center ">
          <h1 className=" text-center text-h5 font-plus-jakarta">Objednavky</h1>
          <div className=" justify-center">
            <OrderList/>
          </div>
        </div>
        {/* <SignOutButton /> */}
      </div>
    </div>
  );
};

export default Admin;
