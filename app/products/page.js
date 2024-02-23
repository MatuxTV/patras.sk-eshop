import Nav from "../componets/nav";
import Product from "../componets/product";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Produkty = async ({ searchParams }) => {
  
  const category = searchParams.kategoria;

  function getProducts() {
    return fetch(
      process.env.NEXT_PUBLIC_DIRECTUS +
        `items/produkty?filter[kategoria][id][_eq]=${category}`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json());
  }
  function getCategory() {
    return fetch(
      process.env.NEXT_PUBLIC_DIRECTUS + `items/kategoria/${category}`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json());
  }
  const products = await getProducts();
  const kategoria = await getCategory();

  console.log(products);

  return (
    <div>
      <Nav product={"Produkty"} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        zIndex={1}
      />
      <div className=" md:justify-center">
        <Link href="/products-cat">
          <p className="flex text-h4 m-10 font-plus-jakarta md:text-center">
            Produkty/{kategoria.data.nazov}
          </p>
        </Link>
        <div className="flex flex-wrap m-8">
          {products.data?.map((item) => {
            return <Product {...item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Produkty;
