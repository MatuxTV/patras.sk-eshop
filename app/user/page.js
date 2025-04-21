import Nav from "../componets/nav";
import { options } from "../api/auth/[...nextauth]/options.js";
import { getServerSession } from "next-auth";
import SignOutButton from "../componets/signOutButton";
import pool from "@/app/api/postgresql";

const UserPage = async () => {
  const data = await getServerSession(options);
  const user = data?.user;

  // Získanie objednávok používateľa
  const userOrderResult = await pool.query(
    `SELECT * FROM "Objednavka" WHERE user_created = $1 ORDER BY date_created DESC`,
    [user.id]
  );
  const Order = userOrderResult.rows;

  // Získanie údajov zo skladania produktov
  const skladanieResult = await pool.query(`SELECT * FROM "Produkt_skladania"`);
  const skladanie = skladanieResult.rows;

  // Získanie produktov
  const productsResult = await pool.query(`SELECT * FROM "Produkty"`);
  const products = productsResult.rows;



  return (
    <div className="">
      <Nav product={"Produkty"} />
      <div className="flex flex-col justify-center">
        <p className="text-h4 text-center text-black1 font-plus-jakarta m-4">
          Ahoj {user.first_name}!
        </p>
        <div className="">
          <p className="text-h4 text-black1 text-center font-plus-jakarta m-4">
            Tvoje objednávky
          </p>
          <div>
            {Order.length !== 0 ? (
              Order.map((item) => {
                const inputDate = item.date_created;
                const dateObject = new Date(inputDate);
                const formattedDate = dateObject.toLocaleDateString("sk-SK", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });

                function zaokruhlitNaDveDesatinneMiesta(cislo) {
                  return parseFloat(parseFloat(cislo).toFixed(2));
                }
                const round = zaokruhlitNaDveDesatinneMiesta(
                  item.cena_objednavky
                );

                const objednane = skladanie.filter((s) => s.id_objednavka === item.id);

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 m-8 bg-white2 shadow-md rounded-lg"
                  >
                    <div className="text-sm font-medium ">
                      <span>Dátum vytvorenia: </span>
                      <span className="text-gray-800">{formattedDate}</span>
                    </div>

                    <div>
                      <p className="text-center m-2 text-h6">
                        ID objednávky: <b>{item.id}</b>
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <span className="text-sm font-medium text-gray-600 sm:mr-2">
                          Produkty:
                        </span>
                        <div>
                          {objednane.map((order) => {
                            const orderProduct = products.find(
                              (p) => p.id === order.id_produkt
                            );
                            return (
                              <div key={order.id}>
                                <ul className="list-inside text-gray-800">
                                  <li>
                                    {order.pocet_kusov}x - {orderProduct?.nazov} -
                                    {orderProduct?.cena}€
                                  </li>
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      <span>Celková cena: </span>
                      <span className="text-black">{round}€</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className=" text-center justify-center">Nemáte žiadne objednávky</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
