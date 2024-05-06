"use client";
import React from "react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const signOutHandler =  (e) => {
    e.preventDefault();
    signOut({redirect:true, callbackUrl: '/'});
  };

  return (
    <button
      onClick={signOutHandler}
      className="flex text-h4 m-10 font-plus-jakarta bg-blue1 rounded-lg p-5 text-white1 hover:bg-white1 hover:shadow-inner hover:text-blue1 transition-all delay-100"
    >
      Odhlasit
    </button>
  );
};

export default SignOutButton;
