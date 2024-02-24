import Nav from "../componets/nav";
import Link from "next/link";
import Image from "next/image";
import ToCart from "../componets/tocart";
import BackButton from "../componets/back_button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Produkt = async ({ searchParams }) => {
  const productID = searchParams.id;

  function getProduct() {
    return fetch(
      `${process.env.NEXT_PUBLIC_DIRECTUS}items/produkty/${productID}`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json());
  }

  const produkt = await getProduct();

  return (
    <div>
      <Nav product={"Produkty"} />
      <BackButton />
      <div className="flex flex-col md:flex-row">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          zIndex={1}
        />
        <div className="flex justify-center items-center drop-shadow-lg w-1/2 shadow-lg m-7 h-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${produkt.data.obrazok}`}
            alt={produkt.data.meno}
            width={400}
            height={350}
            layout="intrinsic" // Toto zachová pôvodné proporcie obrázku, ale nechá ho prispôsobiť šírke kontajnera
            objectFit="contain" // Zabránime, aby obrázok prekročil kontajner a bol v ňom celý viditeľný
          />
        </div>
        <div className="md:w-1/2 m-5">
          <h1 className="text-h3 font-plus-jakarta py-8">
            {produkt.data.meno}
          </h1>
          <p className="text-left py-5 font-plus-jakarta">
            {produkt.data.popisok}
          </p>
          <p className="text-h4 font-plus-jakarta py-5">{produkt.data.cena}€</p>
          <div className="align-middle py-5">
            {produkt.data.dostupnost ? <ToCart product={produkt.data} /> : ""}
          </div>
          <p
            className={`${
              produkt.data.dostupnost
                ? "text-blue1 text-h6"
                : "text-red text-h6"
            } py-8 font-plus-jakarta`}
          >
            {produkt.data.dostupnost
              ? `Na sklade - ${produkt.data.mnozstvo}ks`
              : "Nedostupne"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Produkt;
