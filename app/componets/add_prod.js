"use client";

import { toast } from "react-toastify";

const AddProduct = ({ product, image }) => {
  const handleNewProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Nepridali ste obrázok");
      return;
    }

    if (!product.product_name) {
      toast.error("Nepridali ste názov produktu");
      return;
    }

    if (product.category === "" || product.category == null) {
      toast.error("Nepridali ste kategóriu produktu");
      return;
    }
    
    if (!product.price || product.price <= 0) {
      toast.error("Cena musí byť väčšia ako 0");
      return;
    }

    try {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = () => {
            const arrayBuffer = reader.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            resolve(Array.from(uint8Array));
          };
          reader.onerror = (error) => reject(error);
        });

      const imageData = await toBase64(image);

      // 2. Posielame fetch s produktom a obrázkom
      const payload = {
        nazov: product.product_name,
        popis: product.description,
        cena: product.price,
        dostupnost: product.avaibility,
        mnozstvo: product.quantity,
        obrazok: imageData, // obrázok ako base64 string
        kategoria: product.category,
      };

      const res = await fetch("/api/post-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Produkt sa nepodarilo pridať");

      toast.success("Produkt pridaný");
    } catch (error) {
      console.error(error);
      toast.error("Aj jaj, niečo sa nepodarilo, skúste to znova");
    }
  };

  return (
    <button
      type="submit"
      className="bg-white2 text-white font-bold border-2 rounded-lg hover:bg-blue2 p-6 transform transition-all delay-50 hover:scale-110"
      onClick={handleNewProduct}
    >
      Pridať produkt
    </button>
  );
};

export default AddProduct;