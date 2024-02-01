"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../../lib/cart-context";
import { ShippingProvider } from "@/lib/shipping-context";
import { useShipping } from "@/lib/shipping-context";
import Nav from "../../componets/nav";

const CartItem = ({ item }) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${item.obrazok}`}
          alt={item.meno}
          width={80}
          height={80}
          className="rounded"
        />
        <div className="ml-4">
          <p className="text-lg font-bold">{item.meno}</p>
          <p
            className={`${item.dostupnost ? "text-green-500" : "text-red-500"}`}
          >
            {item.dostupnost ? `Na sklade - ${item.mnozstvo}ks` : "Nedostupné"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="text-lg font-bold ml-4">{`${item.cena}€`}</p>
      </div>
    </div>
  );
};

const CheckoutLayout = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.cena * item.quantity,
    0
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [ICO, setICO] = useState("");
  const [DIC, setDIC] = useState("");
  const [ICDPH, setICDPH] = useState("");

  const { updateShippingData } = useShipping();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(updateShippingData)
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      address: {
        street,
        city,
        postalCode,
      },
      company: {
        companyName,
        ico,
        dic,
        icdph,
      },
    };

    updateShippingData(formData); // Odosielanie dat do shipping-conteext
  };
  const [showCompanyFields, setShowCompanyFields] = useState(false);

  const handleCheckboxChange = (e) => {
    setShowCompanyFields(e.target.checked);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <Nav/>
      <div className="flex justify-center py-8">
        <h1 className=" text-h3 font-bold text-center mb-4 font-plus-jakarta ">
          Váš Košík
        </h1>
      </div>
      {/* Progress Bar */}
      <div className="flex justify-around mb-8 h-16 items-center bg-blue2">
          <div className="flex flex-row gap-2">
            <p className="bg-blue1 w-16 text-center font-plus-jakarta text-h5 text-white1 rounded-full">
              1
            </p>
            <Link href={"/cart"}>
              <p className="font-plus-jakarta text-h5">Košík</p>
            </Link>
          </div>

          <div className="flex flex-row gap-2">
            <p className="bg-blue1 w-16 text-center  font-plus-jakarta text-h5 text-white1 rounded-full">
              2
            </p>
            <Link href={"/cart/order"}>
              <p className="font-plus-jakarta text-h5">Dodacie udaje</p>
            </Link>
          </div>

          <div className="flex flex-row gap-2">
            <p className="border w-16  text-center font-plus-jakarta text-h5 text-black1 rounded-full">
              3
            </p>
           
              <p className=" font-plus-jakarta text-h5">Doprava a platba</p>
            
          </div>
        </div>

      {/* Form */}
      <div className="flex flex-wrap md:flex-nowrap p-4">
        <div className="w-full md:w-2/3 p-4 bg-blue2">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl mb-4 font-plus-jakarta">Kontaktné údaje</h2>
            <div className=" p-6 bg-white1 grid grid-cols-2 gap-4">
              <div className="mb-4">
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="Meno"
                  type="text"
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="Priezvisko"
                  type="text"
                  value={lastName}
                  onChange={handleInputChange(setLastName)}
                  required
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
                  value={phoneNumber}
                  onChange={handleInputChange(setPhoneNumber)}
                  required
                />
              </div>
              <div className="mb-4 shadow-md">
                <input
                  className="w-full p-2 border"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  required
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
                  value={street}
                  onChange={handleInputChange(setStreet)}
                  required
                />
                <input
                  className="w-full p-2 border mb-4 shadow-md"
                  placeholder="Mesto"
                  type="text"
                  value={city}
                  onChange={handleInputChange(setCity)}
                  required
                />
                <input
                  className="w-full p-2 border mb-4 shadow-md"
                  placeholder="PSC"
                  pattern="\d{5}"
                  type="text"
                  value={postalCode}
                  onChange={handleInputChange(setPostalCode)}
                  required
                />
              </div>
            </div>
          </form>

          <label className=" font-plus-jakarta">
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              className=""
            />{" "}
            Nakupujem na firmu
          </label>
          {showCompanyFields && (
            <div className=" p-6 bg-white1">
              <div>
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="Spoločnosť"
                  pattern="\d{5}"
                  type="text"
                  value={companyName}
                  onChange={handleInputChange(setCompanyName)}
                  required
                />
              </div>

              <div className="bg-white1 grid grid-cols-3 gap-4">
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="IČO"
                  pattern="\d{5}"
                  type="text"
                  value={ICO}
                  onChange={handleInputChange(setICO)}
                  required
                />
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="DIČ"
                  pattern="\d{5}"
                  type="text"
                  value={DIC}
                  onChange={handleInputChange(setDIC)}
                  required
                />
                <input
                  className="w-full p-2 border shadow-md"
                  placeholder="IC DPH"
                  pattern="\d{5}"
                  type="text"
                  value={ICDPH}
                  onChange={handleInputChange(setICDPH)}
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* SUM */}
        <div className="w-full md:w-1/3 bg-gray-100 p-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg">Celková suma</span>
            <span className="text-lg font-bold">{`${total}€`}</span>
          </div>

          <Link href="/cart/order/shipping">
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
