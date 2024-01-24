// use client indicates this code should run in the browser
"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../../lib/cart-context"; // Adjust the import path accordingly
import Nav from "../componets/nav";
import Link from "next/link";

const CartItem = ({ item }) => {
  const { removeFromCart, changeQuantity } = useCart(); // Use the removeFromCart function from context

  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-600 hover:text-red-800"
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
          <p className="text-lg font-bold">{item.meno}</p>
          <p
            className={`${item.dostupnost ? "text-green-500" : "text-red-500"}`}
          >
            {item.dostupnost ? `Na sklade - ${item.mnozstvo}ks` : "Nedostupné"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => {
            changeQuantity(item.id, e.target.value);
          }}
          className="w-12 text-center border rounded"
        />
        <p className="text-lg font-bold ml-4">{`${item.cena}€`}</p>
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
    <div className="container mx-auto my-8">
      <Nav product={"Produkty"} />
      <div className="flex flex-col items-center">
        <div className="flex">
          <h1 className=" text-h3 font-bold text-center my-4 font-plus-jakarta ">
            Váš Košík
          </h1>
          <div className=" bg-blue1 w-16 h-2 rounded-lg bottom-0 z-10  rotate-[-2deg] left-[180px] "> </div>
        </div>

        <div className="w-full">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="flex flex-col items-center w-full mt-6 p-4 border-t">
          <div className="self-end flex justify-between w-full">
            <span className="text-lg font-bold">Celková suma</span>
            <span className="text-lg font-bold">{`${total}€`}</span>
          </div>
          <Link href={"/"}>
          <button className="w-full mt-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
            Pokračovať
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
