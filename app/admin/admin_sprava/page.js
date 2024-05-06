"use client";
import React, { useState, useEffect } from "react";
import Nav from "@/app/componets/nav";
import Image from "next/image";
import CatDetail from "@/app/componets/category_dropdown";
import { toast } from "react-toastify";
import { updateItem } from "@directus/sdk";
import directus from "@/lib/directus";
import BackButton from "@/app/componets/back_button";

const Admin_sprava = ({ searchParams }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [products, setProducts] = useState(null);
  const [formData, setFormData] = useState({});
  const productID = searchParams.id;

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS}items/produkty/${productID}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      setProducts(data.data);
      setFormData({
        meno: data.data.meno,
        cena: data.data.cena,
        popisok: data.data.popisok,
        mnozstvo: data.data.mnozstvo,
        dostupnost: data.data.dostupnost,
        kategoria: data.data.kategoria,
      });
      setSelectedCategoryId(data.data.kategoria);
    };

    getProduct();
  }, [productID]);

  const handleCategorySelected = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = await directus.request(
        updateItem("produkty", productID, {
          meno: formData.meno,
          cena: formData.cena,
          popisok: formData.popisok,
          mnozstvo: formData.mnozstvo,
          kategoria: selectedCategoryId,
          dostupnost: formData.dostupnost,
        })
      );
      toast.success("Zmeny boli úspešne uložené");
      // window.location.reload();
    } catch (error) {
      toast.error("Nepodarilo sa uložiť zmeny");
    }
  };

  if (!products) return <div>Loading...</div>;

  return (
    <>
      <Nav product="Produkty" />
      <BackButton />
      <div className="bg-white2 flex rounded-lg m-16">
        <div className=" m-6 p-7 w-1/2 justify-center flex border-r-4 border-white1 items-center drop-shadow-lg h-[650px]">
          <Image
            className="rounded"
            src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${products.obrazok}`}
            alt={`${products.meno}`}
            objectFit="contain"
            layout="fill"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-1/2">
          <div className="text-center p-6 bg-whiteBG m-4 rounded-3xl">
            <p className="font-plus-jakarta text-h3">{products.meno}</p>
          </div>
          <div className="p-8">
            <div>
              <p className="ml-5 font-plus-jakarta">Názov produktu</p>
              <input
                className="w-full rounded-lg my-2 p-2"
                name="meno"
                value={formData.meno || ""}
                onChange={handleChange}
              />
            </div>
            <p className="ml-5 font-plus-jakarta">Cena</p>
            <input
              className="w-full rounded-lg my-2 p-2"
              name="cena"
              type="number"
              value={formData.cena || ""}
              onChange={handleChange}
            />
            <div className=" flex my-4">
              <p className=" font-plus-jakarta">Dostupnost produktu</p>
              <input
                className=" p-2"
                placeholder="Dostupnost produktu"
                type="checkbox"
                name="avaibility"
                checked={formData.dostupnost || ""}
                onChange={handleChange}
              />
            </div>

            <p className="ml-5 font-plus-jakarta">Popis produktu</p>
            <textarea
              className="w-full rounded-lg my-2 p-2"
              name="popisok"
              value={formData.popisok || ""}
              onChange={handleChange}
              cols={20}
              rows={5}
            />
            <p className="ml-5 font-plus-jakarta">
              Množstvo produktu na sklade
            </p>
            <input
              className="w-full rounded-lg my-2 p-2"
              name="mnozstvo"
              type="number"
              value={formData.mnozstvo || ""}
              onChange={handleChange}
            />
            <p className="ml-5 font-plus-jakarta">Kategoria produktu</p>
            <CatDetail onCategorySelected={handleCategorySelected} />
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex text-h4 mt-6 font-plus-jakarta bg-green rounded-lg p-2 text-white1 hover:bg-white1 hover:shadow-inner hover:text-green transition-all delay-100"
              >
                Uložiť
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin_sprava;
