'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '../componets/nav';
import { createUser } from '@directus/sdk';
import directus from '@/lib/directus';
import { toast } from 'react-toastify';

export default function RegistrationForm() {
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  // Update form data on input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData,"formData");

    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    console.log(response,"response");

    if (response.status === 201) {
      router.push('/');
      router.refresh();
      toast.success('Registrácia prebehla úspešne');
    } else {
      const result = await response.json();
      setError(result.message || 'An error occurred during registration.');
    }
  }

  return(
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
                className="shadow appearance-none rounded w-full py-2 px-3 text-black1 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                
                name="password"
                type="password"
                placeholder="Heslo"
                onChange={handleChange}
                minLength={8} // Minimálna dĺžka hesla
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Mínimálne požiadavky na heslo
                required
                value={formData.password}
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
                className="font-plus-jakarta m-5 bg-blue1 p-2 rounded-lg hover:bg-blue2"
                type="submit"
              >
                Registrovať
              </button>
            </div>

            {/* Zobrazenie chybových správ */}
            {error && <p className="text-red text-xs italic">{error}</p>}

            {/* Odkaz na prihlásenie */}
            <div className="justify-start mt-3">
              <p>
                Už máš účet? <Link href="/login">Prihlás sa</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};