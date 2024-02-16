'use client';
import { toast } from "react-toastify";

const AddProduct = (props) => {

  const handleNewProduct = async(e) => {
    e.preventDefault();

    if (!props.image) {
      toast.error("Nepridali ste obrazok");
      return;
    }

    const formData = new FormData();

    formData.append("obrazok", props.image);
    formData.append("meno", props.product.product_name);
    formData.append("popisok", props.product.description);
    formData.append("cena", props.product.price);
    formData.append("dostupnost", props.product.avaibility);
    formData.append("mnozstvo", props.product.quantity);
    

    console.log(props.product);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS}items/produkty`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/",
          },
        }
      );
      toast.success("Produkt pridany");
      console.log(formData);
    } catch (error) {
      toast.error("Aj jaj, nieco sa nepodarilo, skuste to znova");
    }
  };

  return (
    <button
      type="submit"
      className=" mt-4 py-2 bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6"
      onClick={handleNewProduct}
    >
      Pridat produkt
    </button>
  );
};

export default AddProduct;
