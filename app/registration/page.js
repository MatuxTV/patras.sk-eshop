"use client";
import React, { useState } from "react";
import Image from "next/image";
import Nav from "../componets/nav"; // Uistite sa, že cesta k komponentu Nav je správna
import Link from "next/link";
import {createUser} from '@directus/sdk';
import { NextResponse } from "next/server";
import directus from "@/lib/directus";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegistrationForm from "./form";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}

















// export default function RegisterPage() {
//   // Stavy pre uchovanie údajov z formulára a chybové hlásenie
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(""); // Stav pre chybové hlásenia

//   async function createUser() {
//     try {
//       console.log(formData);
//       const response = await fetch("http://localhost:8055/users", {
//         method: "POST",
//         body: JSON.stringify({
//           ...formData,
//           role: "bb4da356-49ec-44b3-88af-5c8612676ae4", // Nastavte ID role pre nových užívateľov
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const userData = await response.json();
//       if (response.ok && userData.data && userData.data.id) {
//         // Registrácia prebehla úspešne
//         console.log("Užívateľ úspešne vytvorený:", userData.data);
//       } else {
//         // Nastavenie chybovej správy ak registrácia zlyhala
//         setError(userData.error || "Registrácia zlyhala. Skúste znova.");
//       }
//     } catch (e) {
//       setError("Registrácia zlyhala. Skúste znova."); // Nastavenie chybovej správy
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault(); // Zabráňte predvolenému správaniu formulára
//     setError(""); // Vynulujte predchádzajúce chyby
//     createUser(); // Vytvorte užívateľa
//   }

//   function handleChange(e) {
//     // Aktualizujte formData na základe zmien vo formulári
//     console.log(e.target)
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   return (
//     <>
//       <Nav /> {/* Komponent navigácie */}
//       <div className="min-h-fit flex items-center justify-center bg-gray-100">
//         <div className="flex flex-col">
//           <Image // Logo obrazok
//             className="m-8"
//             src="/IMG/logo.png"
//             alt="logo"
//             width={250}
//             height={250}
//           />

//           <form // Formulár pre registráciu
//             className="bg-white2 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
//             onSubmit={handleSubmit}
//           >
//             <div className="text-center">
//               {" "}
//               {/* Nadpis formulára */}
//               <p className="text-h4 text-black1 font-plus-jakarta m-4">
//                 Registrácia
//               </p>
//             </div>

//             {/* Pole pre e-mail */}
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-plus-jakarta mb-2"
//                 htmlFor="email"
//               >
//                 E-mail
//               </label>
//               <input
//                 className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="E-mail"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Pole pre heslo */}
//             <div className="mb-6">
//               <label
//                 className="font-plus-jakarta block text-black1 text-sm mb-2"
//                 htmlFor="password"
//               >
//                 Heslo
//               </label>
//               <input
//                 className="shadow appearance-none rounded w-full py-2 px-3 text-black1 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Heslo"
//                 onChange={handleChange}
//                 minLength={8} // Minimálna dĺžka hesla
//                 // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Mínimálne požiadavky na heslo
//                 required
//               />
//             </div>

//             {/* Súhlas s podmienkami */}
//             <div className="align-middle">
//               <input type="checkbox" id="terms" required />
//               <label
//                 className="font-plus-jakarta text-black1 mx-2"
//                 htmlFor="terms"
//               >
//                 Súhlasím s podmienkami PATRAS.SK
//               </label>
//             </div>

//             {/* Tlačidlo na odoslanie formulára */}
//             <div className="flex items-center justify-center">
//               <button
//                 className="font-plus-jakarta m-5 bg-blue1 p-2 rounded-lg hover:bg-blue2"
//                 type="submit"
//               >
//                 Registrovať
//               </button>
//             </div>

//             {/* Zobrazenie chybových správ */}
//             {error && <p className="text-red text-xs italic">{error}</p>}

//             {/* Odkaz na prihlásenie */}
//             <div className="justify-start mt-3">
//               <p>
//                 Už máš účet? <Link href="/login">Prihlás sa</Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
