import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineCompass, AiOutlineLogout, AiOutlinePlus } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { useAuth } from '../contexts/AuthContext';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AddPostModal from './AddPostModal';
import { FaUserFriends } from "react-icons/fa";

function Nav() {
  const { stateAuth, dispatchAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAddPost,setShowAddPost]=useState(false)

  const handleLogout = () => {
    dispatchAuth({ type: 'USER_LOGOUT' });
    navigate('/');
    localStorage.clear();
  };

  return (
    <div className="fixed md:relative w-[100vw] md:w-[25%] z-[100]">
      <div className="flex flex-row md:flex-col h-fit py-2 md:h-full items-center bg-black md:bg-[rgba(0,0,0,0.8)] text-white md:p-0 px-2">
        <div className="px-4 py-8 mb-4 items-center text-3xl font-[manga] text-[#FFF01F] hidden md:block">
          Weeb-World
        </div>
        <div className="flex flex-row md:flex-col flex-grow items-center gap-2 md:gap-4">
          <NavLink
            to="/"
            exact
            className={`flex items-center w-full md:w-full  md:px-2 md:py-1 text-2xl rounded-full md:text-xl lg:text-md font-[manga] ${
              location.pathname === '/Home' ? 'text-[#FFF01F] bg-black ' : ''
            }`}
          >
            <AiOutlineHome className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Home</span>
          </NavLink>
          <NavLink
            to="/explore"
            className={`flex items-center w-full md:w-full  md:px-2 md:py-1 text-2xl rounded-full md:text-xl lg:text-md font-[manga] ${
              location.pathname === '/explore' ? 'text-[#FFF01F] bg-black ' : ''
            }`}
          >
            <AiOutlineCompass className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Explore</span>
          </NavLink>
          <NavLink
            to="/users"
            className={`flex items-center w-full md:w-full  md:px-2 md:py-1 text-2xl rounded-full md:text-xl lg:text-md font-[manga] ${
              location.pathname === '/users' ? 'text-[#FFF01F] bg-black ' : ''
            }`}
          >
            <FaUserFriends className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Users</span>
          </NavLink>
          <NavLink
            to="/Bookmarks"
            className={`flex items-center w-full md:w-full  md:px-2 md:py-1 text-2xl rounded-full md:text-xl lg:text-md font-[manga] ${
              location.pathname === '/Bookmarks' ? 'text-[#FFF01F] bg-black ' : ''
            }`}
          >
            <BiBookmark className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Bookmarks</span>
          </NavLink>
          <div
            className={`flex items-center w-full md:w-full  md:px-2 md:py-1 text-2xl rounded-lg md:text-xl lg:text-md font-[manga] cursor-pointer`}
            onClick={handleLogout}
          >
            <AiOutlineLogout className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Logout</span>
          </div>
          <div className={`flex items-center w-full md:w-full  md:px-2 md:py-1 text-2xl rounded-lg md:text-xl lg:text-md font-[manga] cursor-pointer`}>
          <button 
                className='md:bg-[#FFF01F] w-fit md:hover:bg-[rgba(0,0,0,0.8)] md:hover:text-[#FFF01F] md:hover:border-white md:hover:border-1 text-2xl md:text-2xl md:text-[rgba(0,0,0,0.8)] md:font-bold mt-0  md:py-2 md:px-12 border-1 border-black rounded'
              onClick={()=>setShowAddPost(true)}>
                <span className='hidden md:block'>Post</span><span className='block md:hidden'><AiOutlinePlus className="inline m-2 md:text-3xl"  /></span>
          </button>
          </div>
        </div>
        
        <div className="flex  items-center justify-center text-lg md:text-2xl md:mb-8 rounded-lg">
          <NavLink to={`/profile/${stateAuth.userDetails[0]?.username ?? ''}`} className="flex items-center justify-center space-x-4 px-3">
            <img className="w-10 h-10 rounded-full" src={stateAuth.userDetails[0]?.avatar} alt="pfp" />
            <div className="font-medium text-left w-fit hidden md:block">
              <div>
                {stateAuth.userDetails[0]?.firstName} {stateAuth.userDetails[0]?.lastName}
              </div>
              <div className="text-sm">@{stateAuth.userDetails[0]?.username}</div>
            </div>
          </NavLink>
        </div>
      </div>
      {showAddPost&&<AddPostModal setShowAddPost={setShowAddPost}/>}
    </div>
  );
}

export default Nav;
