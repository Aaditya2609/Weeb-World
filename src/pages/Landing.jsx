import React from 'react'
import background from "../assets/background.jpg";

import { NavLink } from 'react-router-dom';

function Landing() {

      const divStyle2 = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

      };
    
    return (
        <div className='bg-[#e6e4d5] p-4 min-h-screen flex items-center justify-center' style={divStyle2}>
        <div className='flex flex-row items-center m-4 max-w-fit min-h-fit rounded-3xl bg-transparent'>
            <div className='flex flex-col items-center w-full bg-[rgba(0,0,0,0.8)] p-8 rounded-3xl'>
                <h1 className='text-white font-bold  text-5xl my-8'>Welcome to Weeb World!</h1>
                <div>
                    <p  className='text-2xl  text-white max-w-md my-4'>Step into a world where anime enthusiasts gather and connect, all on one vibrant platform.</p>
                    <p className='text-2xl text-white max-w-md my-4'>Unleash your inner otaku and join a community fueled by passion, creativity, and shared love for all things anime.</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <button className="m-2 bg-black hover:bg-[#FFF01F] hover:text-black text-[#FFF01F] font-bold py-2 px-6 text-xl border rounded">
                        <NavLink to="/Login">Login</NavLink>
                    </button>
                    <button className="m-2 bg-black hover:bg-[#FFF01F] hover:text-black text-[#FFF01F] font-bold py-2 px-6 text-xl border rounded">
                    <NavLink to="/Signup">Join Now</NavLink>
                    </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Landing