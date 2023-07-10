import React, { useEffect, useState } from 'react'
import signup from "../assets/signup.jpg"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { signupService } from '../services/Auth/AuthSignup';
import { useUsers } from '../contexts/UserContext';

function Signup() {
    const divStyle = {
        backgroundImage: `url(${signup})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

    };
    const {dispatchUsers}=useUsers();
    const [userDetail, setUserDetail] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [verifyPassword, setverifyPassword] = useState("");
    const [error, setError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigate = useNavigate();
    const { dispatchAuth } = useAuth();
    const { firstName = "", lastName = "", email = "", password = "", userName = "" } = userDetail

    const handleChange = (e) => {
        setUserDetail({
            ...userDetail,
            [e.target.name]: e.target.value,
        });
    };

    const validateEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (email !== "" && !emailRegex.test(email)) {
            setError('Please enter a valid email address');
        } else {
            setError('');
        }
    }


    const validatePassword = () => {
        if (password === verifyPassword) {
            setPasswordError('');
        } else {
            setPasswordError('Passwords do not match');
        }
    }
    useEffect(() => {
        validateEmail();
        validatePassword();
    }, [email, verifyPassword, password])


    const handleSignup = () => {
        if (firstName !== "" && lastName !== "" && email !== "" && password !== "" && error === "" && verifyPassword !== "" && passwordError === "" && userName !== "") {
                signupService(
                firstName,
                lastName,
                userName,
                email,
                password,
                dispatchAuth,
                dispatchUsers
            )
            navigate("/Home")
        }
        else if (email === "") {
            toast.error("Email Cannot Be Empty", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
        else if (error !== "") {
            toast.error("Email Is Not Valid", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
        else if (firstName === "") {
            toast.error("Enter Valid First Name", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
        else if (lastName === "") {
            toast.error("Enter Valid Last Name", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
        else if (userName === "") {
            toast.error("Enter Valid User Name", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }

        else if (password === "") {
            toast.error("Password Cannot Be Empty", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
        else if (verifyPassword === "") {
            toast.error("Verify Password Cannot Be Empty", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }
        else if (passwordError !== "") {
            toast.error("Passwords Do Not Match", {
                position: "bottom-center",
                autoClose: 2000,
            });
        }

    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#e6e4d5] p-8" style={divStyle}>
            <div className="w-full m-auto rounded-xl shadow-md lg:max-w-xl"  >
                <div className='bg-[rgba(0,0,0,0.7)] rounded-xl p-8'>
                    <h1 className="text-6xl font-semibold text-center text-white">Weeb World</h1>
                    <h2 className="text-5xl mt-4 font-semibold text-center text-white">
                        Signup
                    </h2>
                    <div className="mb-2 mt-2">
                        <label
                            className="block text-2xl  text-left font-semibold text-white"
                        >
                            Email
                        </label>
                        <input
                            type="email" name="email" onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <p className='text-[#dc143c] text-left text-xl font-bold'>{error}</p>
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-2xl text-left font-semibold text-white"
                        >
                            First Name
                        </label>
                        <input
                            type="text" name="firstName" onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-2xl text-left font-semibold text-white"
                        >
                            Last Name
                        </label>
                        <input
                            type="text" name="lastName" onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-2xl text-left font-semibold text-white"
                        >
                            User Name
                        </label>
                        <input
                            type="text" name="userName" onChange={handleChange}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-2xl text-left font-semibold text-white"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "" : "password"} onChange={handleChange} name="password"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <button className="block w-2/5 px-1 py-1 my-1 text-md bg-black hover:bg-[#FFF01F] hover:text-black text-[#FFF01F] font-bold rounded-lg" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide Password" : "Show Password"}</button>
                    </div>
                    <div className="mb-2">
                        <label
                            
                            className="block text-2xl text-left font-semibold text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "" : "password"} onChange={(e) => setverifyPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#16444e] focus:ring-[#117f95] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <p className='text-[#dc143c] text-left text-xl font-bold'>{passwordError}</p>
                    </div>
                    <div className="mt-6">
                        <button className="w-2/3 px-4 py-2 my-2 text-2xl bg-black hover:bg-[#FFF01F] hover:text-black text-[#FFF01F] font-bold rounded-lg" onClick={handleSignup}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup