import React from "react";
import Nav from "../componets/nav";
import ProductCard from "../componets/productcard";
import { getProducts } from "@/lib/directus";
import directus from "/lib/directus";
import { readItems } from "@directus/sdk";

export const Produkty = async () => {
  
  function getProducts() {
    return fetch(process.env.NEXT_PUBLIC_DIRECTUS + "items/kategoria",{ cache: "no-store" }).then(
      (res) => res.json(),
    );
  }
  async function fetchData() {
    const data = await getProducts();
    return data;
  }
  const res = await fetchData();
  const data = res.data;

  return (
    <div>
      <Nav />
      <div className="flex justify-center flex-col">
        <div className="w-full justify-center flex">
          <h1 className="flex font-plus-jakarta text-h5 m-12 md:text-h2 ">
            Produkty
          </h1>
        </div>
        <div className="flex  flex-wrap p-4 justify-between m-16">
          {data?.map((item) => {
            return<ProductCard {...item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Produkty;
