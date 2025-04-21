"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderList = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders").then(res => res.json()).then(setData);
    fetch("/api/products").then(res => res.json()).then(setProducts);
    fetch("/api/skladanie").then(res => res.json()).then(setOrders);
  }, []);

  const itemRemove = async (idItem) => {
    const res = await fetch(`/api/orders/${idItem}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },  
    });

    if (res.ok) {
      toast.success("Objednávka bola vybavená");
      setData((prev) => prev.filter((order) => order.id !== idItem));
    } else {
      toast.error("Chyba pri vybavovaní objednávky");
    }
  };

function zaokruhlitNaDveDesatinneMiesta(cislo) {
  return parseFloat(cislo.toFixed(2));
}

function avaibility_check() {
  let number = 0;
  const order_avaibility = data.map((item) => {
    if (item.proces) {
      number++;
    }
  });
  return number;
}

const number = avaibility_check();

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
      {number !== 0 ? data.filter((item)=>item.proces==true).map((item) => {
        const round = zaokruhlitNaDveDesatinneMiesta(item.cena_objednavky)
        
        return (
          <div key={item.id + "order"} value={item.id}>
            <div className="bg-white2 p-8 m-8 rounded-lg">
              <div>
                <button onClick={()=>itemRemove(item.id)}>X</button>
              </div>
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
                        {item.tcislo}
                      </p>
                      <p>
                        {item.ulica},{item.psc},{item.mesto}
                      </p>
                      <div className=" m-8"></div>
                      {item.poznamka.length > 0 ? (<p className="flex">{item.poznamka}</p>) : (<p> - </p>)}
                      
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
                      {item.nazov_spolocnost.length > 0 ? (<p className="flex">{item.nazov_spolocnosti}</p>) : (<p> - </p>)}
                      {item.ico.length > 0 ? (<p className="flex">{item.ico}</p>) : (<p> - </p>)}
                      {item.dic.length > 0 ? (<p className="flex">{item.dic}</p>) : (<p> - </p>)}
                      {item.icdph.length > 0 ? (<p className="flex">{item.icdph}</p>) : (<p> - </p>)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">PRODUKTY</h3>
                <OrderProductList
                  objednavka_id={item.id}
                  orders={orders}
                  products={products}
                />
                <div className="flex justify-between mt-4">
                  <span className="text-gray-600">CENA OBJEDNÁVKY</span>
                  <span className=" font-plus-jakarta text-h6 text-red text-">
                    {round}€
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      }):<div className=" justify-center text-center p-8">Žiadne nové objednávky</div>}
      </div>
     
  );
};
export default OrderList;
