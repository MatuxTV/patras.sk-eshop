'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../lib/cart-context"; // Import the hook

const Nav = (props) => {
  const { cartItems } = useCart(); // Get cart items from the cart context

  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="relative items-center flex justify-between px-4 md:py-2 z-20">
      <div className="flex items-center ">
        <Link href="/">
          <div className="container relative z-20 md:m-6">
            <Image
              className="z-20 md:m-6"
              src="/IMG/logo.png"
              alt="patras.sk"
              sizes="30vw"
              width={150}
              height={150}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Link>
      </div>
      <div className="flex items-center m-4,5">
        <ul className="flex ml-auto">
          <li className="m-4 md:m-5 font-plus-jakarta">
            <Link
              href="/products-cat"
              className="no-underline text-black1 text-h7 md:text-h6"
            >
              {props.product}
            </Link>
          </li>
        </ul>
        <Link href="/cart" className="ml-auto relative">
        <button
            type="button"
            className="bg-blue1 w-24 h-12 rounded-lg hover:bg-blue2 hover:drop-shadow-md shadow flex items-center justify-center"
          >
            {cartItemCount > 0 ? (
              // Show the number of items in the cart
              <span className="">
                {cartItemCount}
              </span>
            ) : (
              // Show the cart icon when the cart is empty
              <i className="fas fa-shopping-cart text-white1" />
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
