import Nav from "../componets/nav";
import { options } from "../api/auth/[...nextauth]/options.js";
import { getServerSession } from "next-auth";
import SignOutButton from "../componets/signOutButton";
import { redirect, useRouter } from "next/navigation";

const UserPage = async () => {
  let data = await getServerSession(options);
  let user = data?.user;

  function getUserOrder() {
    return fetch(
      process.env.NEXT_PUBLIC_DIRECTUS +
        `items/objednavka?filter[user_created][id][_eq]=${user.id}`,
      {
        cache: "no-store",
      }
    ).then((res) => res.json());
  }
  const userOrder = await getUserOrder();
  console.log(userOrder, "userOrder");
  const Order = userOrder.data;

  function getSkladanie() {
    return fetch(process.env.NEXT_PUBLIC_DIRECTUS + `items/skladanie_produkt`, {
      cache: "no-store",
    }).then((res) => res.json());
  }
  const userSkladanie = await getSkladanie();
  const skladanie = userSkladanie.data;

  function getProd() {
    return fetch(process.env.NEXT_PUBLIC_DIRECTUS + `items/produkty`, {
      cache: "no-store",
    }).then((res) => res.json());
  }
  const prod = await getProd();
  const products = prod.data;

  // const router = useRouter();

  // useEffect(() => {
  //   if (user.role === '95863818-e696-411d-bae4-c1e04725c376') {
  //     redirect(router, "/admin");
  //   }
  // }, [user, router]);

  return (
    <div className="">
      <Nav product={"Produkty"} />
      <div className="flex flex-col justify-center">
        <p className="text-h4 text-center text-black1 font-plus-jakarta m-4">
          Ahoj {user.first_name}
        </p>
        <div className="">
          <p className="text-h4 text-black1 text-center font-plus-jakarta m-4">
            Tvoje objednávky
          </p>
          <div>
            {userOrder.data?.map((item) => {
              const inputDate = item.date_created;

              const dateObject = new Date(inputDate);
              const formattedDate = dateObject.toLocaleDateString("sk-SK", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 m-8 bg-white shadow-md rounded-lg"
                >
                  {/* Dátum vytvorenia */}
                  <div className="text-sm font-medium ">
                    <span>Dátum vytvorenia: </span>
                    <span className="text-gray-800">{formattedDate}</span>
                  </div>

                  <div>
                  <p className=" text-center text-h6"> ID objednavky : <b>{item.id}</b></p>
                    {/* Objednané produkty */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="text-sm font-medium text-gray-600 sm:mr-2">
                        Produkty:
                      </span>

                      {item.id_skladanie_objednavky.map((id) => {
                        const order = skladanie.find((p) => p.id === id);

                        console.log(order, "order");

                        const orderProduct = products.filter(
                          (p) => p.id === order.id_produkt
                        );

                        console.log(orderProduct, "orderProduct");

                        return (
                          <div key={id} value={id}>
                            <ul className="list-disc list-inside text-gray-800">
                              <li>{orderProduct[0].meno}</li>
                              <li>{orderProduct[0].cena}€</li>
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cena celej objednávky */}
                  <div className="text-sm font-medium text-gray-600">
                    <span>Celková cena: </span>
                    <span className=" text-black">
                      {item.cena_objednavky}€
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" flex justify-center">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
