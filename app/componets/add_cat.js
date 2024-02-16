'use client';
import { toast } from "react-toastify";
const AddCat = (props) => {

  const handleNewCategory = async(e) => {
    e.preventDefault();

    if (!props.image) {
      toast.error("Nepridali ste obrazok");
      return;
    }

    const formData = new FormData();

    formData.append("obrazok", props.image);
    formData.append("meno", props.category.category_name);

    console.log(category);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS}items/kategoria`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/",
          },
        }
      );
      toast.success("Kategoria pridany");
      console.log(formData);
    } catch (error) {
      toast.error("Aj jaj, nieco sa nepodarilo, skuste to znova");
    }
  };

  return (
    <button
      type="submit"
      className=" mt-4 py-2 bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6"
      onClick={handleNewCategory}
    >
      Pridat kategoriu
    </button>
  );
};

export default AddCat;
