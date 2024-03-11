"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../../../componets/nav";
import { useCart } from "../../../../lib/cart-context";
import { useShipping } from "@/lib/shipping-context";
import { createItem } from "@directus/sdk";
import directus from "@/lib/directus";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/lib/user-context";


const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
      <div className=" h-0 w-0 md:h-[80px] md:w-[80px] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${item.obrazok}`}
          alt={item.meno}
          className="rounded"
          objectFit="contain"
          layout="fill"
        />
        </div>
        <div className="ml-4">
          <p className="text-lg font-bold flex md:text-h7 text-[10px]">{item.meno}</p>
        </div>
      </div>
      <div className=" flex items-center md:text-h7 text-[10px] ">
        <p>{item.quantity}ks</p>
      </div>
      <div className="flex items-center">
        <p className="text-lg font-bold ml-4 md:text-h7 text-[10px]">{`${item.cena}€`}</p>
      </div>
    </div>
  );
};

const FinalPage = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { shippingData } = useShipping();
  const [data, setData] = useState();
  const [note, setNote] = useState("");

  const user = useUser();

  const handlePoznamka = (e) => {
    setNote(e.target.value);
  };
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("userData"));
    setData(localData);
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.cena * item.quantity,
    0
  );

  const handleCompleteOrder = async (event) => {

    const skladanie_produkt = cartItems.map((item) => {
      return {
        id_produkt: item.id,
        pocet_kusov: item.quantity,
      };
    });


    console.log(data, "data");
    const result = await directus.request(
      createItem("objednavka", {
        meno: data?.firstName,
        priezvisko: data?.lastName,
        email: data?.email,
        prefix: data?.prefix,
        tcislo: data?.phoneNumber,
        ulica: data?.street,
        mesto: data?.city,
        psc: data?.postalCode,
        poznamka: note,
        cena_objednavky: total,
        nazov_spolocnosti: data?.companyName,
        ico: data?.ico,
        dic: data?.dic,
        icdph: data?.icdph,
        user_created: user?.id,
      })
    );
    
    skladanie_produkt.map(async (item) => {
      await directus.request(
        createItem("skladanie_produkt", {
          id_objednavky: result.id,
          id_produkt: item.id_produkt,
          pocet_kusov: item.pocet_kusov,
        })
      );
    });

    try {
      router.push("/");
      toast.success("Dakujeme za objednavku");
    } catch (error) {
      toast.error(
        "Chyba v objednavke. Skontrolujte si udaje a skuste to znova"
      );
    }

    clearCart();
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
      <div className="flex justify-around mb-8 h-16 items-center bg-blue2 text-xs sm:text-sm md:text-base lg:text-h5">
        <div className="flex flex-row gap-2  items-center">
          <p className="bg-blue1 w-10 h-10 flex items-center justify-center text-center font-plus-jakarta text-white1 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16">
            1
          </p>
          <Link href={"/cart"}>
            <p className="font-plus-jakarta">Košík</p>
          </Link>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <p className="bg-blue1 w-10 h-10 flex items-center justify-center text-center font-plus-jakarta text-white1 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16">
            2
          </p>
          <Link href={"/cart/order"}>
            <p className="font-plus-jakarta">Dodacie údaje</p>
          </Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="bg-blue1 w-10 h-10 flex items-center justify-center text-center font-plus-jakarta text-white1 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16">
            3
          </p>
          <Link href={"/cart/order/shipping"}>
            <p className="font-plus-jakarta">Doprava a platba</p>
          </Link>
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-6">
        {/* O vas  */}
        <div className=" justify-center">
          <div className=" bg-white1 shadow-md  justify-center p-4 rounded-xl mb-8">
            <div>
              <p className=" text-center text-h4 font-plus-jakarta">
                Fakturačné údaje
              </p>
            </div>
            <div className=" text-center pt-4">
              <p>
                {data?.firstName} {data?.lastName}
              </p>

              <p>
                {data?.street},{data?.postalCode},{data?.city}
              </p>
              <p >{data?.email}</p>
              <p>
                {data?.prefix}
                {data?.phoneNumber}
              </p>
              {data?.companyName != "" ? (
                <div className=" my-6">
                  <p>
                    <b> Spoločnosť: </b>
                    {data?.companyName}
                  </p>
                  <p>
                    <b> IČO: </b>
                    {data?.ico}
                  </p>
                  <p>
                    <b> DIČ: </b>
                    {data?.dic}
                  </p>
                  <p>
                    <b> IČDPH: </b>
                    {data?.icdph}{" "}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" bg-blue2 p-4">
            <h2 className="text-xl mb-4 font-plus-jakarta font-bold">
              Poznámka k objednávke
            </h2>
            <input
              className="w-full p-2 border shadow-md "
              placeholder="Máte poznamku k objednávke?"
              type="text"
              name="note"
              value={note}
              onChange={handlePoznamka}
            />
          </div>
        </div>

        {/* SUM */}
        <div>
          <div className=" p-4 bg-blue2 rounded-xl mb-4">
            <p className=" text-left font-plus-jakarta m-2">PLATBA</p>
                <div className=" p-4 bg-white2 rounded-xl flex space-x-2 items-center ">
                  <div className=" bg-white1 border rounded md:px-2 font-plus-jakarta">X</div>
                  <p className=" font-plus-jakarta">Platba pri prevzatí</p>
                </div>
          </div>
          <div className=" p-4 bg-blue2 rounded-xl">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg">Celková suma</span>
            <span className="text-lg font-bold">{`${total.toFixed(2)}€`}</span>
          </div>

          <div className="block m-4 space-x-3">
            <label className=" font-plus-jakarta">
              <input type="checkbox" required /> Oboznámil som sa s obchodnými
              podmienkami
            </label>

            <label className=" font-plus-jakarta">
              <input required type="checkbox" /> Oboznámil som sa s ochranou
              osobných údajov
            </label>
          </div>

          <div className="flex justify-center">
            {cartItems.length === 0 ? (
              <></>
            ) : (
              <Link href="/cart/order/shipping">
                <button
                  onClick={handleCompleteOrder}
                  className=" text-center bg-green text-white1 text-white p-3 rounded font-plus-jakarta hover:shadow hover:shadow-green"
                >
                  Dokončit objednávku
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
