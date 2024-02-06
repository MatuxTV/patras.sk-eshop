// use client indicates this code should run in the browser
"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../../lib/cart-context"; // Adjust the import path accordingly
import Nav from "../componets/nav";
import Link from "next/link";

const CartItem = ({ item }) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border-b bg-blue2 rounded-lg mb-5">
      <button
        onClick={() => removeFromCart(item.id)}
        className=" font-plus-jakarta"
      >
        x
      </button>
      <div className="flex items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${item.obrazok}`}
          alt={item.meno}
          width={80}
          height={80}
          className="rounded"
        />
        <div className="ml-4">
          <p className="text-h6 font-plus-jakarta">{item.meno}</p>
          <p
            className={`${item.dostupnost ? " text-blue1 font-bold" : " text-red"}`}
          >
            {item.dostupnost ? `Na sklade - ${item.mnozstvo}ks` : "Nedostupné"}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => {
            changeQuantity(item.id, e.target.value);
          }}
          className="w-10 text-center border rounded"
        />
        <p className="text-lg font-plus-jakarta font-bold ml-4">{`${item.cena}€`}</p>
      </div>
    </div>
  );
};

const Cart = () => {
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
            <p className="border w-16  text-center font-plus-jakarta text-h5 text-black1 rounded-full">
              2
            </p>
            
              <p className="font-plus-jakarta text-h5">Dodacie udaje</p>
            
          </div>

          <div className="flex flex-row gap-2">
            <p className="border w-16  text-center font-plus-jakarta text-h5 text-black1 rounded-full">
              3
            </p>
            
              <p className=" font-plus-jakarta text-h5">Doprava a platba</p>
            
          </div>
        </div>

      <div className="w-full ">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center w-full mt-6 p-4 border-t">
        <div className="self-end flex justify-between w-full">
          <span className="text-lg font-bold">Celková suma</span>
          <span className="text-lg font-bold">{`${total}€`}</span>
        </div>
        <Link href={"/cart/order"}>
          <button className="w-full mt-4 py-2 bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6">
            Pokračovať
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
