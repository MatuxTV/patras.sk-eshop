"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../../lib/cart-context"; // Adjust the import path accordingly
import Nav from "../componets/nav";

const CartItem = ({ item }) => {
  const { removeFromCart,changeQuantity } = useCart(); // Use the removeFromCart function from context
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
            {item.dostupnost ? "Na sklade" : "Nedostupné"}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e)=>{changeQuantity(item.id,e.target.value)}}
          className="w-12 text-center border rounded"
          // You would also need a function to handle quantity changes
        />
        <p className="text-lg font-bold ml-4">{`${item.cena}€`}</p>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-sm text-blue-500 hover:text-blue-700"
      >
        Odstrániť
      </button>
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
    <div>
        <Nav product={"Produkty"}/>
      <div className="m-8">
        <h1 className="text-2xl font-bold text-center mb-4">Váš Košík</h1>

        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-6 p-4 border-t">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Celková suma</span>
            <span className="text-lg font-bold">{`${total}€`}</span>
          </div>
          <button className="w-full mt-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
            Pokračovať
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
