"use client";

import { Suspense, useEffect, useState } from "react";
import BackButton from "@/app/componets/back_button";

const Admin_objednavky = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/orders');
      const json = await res.json();
      setData(json);
    }
  
    async function fetchOrders() {
      const res = await fetch('/api/skladanie');
      const json = await res.json();
      setOrders(json);
    }
  
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const json = await res.json();
      setProducts(json);
    }
    fetchData();
    fetchOrders();
    fetchProducts();
  }, []);

  function zaokruhlitNaDveDesatinneMiesta(cislo) {
    return parseFloat(cislo.toFixed(2));
  }

  const OrderProductList = ({ objednavka_id, orders, products }) => {
    const relevantOrders = orders.filter((order) => order.id_objednavka === objednavka_id);
  
    return (
      <div className="space-y-2">
        {relevantOrders.map((order) => {
          const product = products.find((p) => p.id === order.id_produkt);
  
          if (!product) return null;
  
          return (
            <div key={order.id} className="flex justify-between pb-4">
              <div className="text-gray-600">
                <p>ID</p>
                <p>Produkt</p>
                <p>Cena</p>
                <p>Počet kusov</p>
              </div>
              <div className="font-plus-jakarta w-32">
                <p>ID-{product.id}</p>
                <p>{product.nazov}</p>
                <p>{product.cena}€</p>
                <p>{order.pocet_kusov}ks</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
        <BackButton />
      {data.length != 0 ? (
        data
          .filter((item) => item.proces == false)
          .map((item) => {
            const round = zaokruhlitNaDveDesatinneMiesta(item.cena_objednavky);
            const inputDate = item.date_created;
              const dateObject = new Date(inputDate);
              const formattedDate = dateObject.toLocaleDateString("sk-SK", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

            return (
              <div key={item.id + "order"} value={item.id}>
                <div className="bg-white2 p-8 m-8 rounded-lg">
                    <h3 className=" font-plus-jakarta text-center m-4">{formattedDate}</h3>
                  <h2 className="text-2xl font-bold font-plus-jakarta text-center mb-4">
                    OBJEDNÁVKA ČÍSLO <b>{item?.id}</b>
                  </h2>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        FAKTURAČNÉ ÚDAJE
                      </h3>
                      <div className="flex justify-between">
                        <div className="text-gray-600">
                          <p>Meno</p>
                          <p>Email</p>
                          <p>Číslo</p>
                          <p>Adresa</p>
                          <div className=" m-8"></div>
                          <p>Poznamka</p>
                        </div>
                        <div className=" font-plus-jakarta text-red-600">
                          <p>
                            {item.meno} {item.priezvisko}
                          </p>
                          <p>{item.email}</p>
                          <p>
                            +{item.prefix}
                            {item.t_cislo}
                          </p>
                          <p>
                            {item.ulica},{item.psc},{item.mesto}
                          </p>
                          <div className=" m-8"></div>
                          {item.poznamka.length > 0 ? (
                            <p className="flex">{item.poznamka}</p>
                          ) : (
                            <p> - </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2">SPOLOČNOSŤ</h3>
                      <div className="flex justify-between">
                        <div className="text-gray-600">
                          <p>Názov</p>
                          <p>IČO</p>
                          <p>DIČ</p>
                          <p>IČ DPH</p>
                        </div>
                        <div className=" font-plus-jakarta text-red-600">
                          {item.nazov_spolocnost.length > 0 ? (
                            <p className="flex">{item.nazov_spolocnost}</p>
                          ) : (
                            <p> - </p>
                          )}
                          {item.ico.length > 0 ? (
                            <p className="flex">{item.ico}</p>
                          ) : (
                            <p> - </p>
                          )}
                          {item.dic.length > 0 ? (
                            <p className="flex">{item.dic}</p>
                          ) : (
                            <p> - </p>
                          )}
                          {item.icdph.length > 0 ? (
                            <p className="flex">{item.icdph}</p>
                          ) : (
                            <p> - </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">PRODUKTY</h3>
                    <div className="space-y-2">
                     <OrderProductList
                        objednavka_id={item.id}
                        orders={orders}
                        products={products}
                     />
                      <div className="flex justify-between mt-4">
                        <span className="text-gray-600">CENA OBJEDNÁVKY</span>
                        <span className="font-medium text-red-600">
                          {round}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
};
export default Admin_objednavky;
