"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  const signOutHandler =  (e) => {
    e.preventDefault();
    signOut({redirect:true, callbackUrl: '/'});
  };

  return (
    <button
      onClick={signOutHandler}
      className=" flex text-h4 m-10 font-plus-jakarta bg-blue1 rounded-lg p-5 text-white1 hover:shadow-lg hover:text-white2"
    >
      Odhlasit
    </button>
  );
};

export default SignOutButton;
