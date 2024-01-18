import React from "react";

const GoBack = () => {
  const goBackHandler = () => {
    window.history.back();
  };

  return (
    <a onClick={goBackHandler} className=" flex text-h4 m-10 font-plus-jakarta">
      Späť
    </a>
  );
};

export default GoBack;
