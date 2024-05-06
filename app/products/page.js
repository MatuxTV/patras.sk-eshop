import Nav from "../componets/nav";
import Product from "../componets/product";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export const Produkty = async ({ searchParams }) => {

  let data = await getServerSession(options);
  let user = data?.user;
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

  return (
    <div>
      <Nav product={"Produkty"} />
      <div className=" md:justify-center">
        <Link href="/products-cat">
          <p className="flex justify-center md:justify-start text-h4 m-10 font-plus-jakarta text-center">
            Produkty/{kategoria.data.nazov}
          </p>
        </Link>
        <div className="flex flex-wrap m-8 md:justify-start justify-center">
          {products.data?.map((item) => {
            return <Product {...item} key={item.id} data={item} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default Produkty;
