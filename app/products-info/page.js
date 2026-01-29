import Nav from "../componets/nav";
import Image from "next/image";
import ToCart from "../componets/tocart";
import BackButton from "../componets/back_button";
import pool from "@/app/api/postgresql";

const Produkt = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  const productID = resolvedParams.id;

  async function getProduct() {
    try {
      const res = await pool.query('SELECT * FROM "Produkty" WHERE "id" = $1', [
        productID,
      ]);
      return res.rows[0];
    } catch (error) {
      console.error("Chyba pri získavaní produktu: ", error);
      throw error;
    }
  }
  const produkt = await getProduct();

  // Convert image to base64 string for client components
  const obrazok = produkt.obrazok
    ? `data:image/jpeg;base64,${Buffer.from(produkt.obrazok).toString("base64")}`
    : null;

  // Serialize product for client component (ToCart)
  const serializedProdukt = {
    ...produkt,
    obrazok: obrazok,
  };

  return (
    <div>
      <Nav product={"Produkty"} />
      <BackButton />
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex md:w-1/2 md:h-[450px] justify-center items-center drop-shadow-lg w-full h-[300px] md:m-7">
          <Image
            src={obrazok}
            alt={produkt.nazov}
            className="rounded"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <div className="md:w-1/2 m-5">
          <h1 className="text-h3 font-plus-jakarta py-8 md:text-start text-center">
            {produkt.nazov}
          </h1>
          <p className="text-left py-5 font-plus-jakarta">{produkt.popis}</p>
          <p className="text-h4 font-plus-jakarta py-5 text-center md:text-start">
            {produkt.cena}€
          </p>
          <div className="align-middle py-5  text-center md:text-start">
            {produkt.dostupnost ? <ToCart product={serializedProdukt} /> : ""}
          </div>
          <p
            className={`text-h6 text-center md:text-start py-8 font-plus-jakarta ${produkt.dostupnost ? "text-blue1" : "text-red"}`}
          >
            {produkt.mnozstvo > 0 && produkt.dostupnost
              ? `Na sklade - ${produkt.mnozstvo}ks`
              : "Nedostupne"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Produkt;
