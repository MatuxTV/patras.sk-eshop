"use client";
import Nav from "../componets/nav";
import OrderList from "../componets/orders";
import DelUser from "../componets/dell_user";
import SignOutButton from "../componets/signOutButton";
import Link from "next/link";

const Admin = () => {
  return (
    <div>
      <Nav />
      <div className="flex justify-center items-center text-center space-x-8">
        <Link href={"/admin/admin_addprod"}>
          <button className="font-plus-jakarta hover:bg-blue2 p-2 text-h6 rounded-lg transition-all delay-50">
            Pridanie produktu a kategórie
          </button>
        </Link>
        <Link href={"/admin/admin_objednavky"}>
          <button className="font-plus-jakarta hover:bg-blue2 p-2 text-h6 rounded-lg transition-all delay-50">
            Vybavené objednávky
          </button>
        </Link>
      </div>
      <div className=" font-plus-jakarta justify-center text-center bg-blue2 text-h3 my-8">
        <p>Vitajte</p>
      </div>
      {/* {Zobrazenie objednavok} */}
      <div className=" mt-10  justify-center ">
        <h1 className=" text-center text-h5 font-plus-jakarta">
          Aktívne Objednávky
        </h1>
        <div className=" justify-center">
          <OrderList />
        </div>
      </div>
      {/* {Vymazanie uzivatela} */}
      <div className="">
        <h1 className=" text-center text-h5 font-plus-jakarta">Aktívne účty</h1>
        <div>
          <DelUser />
        </div>
      </div>
      <div className="flex justify-center">
        <SignOutButton />
      </div>
    </div>
  );
};

export default Admin;
