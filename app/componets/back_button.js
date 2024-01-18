import React from "react";

const GoBack = () => {
  const goBackHandler = () => {
    window.history.back();
  };

  return (
    <button onClick={goBackHandler} className=" flex text-h4 m-10 font-plus-jakarta">
      Späť
    </button>
  );
};

export default GoBack;
