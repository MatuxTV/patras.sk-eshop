"use client";
import { deleteUser } from "@directus/sdk";
import { useEffect, useState } from "react";
import directus from "@/lib/directus";
import { toast } from "react-toastify";

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
        return item.role == process.env.ADMIN_ROLE ? (
          <div key={item.id} value={item.id}></div>
        ) : (
          <div
            key={item.id}
            value={item.id}
            className=" flex justify-center m-8"
          >
            <button
              onClick={async () => {
                await directus.request(deleteUser(item.id));
                window.location.reload();
                toast.success("Užívateľ bol vymazaný");
              }}
              className=" font-plus-jakarta"
            >
              x
            </button>
            <div className="flex space-x-5">
              <p> <b>Meno:</b> {item.first_name}</p>
              <p><b>Priezvisko:</b> {item.last_name}</p>
              <p><b>Email:</b> {item.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default DelUser;
