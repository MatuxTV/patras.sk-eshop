"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../../../componets/nav";
import { useCart } from "../../../../lib/cart-context";
import { useShipping } from "@/lib/shipping-context";

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
  const { shippingData } = useShipping();
  const [data, setData] = useState();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("userData"));
    setData(localData);
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.cena * item.quantity,
    0
  );



  const handleCompleteOrder = () => {

  };

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
          <p className="bg-blue1 w-16 text-center  font-plus-jakarta text-h5 text-white1 rounded-full">
            3
          </p>
          <Link href={"/cart"}>
            <p className=" font-plus-jakarta text-h5">Doprava a platba</p>
          </Link>
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-6">
        {/* O vas  */}
        <div className=" justify-center">
          <div className=" bg-white1  justify-center p-4 rounded-xl mb-8">
            <div>
              <p className=" text-center text-h4 font-plus-jakarta">
                Fakturacne udaje
              </p>
            </div>
            <div className=" text-center pt-4">
              <p>
                {data?.firstName},{data?.lastName}
              </p>

              <p>
                {data?.street},{data?.postalCode},{data?.city}
              </p>
              <p>
                {data?.prefix}
                {data?.phoneNumber}
              </p>
            </div>
          </div>
          <div className=" bg-blue2 p-4">
            <h2 className="text-xl mb-4 font-plus-jakarta font-bold">
              Poznamka k objednavke
            </h2>
            <input
              className="w-full p-2 border shadow-md "
              placeholder="Mate poznamku k objednavke?"
              pattern="\d{5}"
              type="text"
              name="note"
            />
          </div>
        </div>

        {/* SUM */}
        <div>
          <div className=" p-4 bg-blue2 rounded-xl">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg">Celková suma</span>
            <span className="text-lg font-bold">{`${total}€`}</span>
          </div>

          <div className="block m-4">
            <label className=" font-plus-jakarta">
              <input type="checkbox" required /> Oboznámil som sa s Obchodné
              podmienky
            </label>

            <label className=" font-plus-jakarta">
              <input required type="checkbox" /> Oboznámil som sa s ochrana
              osobných údajov
            </label>
          </div>

          <div className="flex justify-center">
            <Link href="/cart/order/shipping">
              <button onClick={handleCompleteOrder} className=" text-center bg-green text-white1 text-white p-3 rounded font-plus-jakarta hover:shadow hover:shadow-green">
                Dokoncit objednavku
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
