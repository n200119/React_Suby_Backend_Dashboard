import React from "react";

const Navbar = ({showLoginHandler,showRegisterHandler,showLogOut,logOutHandler}) => {

  const firmName = localStorage.getItem("firmName");

  return (
    <div className="h-16 bg-[#F46036] m-0 px-6  text-white font-sans box-border flex justify-between items-center">
      <div className="font-bold text-xl align-middle">Vendor Dashboard</div>
      <div className="font-bold text-md">Firm Name: {firmName}</div>
      <div className="text-lg">
        {!showLogOut ? <><button onClick={showLoginHandler}>Login/</button>
        <button onClick={showRegisterHandler}>Register</button></>:<button onClick={logOutHandler}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;
