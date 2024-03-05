import Image from "next/image";
import Link from "next/link";
import ToCart from "../componets/tocart"; 

export default function ProductCard( data ) {
  const available = data.dostupnost; 
  console.data(data);

  return (
    <div>
      <Link href={`/products-info?id=${data.id}`} passHref>
        <div className="bg-white2 w-64 h-[330px] md:w-[310px] md:h-[400px] m-5 mt-8 flex flex-col border-2 items-center border-white2 rounded-2xl hover:bg-blue2 shadow-lg">
          <div className="justify-center item-center border-1 border-black2 border-opacity-1 h-56 w-56 relative m-6 border-2 rounded-lg bg-white2">
            <Image
              className="image"
              src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${data.obrazok}`}
              alt="Product Image"
              fill
            />
          </div>
          <div className="w-full font-plus-jakarta text-h5 relative">
            <p className="text-center relative z-20 m-2 text-h6">{data.meno}</p>
            <div className="w-full rounded-xl bg-blue1 h-1" />
            <div className="flex flex-row font-plus-jakarta h-16 items-center drop-shadow-xl justify-between">
              <p className="m-6 md:text-h5 text-h6">{data.cena}€</p>
              <div className="drop-shadow-md m-4">
                {available ? <ToCart product={data}/> : ""}
              </div>
            </div>
            <p className={`${available ? "text-blue1 text-h6" : "text-red text-h6"} text-center`}>
              {available ? `Na sklade - ${data.mnozstvo}ks` : "Nedostupne"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
