import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("login successfull");
        console.log(data);
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        console.log(`token is:${data.token}`);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      console.log(vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const vendorData = await vendorResponse.json();
      console.log(vendorResponse);

      if(vendorResponse.ok)
      {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log("first firm is:",vendorFirmId);
        localStorage.setItem("firmId",vendorFirmId);
        localStorage.setItem("firmName",vendorFirmName);
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <form
        className="border-2 shadow-xl shadow-black border-slate-800 rounded max-w-xl py-8 px-24 flex-col justify-between items-center text-xl"
        onSubmit={submitHandler}
      >
        <h1 className="font-bold text-3xl text-center mb-2 text-[#D7263D]">Vendor Login</h1>
        <label>Email</label>
        <br />
        <input
          type="text"
          placeholder="enter Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-slate-950 p-1 my-4"
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          className="border-2 border-slate-950 p-1 my-4"
        />
        <br />
        <div>
          <button
            className="bg-blue-500 px-5 py-1 text-white rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
