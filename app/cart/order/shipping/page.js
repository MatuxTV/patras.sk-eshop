"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../../../componets/nav";
import { useCart } from "../../../../lib/cart-context";


const CartItem = ({ item }) => {

  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${item.obrazok}`}
          alt={item.meno}
          width={80}
          height={80}
          className="rounded"
        />
        <div className="ml-4">
          <p className="text-lg font-bold">{item.meno}</p>
          <p
            className={`${item.dostupnost ? "text-green-500" : "text-red-500"}`}
          >
            {item.dostupnost ? `Na sklade - ${item.mnozstvo}ks` : "Nedostupné"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="text-lg font-bold ml-4">{`${item.cena}€`}</p>
      </div>
    </div>
  );
};

const FinalPage = () => {

  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.cena * item.quantity,
    0
  );

  return (
    <div className="container mx-auto my-8 p-4">
      <Nav />
        <div className="flex justify-center py-8">
          <h1 className=" text-h3 font-bold text-center mb-4 font-plus-jakarta ">
            Váš Košík
          </h1>
        </div>
        {/* Progress Bar */}
        <div className="flex justify-around mb-8 h-16 items-center bg-blue2">
          <div className="flex flex-row gap-2">
            <p className="bg-blue1 w-16 text-center font-plus-jakarta text-h5 text-white1 rounded-full">
              1
            </p>
            <Link href={"/cart"}>
              <p className="font-plus-jakarta text-h5">Košík</p>
            </Link>
          </div>

          <div className="flex flex-row gap-2">
            <p className="bg-blue1 w-16 text-center  font-plus-jakarta text-h5 text-white1 rounded-full">
              2
            </p>
            <Link href={"/cart/order"}>
              <p className="font-plus-jakarta text-h5">Dodacie udaje</p>
            </Link>
          </div>

          <div className="flex flex-row gap-2">
            <p className="border w-16  text-center font-plus-jakarta text-h5 text-black1 rounded-full">
              3
            </p>
            <Link href={"/cart"}>
              <p className=" font-plus-jakarta text-h5">Doprava a platba</p>
            </Link>
          </div>
        </div>





        <div className="flex flex-wrap p-4">
          <div className="w-full  p-4 bg-blue2">
            {/* SUM */}
            <div className="w-full md:w-1/3 bg-gray-100 p-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg">Celková suma</span>
                <span className="text-lg font-bold">{`${total}€`}</span>
              </div>

              <Link href="/cart/order/shipping">
                <button className="block w-full text-center bg-blue-500 text-white py-2 mt-4 rounded">
                  Pokračovať
                </button>
              </Link>
            </div>
          </div>
        </div>




      </div>
   
  );
};

export default FinalPage;

// Točiť sa krokmi by sa malo dynamicky a mali by odrážať aktuálny stav procesu.
// Formulárové polia by sa mali spracovať a validovať pomocou štátu a funkcií React.
// V prípade potreby by sa mali pridať ďalšie Tailwind CSS triedy pre responzívne rozloženie.
// Odkaz na "next-step" by sa mal zameniť za skutočnú cestu v aplikácii.
