"use client";
import React from "react";
import { useCart } from "../../lib/cart-context"; // Import the hook
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
config.autoAddCss = false;

const ToCart = ({ product }) => {
  const { addToCart } = useCart(); // Use the hook

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
        className="bg-blue1 rounded-md hover:shadow"
      >
        <div className="flex flex-row items-center">
          <div className="flex">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="fas fa-shopping-cart"
              style={{ color: "white" }}
            />
          </div>
          <div>
            <p className="text-white1 text-h6 font-plus-jakarta">Do Kosiku</p>
          </div>
        </div>
      </button>
    </div>
  );
};
export default ToCart;
