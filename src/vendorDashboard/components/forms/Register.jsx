import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {

  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const submitHandler = async (e)=>{
    e.preventDefault();
    try {
      
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({username,email,password})
      })
  
      const data = await response.json();
  
      if(response.ok)
      {
        console.log(data);
        alert("vendor successfully registered");
        setEmail("");
        setPassword("");
        setUserName("");
        showLoginHandler();
      }
      else
      {
        alert("registration failed");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      alert("registration failed");
    }

  }
  return (
    <div className="w-full flex justify-center items-center">
      <form className="border-2 shadow-xl shadow-black border-slate-800 rounded py-4 px-32 flex-col justify-between items-center text-xl" onSubmit={submitHandler}>
        <h1 className="font-bold text-3xl text-[#D7263D]">Vendor Register</h1>
        <br />
        <label>UserName</label>
        <br />
        <input
          type="text"
          placeholder="enter UserName" name="username" value={username} onChange={(e)=>setUserName(e.target.value)}
          className="border-2 border-slate-950 p-1 my-2"
        />
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          placeholder="enter Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          className="border-2 border-slate-950 p-1 my-2"
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="enter password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}
          className="border-2 border-slate-950 p-1 my-2"
        />
        <br />
        <div>
          <button className="bg-blue-500 px-6 py-2 text-white rounded" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register