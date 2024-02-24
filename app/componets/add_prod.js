import { toast } from "react-toastify";
import directus from "@/lib/directus";
import { createItem, uploadFiles } from "@directus/sdk";

const AddProduct = (props) => {
  const handleNewProduct = async (e) => {
    e.preventDefault();

    if (!props.image) {
      toast.error("Nepridali ste obrazok");
      return;
    }

    if (!props.product.product_name) {
      toast.error("Nepridali ste nazov produktu");
      return;
    }

    try {
      //Upload Obrazok
      const imageFile = new FormData();
      imageFile.append('file', props.image);

      const fileResponse = await directus.request(uploadFiles(imageFile));

      //Upload Produkt
      const productData = {
        meno: props.product.product_name,
        popisok: props.product.description,
        cena: props.product.price,
        dostupnost: props.product.avaibility,
        mnozstvo: props.product.quantity,
        obrazok: fileResponse.id,
        kategoria: props.product.category,
      };

      const productResponse = await directus.request(createItem('produkty', productData));
      if (productResponse) {
        toast.success("Produkt pridany");
      }
    } catch (error) {
      console.error(error);
      toast.error("Aj jaj, nieco sa nepodarilo, skuste to znova");
    }
  };

  return (
    <button
      type="submit"
      className="  bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6"
      onClick={handleNewProduct}
    >
      Pridat produkt
    </button>
  );
};

export default AddProduct;
