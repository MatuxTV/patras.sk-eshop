"use client";
import React from "react";
import { useCart } from "../../lib/cart-context"; // Import the hook
import { toast } from "react-toastify";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
config.autoAddCss = false;

const ToCart = ({ product }) => {
  const { addToCart } = useCart(); 

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      addToCart(product);
      toast.success("Produkt bol pridaný do košíka!"); // Zobrazenie úspešného toastu
    } catch (error) {
      toast.error("Nepodarilo sa pridať produkt do košíka."); // Zobrazenie chybového toastu
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="bg-blue1 rounded-md hover:shadow px-3 py-2"
      >
        <div className="flex flex-row items-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="fas fa-shopping-cart pr-2 w-5 h-5"
              style={{ color: "white" }}
            />
          <div>
            <p className="text-white1 text-[0.8rem] md:text-[1rem] font-plus-jakarta">Do Kosiku</p>
          </div>
        </div>
      </button>
    </div>
  );
};
export default ToCart;
