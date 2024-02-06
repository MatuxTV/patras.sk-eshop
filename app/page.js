import Image from "next/image";
import { getProducts } from "@/lib/directus";
import Card from "./componets/card";
import Nav from "./componets/nav";
import Head from "next/head";
import Script from "next/script";
import ProductCard from "./componets/productcard";
import { getCategory } from "@/lib/action";

const ABT = (props) => {
  return (
    <div className="flex flex-col items-center m-3 text-center w-2/3">
      <div className="bg-blue2 relative w-full h-40 rounded-xl">
        <Image className="p-8 image" src={props.type} fill alt="" />
      </div>
      <div className="flex align-center">
        <p className=" bg-white text-white1 w-full pt-6 font-plus-jakarta text-h5 mx-auto">
          {props.title}
        </p>
      </div>
    </div>
  );
};

export default async function Home() {
  const category = await getCategory()
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-center h-full">
        <div className="relative top-0 w-full h-[60vw] md:h-[100vh]">
          <Image
            src="/IMG/banner.png"
            alt="main"
            fill
            className="relative z-10"
            objectFit="contain"
            objectPosition="top"
          />

          <div className="relative">
            <Nav product={"Produkty"} />
          </div>

          <div className="relative left-[6%] w-[20vw] h-[25vw] md:w-[30vw] md:h-[35vw]">
            <Image
              src="/IMG/kavomat.png"
              alt="main"
              fill
              className="relative z-10"
              objectFit="contain"
              objectPosition="top"
            />
          </div>
          <h1 className="md:text-h1 absolute right-[5vw] top-[17vw] z-20 max-w-[13ch] ">
            Postaráme sa o váš pitný <b className="text-blue1"> REŽIM</b>
          </h1>
        </div>
      </div>
      <h1 className="font-plus-jakarta text-h5 self-center drop-shadow-md md:text-h1">
        Produkty
      </h1>
      <img
        src="/IMG/produkt-kvapky.png"
        alt=""
        className="p-0 w-28 self-center md:w-64"
      />
      <div className="flex justify-center p-4 md:p-12 space-x-4 md:space-x-12">
        {category.data?.map((item) => {
          return <ProductCard {...item} key={item.id} />;
        })}
      </div>

      <div className="m-24 mx-56 flex h-86 bg-blue1 justify-center rounded-3xl">
        <ABT
          type={"/IMG/BOTTLE.png"}
          title={"PREDAJ VOD A NEALKOHOLICKYCH NAPOJOV"}
        />
        <ABT type={"/IMG/GLASS.png"} title={"PRENAJOM PREDAJNYCH AUTOMATOV"} />
        <ABT type={"/IMG/AGREE.png"} title={"DLHOROCNE SKUSENOSTI"} />
      </div>

      <div className="flex bg-white2 w-[88%] max-w-6xl m-auto rounded-3xl justify-between md:rounded-[40px] h-24 md:h-64 max-h-64">
        <div>
          <div>
            <p className="font-plus-jakarta text-h7 text-blue1 mx-4 my-1 md:m-8 md:text-h3">
              Vedeli ste ze...?
            </p>
          </div>
          <div>
            <p className="font-plus-jakarta flex text-black2 m-3 md:m-10 md:text-h7 text-[5px]">
              Pocit smädu je reakciou organizmu na začínajúcu dehydratáciu.
              Objavuje sa až vo chvíli, keď už vaše telo stratilo viac ako 1 %
              tekutín. Mali by ste preto piť priebežne behom celého dňa, nie až
              potom, keď dostanete smäd. Dajte si pauzu a pohár vody kľudne hneď
              teraz!
            </p>
          </div>
        </div>
        <div>
          <Image
            className="object-cover flex h-full"
            src="/IMG/z_vodovac.png"
            alt="img"
            width={700}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
