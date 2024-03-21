'use client';
import { toast } from "react-toastify";
import directus from "@/lib/directus";
import { createItem, uploadFiles,updateFile } from "@directus/sdk";
import { getSession } from "next-auth/react";

const AddCat = (props) => {

  const handleNewCategory = async(e) => {
    e.preventDefault();

    if (!props.image) {
      toast.error("Nepridali ste obrazok");
      return;
    }

    try {
      const imageFile = new FormData();
      imageFile.append('file', props.image);

      const fileResponse = await directus.request(uploadFiles(imageFile));
   

      // const updateImage = await directus.request(
      //   updateFile(imageFile.id, {
      //     folder: '2f49eb52-c2f5-4795-b85a-c5be5c62dde9',
      //   })
      // );
      
      //Upload Produkt
      const categoryData = {
        nazov: props.category.category_name,
        obrazok: fileResponse.id,
      };

      const productResponse = await directus.request(createItem('kategoria', categoryData));
      if (productResponse) {
        toast.success("Kategoria pridana");
      }
    } catch (error) {
      toast.error("Aj jaj, nieco sa nepodarilo, skuste to znova");
    }
  };

  return (
    <button
      type="submit"
      className=" bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6"
      onClick={handleNewCategory}
    >
      Pridat kategoriu
    </button>
  );
};

export default AddCat;
