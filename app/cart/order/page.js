"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../../lib/cart-context";
import { ShippingProvider } from "@/lib/shipping-context";
import { useShipping } from "@/lib/shipping-context";
import Nav from "../../componets/nav";
import { useRouter } from "next/navigation";
import { data } from "autoprefixer";

const CartItem = ({ item }) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
      <div className=" h-[80px] w-[80px] relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS}assets/${item.obrazok}`}
          alt={item.meno}
          className="rounded"
          objectFit="contain"
          layout="fill"
        />
        </div>
        <div className="ml-4">
          <p className="text-lg font-bold">{item.meno}</p>
          <p
            className={`${item.dostupnost ? "text-green-500" : "text-red-500"}`}
          >
            {item.dostupnost ? `Na sklade - ${item.mnozstvo}ks` : "Nedostupné"}
          </p>
        </div>
      </div>
      <div className=" flex items-center">
        <p>{item.quantity}ks</p>
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
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    prefix: "+421",
    phoneNumber: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    companyName: "",
    ico: "",
    dic: "",
    icdph: "",
  });
  const { updateShippingData } = useShipping();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    // updateShippingData(formData); // Odosielanie dat do shipping-conteext
    router.push("/cart/order/shipping");
  };

  const [showCompanyFields, setShowCompanyFields] = useState(false);

  const handleCheckboxChange = (e) => {
    setShowCompanyFields(e.target.checked);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
  }, []);

  return (
    <div className="container mx-auto my-8 p-4">
      <Nav />
      <div className="flex justify-center py-8">
        <h1 className=" text-h3 font-bold text-center mb-4 font-plus-jakarta ">
          Váš Košík
        </h1>
      </div>
      {/* Progress Bar */}
      <div className="flex justify-around mb-8 h-16 items-center bg-blue2 text-xs sm:text-sm md:text-base lg:text-h5">
        <div className="flex flex-row gap-2  items-center">
          <p className="bg-blue1 w-10 h-10 flex items-center justify-center text-center font-plus-jakarta text-white1 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16">
            1
          </p>
          <Link href={"/cart"}>
            <p className="font-plus-jakarta">Košík</p>
          </Link>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <p className="bg-blue1 w-10 h-10 flex items-center justify-center text-center font-plus-jakarta text-white1 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16">
            2
          </p>
          <Link href={"/cart/order"}>
            <p className="font-plus-jakarta">Dodacie údaje</p>
          </Link>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="border w-10 h-10 flex items-center justify-center text-center font-plus-jakarta text-black1 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16">
            3
          </p>
          <p className="font-plus-jakarta">Doprava a platba</p>
        </div>
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap md:flex-nowrap p-4">
          <div className="w-full md:w-2/3 p-4 bg-blue2">
            <h2 className="text-xl mb-4 font-plus-jakarta">Kontaktné údaje</h2>
            <div className=" p-6 bg-whiteBG grid grid-cols-2 gap-4">
              <div className="mb-4">
                <input
                  name="firstName"
                  className="w-full p-2 border shadow-md"
                  placeholder="Meno"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  name="lastName"
                  className="w-full p-2 border shadow-md"
                  placeholder="Priezvisko"
                  type="text"
                  onChange={handleChange}
                  value={formData.lastName}
                  required
                />
              </div>
              <div className=" flex mb-4 shadow-md gap-2">
                <select
                  className="w-1/4 p-2 border"
                  name="prefix"
                  onChange={handleChange}
                  value={formData.prefix}
                >
                  <option value="+421">+421</option>
                  <option value="+420">+420</option>
                </select>

                <input
                  name="phoneNumber"
                  className="w-3/4 p-2 border shadow-md"
                  type="tel"
                  placeholder="Tel.čislo"
                  id="telefonne_cislo"
                  pattern="\d{3}\s?\d{3}\s?\d{3}"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  required
                />
              </div>
              <div className="mb-4 shadow-md">
                <input
                  name="email"
                  className="w-full p-2 border"
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
            </div>

            <h2 className="text-xl mb-4 mt-8 font-plus-jakarta">
              Fakturačné údaje
            </h2>
            <div className=" p-6 bg-whiteBG">
              <div className="grid grid-cols-3 gap-3">
                <input
                  name="street"
                  className="w-full p-2 border mb-4 shadow-md"
                  placeholder="Ulica"
                  type="text"
                  onChange={handleChange}
                  value={formData.street}
                  required
                />
                <input
                  className="w-full p-2 border mb-4 shadow-md"
                  placeholder="Mesto"
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  required
                />
                <input
                  className="w-full p-2 border mb-4 shadow-md"
                  placeholder="PSČ"
                  pattern="\d{5}"
                  type="text"
                  name="postalCode"
                  onChange={handleChange}
                  value={formData.postalCode}
                  required
                />
              </div>
            </div>

            <label className=" font-plus-jakarta text-center">
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                className=""
                value={showCompanyFields}
              />
              Nakupujem na firmu
            </label>
            {showCompanyFields && (
              <div className=" p-6 bg-whiteBG">
                <div className=" pb-3">
                  <input
                    className="w-full p-2 border shadow-md"
                    placeholder="Spoločnosť"
                    type="text"
                    name="companyName"
                    onChange={handleChange}
                    value={formData.companyName}
                    required
                  />
                </div>

                <div className="bg-white1 grid grid-cols-3 gap-4">
                  <input
                    className="w-full p-2 border shadow-md"
                    placeholder="IČO"
                    pattern="\d{5}"
                    type="text"
                    name="ico"
                    onChange={handleChange}
                    value={formData.ico}
                    required
                  />
                  <input
                    className="w-full p-2 border shadow-md"
                    placeholder="DIČ"
                    pattern="\d{5}"
                    type="text"
                    name="dic"
                    value={formData.dic}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full p-2 border shadow-md"
                    placeholder="IČ DPH"
                    pattern="\d{5}"
                    type="text"
                    name="icdph"
                    value={formData.icdph}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/3 p-4">
            {/* SUM */}
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg">Celková suma</span>
              <span className="text-lg font-bold">{`${total.toFixed(
                2
              )}€`}</span>
            </div>

            <button
              type="submit"
              className=" mt-4 py-2 bg-white2 text-white font-bold rounded-lg hover:bg-blue2 p-6"
            >
              Pokračovať
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutLayout;
