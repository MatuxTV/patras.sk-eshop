'use server'

export async function getCategory() {
      return fetch(process.env.NEXT_PUBLIC_DIRECTUS + "items/kategoria",{ cache: "no-store" }).then(
        (res) => res.json(),
      );}


 