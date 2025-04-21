import React from "react";
import Nav from "../componets/nav";
import ProductCard from "../componets/productcard";
import { getProducts } from "@/lib/directus";
import pool from "@/app/api/postgresql"; 

export const Produkty = async () => {
  
  const res = await pool.query('SELECT * FROM "Kategoria"');
  const data = res.rows;


  return (
    <div>
      <Nav />
      <div className="flex justify-center flex-col">
        <div className="w-full justify-center flex">
          <h1 className="flex font-plus-jakarta text-h5 m-12 md:text-h2 ">
            Produkty
          </h1>
        </div>
        <div className="flex  flex-wrap p-4 justify-center md:justify-start m-8 md:m-16">
          {data?.map((item) => {
            return<ProductCard {...item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Produkty;
