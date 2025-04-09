import Nav from "../componets/nav";
import Product from "../componets/product";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import pool from "@/app/api/postgresql"; // správne importuj cestu

export const Produkty = async ({ searchParams }) => {

  let data = await getServerSession(options);
  let user = data?.user;
  const category = searchParams.kategoria;

  async function getProducts(categoryId) {
    const query = `
      SELECT * 
      FROM "Produkty"
      WHERE "kategoria" = ${categoryId};
    `;
  
    try {
      const res = await pool.query(query); 
      return res.rows; 
    } catch (error) {
      console.error("Chyba pri získavaní produktov: ", error);
      throw error;
    }
  }
  
  // Získanie kategórie podľa jej ID
  async function getCategory(categoryId) {
    const query = `
      SELECT * 
      FROM "Kategoria"
      WHERE "id" = ${categoryId};
    `;
  
    try {
      const res = await pool.query(query); 
      return res.rows[0];
    } catch (error) {
      console.error("Chyba pri získavaní kategórie: ", error);
      throw error;
    }
  }
  const products = await getProducts(category);
  const kategoria = await getCategory(category);

  return (
    <div>
      <Nav product={"Produkty"} />
      <div className=" md:justify-center">
        <Link href="/products-cat">
          <p className="flex justify-center md:justify-start text-h4 m-10 font-plus-jakarta text-center">
            Produkty/{kategoria.nazov}
          </p>
        </Link>
        <div className="flex flex-wrap m-8 md:justify-start justify-center">
          {products?.map((item) => {
            return <Product {...item} key={item.id} data={item} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Produkty;
