'use client'
import { useState , useEffect } from "react";

const CatDetail = () =>{

    const [category,setCategory] =useState();
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(process.env.NEXT_PUBLIC_DIRECTUS + "items/kategoria", {
          cache: "no-store",
        }).then((res) => res.json());
        return res;
      }
  
      fetchData().then((res) => setCategory(res.data));
    }, []);
    
    return(
      <select>
        {category?.map((item) => {
                return <option key={item.id} value={item.id}> {item.nazov}</option>;
              })}
      </select>
    )
    }
export default CatDetail