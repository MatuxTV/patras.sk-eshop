import Nav from "../componets/nav";
import { options } from "../api/auth/[...nextauth]/options.js";
import { getServerSession } from "next-auth";
import SignOutButton from "../componets/signOutButton";

const UserPage = async () => {
  let data = await getServerSession(options);
  let user = data?.user;
  return (
    <div className="">
      <Nav product={"Produkty"} />
      <div className=" flex justify-center">
        <p className="text-h4 text-black1 font-plus-jakarta m-4">
          Ahoj {user.first_name}
        </p>
        <div className=" flex">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
