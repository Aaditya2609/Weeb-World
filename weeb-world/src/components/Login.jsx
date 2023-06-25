import React, { useState } from 'react'
import loginBackground from "../assets/loginBackground.jpg"
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext"
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { loginService } from '../services/Auth/AuthLogin';


function Login() {

      const divStyle2 = {
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

      };

      const [password,setPassword]=useState("")
      const [username,setUsername]=useState("")
      const {dispatchAuth}=useAuth();
      const navigate=useNavigate();

    
    const handleGuestLogin = () => {
        const guestusername = "test";
        const guestPassword = "1234";
        setUsername(guestusername);
        setPassword(guestPassword);
      };
      const handleLogin=()=>{
        if(password!=="" && username!=="")
        {
        loginService(username,password,dispatchAuth)
        navigate("/Home")
    }
        else if(username==="")
        {
        toast.error("Username Cannot Be Empty", {
          position: "bottom-center",
          autoClose: 2000,
        });
      }  else if(password==="")
        {
        toast.error("Password Cannot Be Empty", {
          position: "bottom-center",
          autoClose: 2000,
        });
    }
    }
      



    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#e6e4d5] p-8" style={divStyle2}>
            <div className="w-full m-auto rounded-xl shadow-md lg:max-w-xl bg-transparent">
                <div className='bg-[rgba(0,0,0,0.7)] rounded-xl p-8'>
                <h1 className="text-6xl font-semibold text-center text-white">Weeb World</h1>
                <h2 className="text-5xl mt-4 font-semibold text-center text-white">
                    Log in
                </h2>
                    <div className="mb-2 mt-2">
                        <label
                            for="username"
                            className="block text-2xl  text-left font-semibold text-white"
                        >
                            Username
                        </label>
                        <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                            type="username"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-2xl text-left font-semibold text-white"
                        >
                            Password
                        </label>
                        <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-2/3 px-4 py-2 my-2 text-2xl bg-[#e6e4d5] hover:bg-[#117f95] hover:text-white text-[#117f95] font-bold rounded-lg" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="w-2/3 px-4 py-2 text-2xl bg-[#e6e4d5] hover:bg-[#117f95] hover:text-white text-[#117f95] font-bold rounded-lg" onClick={handleGuestLogin}>
                            Guest Credentials
                        </button>
                        <button className="w-2/3 px-4 py-2 my-2 text-2xl bg-[#e6e4d5] hover:bg-[#117f95] hover:text-white text-[#117f95] font-bold rounded-lg">
                        <NavLink to="/Signup">Create New Account</NavLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login