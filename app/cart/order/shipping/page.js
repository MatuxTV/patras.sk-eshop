"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Nav from "../../../componets/nav";
import { useCart } from "../../../../lib/cart-context";
import { toast } from "react-toastify";
import { useUser } from "@/lib/user-context";
import { useRouter } from "next/navigation";

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <div className=" h-0 w-0 md:h-[80px] md:w-[80px] relative">
          {item.obrazok && (
            <Image
              src={item.obrazok}
              alt={item.nazov || "Product"}
              className="rounded"
              objectFit="contain"
              layout="fill"
            />
          )}
        </div>
        <div className="ml-4">
          <p className="text-lg font-bold flex md:text-h7 text-[10px]">
            {item.meno}
          </p>
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
  const { cartItems, clearCart } = useCart();
  const [note, setNote] = useState("");
  const user = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.cena * item.quantity,
    0,
  );

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("userData"));
    setUserData(localData);
  }, []);

  const handleCompleteOrder = async (event) => {
    event.preventDefault();
    if (!userData) return;

    setLoading(true);

    const fakturacneUdaje = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      prefix: userData.prefix,
      phoneNumber: userData.phoneNumber,
      street: userData.street,
      city: userData.city,
      postalCode: userData.postalCode,
      companyName: userData.companyName,
      ico: userData.ico,
      dic: userData.dic,
      icdph: userData.icdph,
    };

    const payload = {
      cartItems,
      user,
      note,
      total,
      fakturacneUdaje,
    };

    try {
      const res = await fetch("/api/complete-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Chyba pri odoslaní objednávky");

      const result = await res.json();

      toast.success("Objednávka bola úspešná");
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "customer",
          email: userData.email,
        }),
      });

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "owner",
        }),
      });
      router.push("/");
      clearCart();
    } catch (error) {
      toast.error("Objednávku sa nepodarilo dokončiť.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <Nav />
      <div className="flex justify-center py-8">
        <h1 className=" text-h3 font-bold text-center mb-4 font-plus-jakarta ">
          Váš Košík
        </h1>
      </div>

      <div className=" grid grid-cols-2 gap-6">
        <div className=" justify-center">
          <div className=" bg-white1 shadow-md  justify-center p-4 rounded-xl mb-8">
            <div>
              <p className=" text-center text-h4 font-plus-jakarta">
                Fakturačné údaje
              </p>
            </div>
            <div className=" text-center pt-4">
              {userData && (
                <>
                  <p>
                    {userData.firstName} {userData.lastName}
                  </p>
                  <p>
                    {userData.street},{userData.postalCode},{userData.city}
                  </p>
                  <p>{userData.email}</p>
                  <p>
                    {userData.prefix}
                    {userData.phoneNumber}
                  </p>
                  {userData.companyName && (
                    <div className=" my-6">
                      <p>
                        <b> Spoločnosť: </b>
                        {userData.companyName}
                      </p>
                      <p>
                        <b> IČO: </b>
                        {userData.ico}
                      </p>
                      <p>
                        <b> DIČ: </b>
                        {userData.dic}
                      </p>
                      <p>
                        <b> IČDPH: </b>
                        {userData.icdph}
                      </p>
                    </div>
                  )}
                </>
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
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className=" p-4 bg-blue2 rounded-xl mb-4">
            <p className=" text-left font-plus-jakarta m-2">PLATBA</p>
            <div className=" p-4 bg-white2 rounded-xl flex space-x-2 items-center ">
              <div className=" bg-white1 border rounded md:px-2 font-plus-jakarta">
                X
              </div>
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
              <input type="checkbox" /> Oboznámil som sa s obchodnými
              podmienkami
            </label>
            <label className=" font-plus-jakarta">
              <input type="checkbox" /> Oboznámil som sa s ochranou osobných
              údajov
            </label>
          </div>

          <div className="flex justify-center">
            {cartItems.length === 0 ? null : (
              <button
                onClick={handleCompleteOrder}
                disabled={loading}
                className="text-center bg-green text-white1 text-white p-3 rounded font-plus-jakarta hover:shadow-[0_0_2px_#000,inset_0_0_2px_#000,0_0_5px_#00ff00,0_0_15px_#00ff00,0_0_30px_#00ff00] hover:z-10 transition-all duration-300"
              >
                {loading ? "Odosielanie..." : "Dokončiť objednávku"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
