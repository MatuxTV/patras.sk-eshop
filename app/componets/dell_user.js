"use client";
import { deleteUser } from "@directus/sdk";
import { useEffect, useState } from "react";
import directus from "@/lib/directus";

const DelUser = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(process.env.NEXT_PUBLIC_DIRECTUS + "users", {
        cache: "no-store",
      }).then((res) => res.json());
      return res;
    }

    fetchData().then((res) => setUser(res.data));
  }, []);


  return (
    <div className=" bg-white2 m-8 rounded-lg">
      {user?.map((item) => {
        return item.role == "95863818-e696-411d-bae4-c1e04725c376" ? (
          <></>
        ) : (
          <div
            key={item.id}
            value={item.id}
            className=" flex justify-center m-8"
          >
            <button
              onClick={async () => await directus.request(deleteUser(item.id))}
              className=" font-plus-jakarta"
            >
              x
            </button>
            <div className="flex justify-between">
              <p>
                {item.first_name} {item.last_name}
              </p>
              <p>{item.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default DelUser;
