"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "../componets/nav";
import { toast } from "react-toastify";

export default function RegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const [PassErrors, setPassErrors] = useState({
    uppercase: '',
    number: '',
    specialChar: '',
    length: ''
  });

  const [error, setError] = useState("");
  const [cartButton,setCartButton] = useState("Registrovať sa");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangePass = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const velkePismeno = /[A-Z]/;
    const cislo = /[0-9]/;
    const specZnak = /[\W_]/;
    const delka = value.length >= 8;

    setPassErrors({
      uppercase: velkePismeno.test(value) ? '' : 'Aspoň jedno velké písmeno.',
      number: cislo.test(value) ? '' : 'Aspoň jedno číslo.',
      specialChar: specZnak.test(value) ? '' : 'Aspoň jeden špeciálny znak.',
      length: delka ? '' : '8 znakov.'
    });

  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setCartButton(<div className="border-black2 h-20 w-20 animate-spin rounded-full border-8 border-t-blue2" />);

    if (formData.password !== formData.passwordAgain) {
      setError("Heslá sa nezhodujú");
      return;
    }
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      router.push("/");
      router.refresh();
      toast.success("Registrácia prebehla úspešne");
    } else {
      const result = await response.json();
      setError(result.message || "An error occurred during registration.");
      setCartButton("Registrovať sa");
    }
  };

  return (
    <>
      <Nav /> {/* Komponent navigácie */}
      <div className="min-h-fit flex items-center justify-center ">
        <div className="flex flex-col justify-center">
          <Image
            className="m-8"
            src="/IMG/logo.png"
            alt="logo"
            width={250}
            height={250}
          />

          <form // Formulár pre registráciu
            className="bg-white2 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="text-center">
              {/* Nadpis formulára */}
              <p className="text-h4 text-black1 font-plus-jakarta m-4">
                Registrácia
              </p>
            </div>

            {/* Pole pre prve meno */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-plus-jakarta mb-2"
                htmlFor="first_name"
              >
                Meno
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="first_name"
                type="text"
                placeholder="Meno"
                onChange={handleChange}
                required
                value={formData.first_name}
              />
            </div>

            {/* Pole pre priezvisko */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-plus-jakarta mb-2"
                htmlFor="last_name"
              >
                Priezvisko
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="last_name"
                type="text"
                placeholder="Priezvisko"
                onChange={handleChange}
                required
                value={formData.last_name}
              />
            </div>

            {/* Pole pre e-mail */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-plus-jakarta mb-2"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                required
                value={formData.email}
              />
            </div>

            {/* Pole pre heslo */}
            <div className="mb-6">
              <label
                className="font-plus-jakarta block text-black1 text-sm mb-2"
                htmlFor="password"
              >
                Heslo
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-black1 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                placeholder="Heslo"
                onChange={handleChangePass}
                minLength={8} // Minimálna dĺžka hesla
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Mínimálne požiadavky na heslo
                required
                value={formData.password}
              />
            </div>

            <div className=" bg-white1 rounded p-2 my-2">
              <p className="text-black1 text-h7 font-plus-jakarta ">
                Heslo musí obsahovať:
              </p>
              <div className="">
                <ul className="text-black2 text-[10px] font-plus-jakarta justify-end text-right">
                  <li>{PassErrors.uppercase}</li>
                  <li>{PassErrors.number}</li>
                  <li>{PassErrors.specialChar}</li>
                  <li>{PassErrors.length}</li>
                </ul>
              </div>
            </div>

            {/* Pole pre zopakovanie hesla */}
            <div className="mb-6">
              <label
                className="font-plus-jakarta block text-black1 text-sm mb-2"
                htmlFor="password"
              >
                Zopakujte svoje heslo
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-black1 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="passwordAgain"
                type="password"
                placeholder="Zopakujte svoje heslo"
                onChange={handleChange}
                minLength={8} // Minimálna dĺžka hesla
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Mínimálne požiadavky na heslo
                required
                value={formData.passwordAgain}
              />
            </div>

            {/* Súhlas s podmienkami */}
            <div className="align-middle">
              <input type="checkbox" id="terms" required />
              <label
                className="font-plus-jakarta text-black1 mx-2"
                htmlFor="terms"
              >
                Súhlasím s podmienkami PATRAS.SK
              </label>
            </div>

            {/* Tlačidlo na odoslanie formulára */}
            <div className="flex items-center justify-center">
              <button
                className="font-plus-jakarta m-5 bg-blue1 p-2 rounded-lg hover:bg-blue2 transform-all duration-300 ease-in-out hover:scale-105"
                type="submit"
              >
                {cartButton}
              </button>
            </div>

            {/* Zobrazenie chybových správ */}
            {error && <p className="text-red text-xs italic">{error}</p>}

            {/* Odkaz na prihlásenie */}
            <div className="justify-start mt-3">
              <p>
                Už máš účet? <Link href="/login"><b>Prihlás sa!</b></Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
