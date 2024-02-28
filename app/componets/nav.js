'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../lib/cart-context"; 
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
config.autoAddCss = false;

const Nav = (props) => {
  const { cartItems } = useCart(); 

  
  const cartItemCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  

  return (
    <nav className="relative items-center flex justify-between px-4 md:py-2 z-20">
      <div className="flex items-center ">
        <Link href="/">
          <div className="container relative z-20 md:m-6">
          <Image
              src="/IMG/logo.png"
              alt="patras.sk"
              width={100}
              height={100}
              objectFit="contain"
              className="transition-transform duration-300 ease-in-out transform hover:scale-105"
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
              
              <span className=" text-white1 font-plus-jakarta text-h6">
                {cartItemCount}
              </span>
            ) : (
             
              <FontAwesomeIcon icon={faShoppingCart} className="fas fa-shopping-cart" style={{ color: "white" }}/>
            )}
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
