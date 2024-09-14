import React from 'react'
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-4xl text-center font-bold flex justify-center items-center w-screen h-screen">
        <div>
        <h1>404</h1>
        <div>Page Not Found</div><br/>
        <Link to="/"><button className="px-2 py-1 text-white bg-black text-2xl rounded">Go Back</button></Link>
        </div>
    </div>
  )
}

export default NotFound