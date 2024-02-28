import Image from "next/image";
import Link from "next/link";

export default function ProductCard( data ) {
  return (
    <Link href={`/products?kategoria=${data.id}`}>
      <div className="bg-white1 w-64 md:w-96 md:h-[400px] border-2 mt-2 m-5 border-white2 rounded-2xl hover:bg-blue2">
        <div className="justify-center h-72 w-full relative my-5">
        <Image
          className="image"
          src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${data.obrazok}`}
          alt="Product Image"
          fill
        />
        </div>
        <div className="w-full text-h5 relative">
          <p className="text-center relative z-20 font-plus-jakarta">
            {data.nazov}
          </p>
          <div className="md:bg-blue1 md:w-16 md:h-2 md:absolute md:rounded-lg md:bottom-0 z-10 rotate-[-2deg] left-[180px]"></div>
        </div>
      </div>
    </Link>
  );
}
