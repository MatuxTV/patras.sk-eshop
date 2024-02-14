const OrderList = async () => {
  function getOrder() {
    return fetch(process.env.NEXT_PUBLIC_DIRECTUS + "items/objednavka", {
      cache: "no-store",
    }).then((res) => res.json());
  }
  async function fetchData() {
    const data = await getOrder();
    return data;
  }
  const res = await fetchData();
  const data = res.data;

  console.log(data);
  return (
    <div>
      {data?.map((item) => {
        return (
          <div key={item.id} value={item.id}>
            <div className="bg-white2 p-8 m-8 rounded-lg">
              <h2 className="text-2xl font-bold font-plus-jakarta text-center mb-4">
                OBJEDNÁVKA ČÍSLO <b>{item.id}</b>
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
                    </div>
                    <div className="font-medium text-red-600">
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
                    <div className="font-medium text-red-600">
                      <p>{item.nazov_spolocnosti}</p>
                      <p>{item.ico}</p>
                      <p>{item.dic}</p>
                      <p>{item.icdph}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-2">PRODUKTY</h3>
                <div className="space-y-2">
                  {item.id_produkt.map((product) => (
                    <div key={product.id} value={product.id} className="flex justify-between">
                      <div className="text-gray-600">
                        <p>ID</p>
                        <p>Produkt</p>
                        <p>Cena</p>
                      </div>
                      <div className="font-medium text-red-600">
                        <p>{product.id}</p>
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between mt-4">
                    <span className="text-gray-600">CENA OBJEDNÁVKY</span>
                    <span className="font-medium text-red-600">
                      {item.cena_objednavky}€
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default OrderList;
