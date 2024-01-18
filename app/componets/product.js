import Image from "next/image";
import ToCart from "../componets/tocart";

export default function Product(data) {
  const available = data.dostupnost;

  return (
    <div>
      <a className="bg-white2 md:w-96 md:h-[400px] flex flex-col border-2 items-center border-white2 rounded-2xl hover:bg-blue2 shadow-lg " href={`/products-info?id=${data.id}`}>
        <div className="justify-center item-center border-1 border-black2 border-opacity-1 h-56 w-56 relative m-6 border-2 rounded-lg  bg-white2">
          <Image
            className="image"
            src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${data.obrazok}`}
            alt="Product Image"
            fill
          />
        </div>
        <div className=" w-full font-plus-jakarta text-h5 relative">
          <p className=" text-center relative z-20 m-2 text-h6">{data.meno}</p>
          <div className="w-full rounded-xl bg-blue1 h-1" />
          <div className="flex flex-row font-plus-jakarta h-16 items-center drop-shadow-xl justify-between">
            <p className="m-6">{data.cena}€</p>
            <div className="drop-shadow-md m-4">
              <ToCart product={data}/>
            </div>
          </div>
          <p className={`${available ? "text-blue1 text-h6" : "text-red text-h6"} text-center `} >
            {available ? "Skladom" : "Nedostupne"}
          </p>
        </div>
      </a>
    </div>
  );
}
