import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setShowLogOut(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem("firmName");
    if (firmName) {
      setShowFirmTitle(false);
    }
  }, []);

  const logOutHandler = () => {
    alert("do you want to logout!");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogOut(false);
    setShowFirmTitle(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showAddFirmHandler = () => {
    if (showLogOut) {
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(true);
      setShowAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("please login");
      setShowLogin(true);
    }
  };

  const showAddProductHandler = () => {
    if (showLogOut) {
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(false);
      setShowAddProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("please login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogOut) {
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(true);
  } else {
    alert("please login");
    setShowLogin(true);
  }
  };

  return (
    <>
      <Navbar
        showLoginHandler={showLoginHandler}
        showRegisterHandler={showRegisterHandler}
        showLogOut={showLogOut}
        logOutHandler={logOutHandler}
      />
      <div className="flex">
        <Sidebar
          showAddFirmHandler={showAddFirmHandler}
          showAddProductHandler={showAddProductHandler}
          showAllProductsHandler={showAllProductsHandler}
          showFirmTitle={showFirmTitle}
        />
        {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showAddFirm && showLogOut && <AddFirm />}
        {showAddProduct && showLogOut && <AddProduct />}
        {showWelcome && <Welcome />}
        {showAllProducts && showLogOut && <AllProducts />}
      </div>
    </>
  );
};

export default LandingPage;
