import Nav from "../componets/nav";
import { options } from "../api/auth/[...nextauth]/options.js";
import { getServerSession } from "next-auth";
import SignOutButton from "../componets/signOutButton";
import { redirect, useRouter } from "next/navigation";


const UserPage = async () => {
  let data = await getServerSession(options);
  let user = data?.user;
  console.log(user);

  // const router = useRouter();
  

  // useEffect(() => {
  //   if (user.role === '95863818-e696-411d-bae4-c1e04725c376') {
  //     redirect(router, "/admin");
  //   }
  // }, [user, router]);

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
