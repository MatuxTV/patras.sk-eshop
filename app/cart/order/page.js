// Import React and necessary hooks
import React from "react";
// Import components from Next.js and Tailwind CSS
import Image from "next/image";
import Link from "next/link";

const CheckoutLayout = () => {
  // const { cartItems } = useCart();
  // const total = cartItems.reduce(
  //   (acc, item) => acc + item.cena * item.quantity,
  //   0
  // );

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="flex justify-center py-8">
        <h1 className=" text-h3 font-bold text-center mb-4 font-plus-jakarta ">
          Váš Košík
        </h1>
        {/* <div className=" bg-blue1 w-16 h-2 rounded-lg bottom-0 z-10  rotate-[-2deg] left-[180px] "> </div> */}
      </div>
      {/* Progress Bar - indicate checkout steps */}
      <div className="flex justify-around mb-8 h-16 items-center bg-blue2">

        <div className="text-center grid-flow-col grid grid-cols-2 gap-2">
          <p className=" bg-blue1 w-16  font-plus-jakarta text-h5 text-white1 rounded-full">1</p>
          <Link href={"/cart"}>
            <p className=" font-plus-jakarta text-h5">Košík</p>
          </Link>
        </div>

        <div className="text-center grid-flow-col grid grid-cols-2 gap-2">
        <p className=" bg-blue1 w-16   font-plus-jakarta text-h5 text-white1 rounded-full">2</p>
          <Link href={"/cart/order"}>
            <p className=" font-plus-jakarta text-h5">Dodacie udaje</p>
          </Link>
        </div>

        <div className="text-center grid-flow-col grid grid-cols-2 gap-2">
        <p className=" border w-16  font-plus-jakarta text-h5 text-black1 rounded-full">3</p>
          <Link href={"/cart"}>
            <p className=" font-plus-jakarta text-h5">Doprava a platba</p>
          </Link>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="flex flex-wrap md:flex-nowrap p-4">
        <div className="w-full md:w-2/3 p-4 bg-blue2">
          <form>
            <h2 className="text-xl mb-4 font-plus-jakarta">Kontaktné údaje</h2>
            <div className=" p-6 bg-white1 grid grid-cols-2 gap-4">
              <div className="mb-4">
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="Meno"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="Priezvisko"
                  type="text"
                />
              </div>
              <div className=" flex mb-4 shadow-md gap-2">
                <select className="w-1/4 p-2 border">
                  <option value="+421">+421</option>
                  <option value="+420">+420</option>
                </select>

                <input
                  className="w-3/4 p-2 border shadow-md"
                  type="tel"
                  placeholder="Tel.cislo"
                  id="telefonne_cislo"
                  pattern="\d{3}\s?\d{3}\s?\d{3}"
                />
              </div>
              <div className="mb-4 shadow-md">
                <input
                  className="w-full p-2 border"
                  placeholder="Email"
                  type="email"
                />
              </div>
            </div>

            <h2 className="text-xl mb-4 mt-8 font-plus-jakarta">
              Fakturačné údaje
            </h2>
            <div className=" p-6 bg-white1">
              <div className="mb-4 grid grid-cols-3 gap-3">
                <input
                  className="w-full p-2 border mb-4 shadow-md"
                  placeholder="Ulica"
                  type="text"
                />
                <input
                  className="w-full p-2 border mb-4 shadow-md"
                  placeholder="Mesto"
                  type="text"
                />
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="PSC"
                  pattern="\d{5}"
                  type="text"
                />
              </div>
            </div>
            {/* Other input fields */}
          </form>
          <div className="flex items-center mt-4">
            <input type="checkbox" id="sameAddress" />
            <label htmlFor="sameAddress" className="ml-2">
              Moje adresy pre doručenie a fakturáciu sú rovnaké
            </label>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4">
          <div className="flex justify-between items-center">
            <Image
              src="/path-to-your-cart-icon.png"
              width={50}
              height={50}
              alt="Košík"
            />
            <span className="text-xl">200,00€</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg">Celková suma</span>
            <span className="text-lg font-bold">200€</span>
          </div>
          {/* Button to proceed */}
          <Link href="/next-step">
            <button className="block w-full text-center bg-blue-500 text-white py-2 mt-4 rounded">
              Pokračovať
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;

// Točiť sa krokmi by sa malo dynamicky a mali by odrážať aktuálny stav procesu.
// Formulárové polia by sa mali spracovať a validovať pomocou štátu a funkcií React.
// V prípade potreby by sa mali pridať ďalšie Tailwind CSS triedy pre responzívne rozloženie.
// Odkaz na "next-step" by sa mal zameniť za skutočnú cestu v aplikácii.
