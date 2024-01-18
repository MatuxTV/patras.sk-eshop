"use client";
import React from "react";
import { useCart } from "../../lib/cart-context"; // Import the hook
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <i className="fa-solid fa-cart-arrow-down text-white1 m-2" />
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
