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

const CartItem = ({ item }) => {
  

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
      <div className=" flex items-center">
        <p>{item.quantity}ks</p>
      </div>
      <div className="flex items-center">
        <p className="text-lg font-bold ml-4">{`${item.cena}€`}</p>
      </div>
    </div>
  );
};

const FinalPage = () => {
  const router = useRouter();
  const { cartItems , removeFromCart ,clearCart } = useCart();
  const { shippingData } = useShipping();
  const [data, setData] = useState();
  const [note, setNote] = useState();

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

    console.log(cartItems,"cartItems");

    const skladanie_produkt = cartItems.map((item) => {
      return {
        id_produkt: item.id,
        pocet_kusov: item.quantity,
      };
    });

    console.log(skladanie_produkt,"skladanie_produkt");

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
        Poznamka: note,
        cena_objednavky: total,
        nazov_spolocnosti: data?.companyName,
        ico: data?.ico,
        dic:data?.dic,
        icdph:data?.icdph
      })
    );

    skladanie_produkt.map(async(item)=>{
      await directus.request(
        createItem("skladanie_produkt", {
          id_objednavky: result.id,
          id_produkt: item.id_produkt,
          pocet_kusov: item.pocet_kusov
        })
      );
    })

    try {
      router.push("/");
      toast.success("Dakujeme za objednavku"); 
    } catch (error) {
      toast.error("Chyba v objednavke. Skontrolujte si udaje a skuste to znova"); 
    }

    console.log(result,"objednavka");

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
              <p>{data?.email}</p>
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
                    <b> ICO: </b>
                    {data?.ico}
                  </p>
                  <p>
                    <b> DIC: </b>
                    {data?.dic}
                  </p>
                  <p>
                    <b> ICDPH: </b>
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
              Poznamka k objednavke
            </h2>
            <input
              className="w-full p-2 border shadow-md "
              placeholder="Mate poznamku k objednavke?"
              pattern="\d{5}"
              type="text"
              name="note"
              value={note}
              onChange={handlePoznamka}
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
            <span className="text-lg font-bold">{`${total.toFixed(2)}€`}</span>
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
              <button
                onClick={handleCompleteOrder}
                className=" text-center bg-green text-white1 text-white p-3 rounded font-plus-jakarta hover:shadow hover:shadow-green"
              >
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
