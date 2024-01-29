import React from 'react';
import Image from 'next/image';

const Card = (props) => {
  return (
    <button className="border border-black2 rounded-3xl drop-shadow-md w-80 hover:bg-blue2 p-4 md:p-8">
        <div className="flex justify-center md:h-72 h-16 ">
        <Image
            className="image"
            src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${data.obrazok}`}
            alt="Product Image"
            fill
          />
        </div>
        <h1 className="font-plus-jakarta text-center pt-9 text-{10px} md:text-h6"> {props.label}</h1>
    </button>
  );
};

export default Card;
