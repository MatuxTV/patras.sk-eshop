"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DelUser = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUser);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
      });
      if (!res.ok) {
        throw new Error("Server nevrátil OK");
      }
      toast.success("Užívateľ bol vymazaný");
      setUser((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Chyba pri mazaní používateľa");
      console.error("Mazanie zlyhalo:", error);
    }
  };

  return (
    <div className="bg-white2 m-8 rounded-lg">
      {user
        ?.filter(
          (item) =>
            item.active === true &&
            item.role !== "df5647af-422c-4834-bb6c-56baccbe5fce"
        )
        .map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div className="space-x-5 text-sm font-plus-jakarta">
              <span>
                <b>Meno:</b> {item.first_name}
              </span>
              <span>
                <b>Priezvisko:</b> {item.last_name}
              </span>
              <span>
                <b>Email:</b> {item.email}
              </span>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800 font-bold text-lg"
            >
              X
            </button>
          </div>
        ))}
    </div>
  );
};

export default DelUser;
