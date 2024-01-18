'use server'
import { cookies } from 'next/headers'

export async function getCategory() {
      return fetch(process.env.NEXT_PUBLIC_DIRECTUS + "items/kategoria",{ cache: "no-store" }).then(
        (res) => res.json(),
      );}

// export async function loginUser(email, password) {
//   const response = await fetch("http://localhost:8055/auth/login", {
//     method: "POST",
//     body: JSON.stringify({ email, password }),
//     headers: { "Content-Type": "application/json" },
//   });

//   const tokens = await response.json();
//   if (response.ok) {

//       console.log(tokens);

//       const cookieStore = cookies();
//       cookieStore.set("accessToken", tokens.data.access_token);
      
//     } else {
//       setError("Prihlásenie zlyhalo: " + (tokens.error || "Nespecifikovaná chyba")); // Aktualizujte chybový sta
//     }
//   }

 