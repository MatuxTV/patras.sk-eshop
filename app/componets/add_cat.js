'use client';

import { toast } from "react-toastify";

const AddCat = ({ category, image }) => {
  const handleNewCategory = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Nepridali ste obrázok");
      return;
    }

    if (!category.category_name) {
      toast.error("Nepridali ste názov kategórie");
      return;
    }

    try {
      const toBase64Array = (file) =>
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

      const imageData = await toBase64Array(image);

      const payload = {
        nazov: category.category_name,
        obrazok: imageData,
      };

      const res = await fetch("/api/post-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Kategória sa nepodarilo pridať");

      toast.success("Kategória pridaná");
    } catch (error) {
      console.error(error);
      toast.error("Aj jaj, niečo sa nepodarilo, skúste to znova");
    }
  };

  return (
    <button
      type="submit"
      className="bg-white2 text-white font-bold border-2 rounded-lg hover:bg-blue2 p-6 transform transition-all delay-50 hover:scale-110"
      onClick={handleNewCategory}
    >
      Pridať kategóriu
    </button>
  );
};

export default AddCat;