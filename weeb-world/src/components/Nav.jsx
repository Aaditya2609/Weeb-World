import React from 'react';
import { AiOutlineHome, AiOutlineCompass, AiOutlineLogout } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { useAuth } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { usePost } from '../contexts/PostContext';

function Nav() {
  const { stateAuth } = useAuth();
  const { firstName, lastName, username, avatar } = stateAuth?.userDetails[0];

  return (
    <div className="w-[100vw] md:w-3/12">
      <div className="flex flex-row md:flex-col h-20 md:h-full items-center  bg-[rgba(0,0,0,0.8)] text-white">
        <div className="px-4 py-8 mb-4 items-center text-3xl font-[manga] text-[#FFF01F] hidden md:block">Weeb-World</div>
        <div className="flex flex-row md:flex-col flex-grow items-center">
          <button className="flex items-center w-full px-8 py-1 text-2xl rounded-lg md:text-xl lg:text-md font-[manga]">
            <AiOutlineCompass className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Explore</span>
          </button>
          <button className="flex items-center w-full px-8 py-1 text-2xl rounded-lg md:text-xl lg:text-md font-[manga]">
            <AiOutlineHome className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Home</span>
          </button>
          <button className="flex items-center w-full px-8 py-1 text-2xl rounded-lg md:text-xl lg:text-md font-[manga]">
            <BiBookmark className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Bookmarks</span>
          </button>
          <button className="flex items-center w-full px-8 py-1 text-2xl rounded-lg md:text-xl lg:text-md font-[manga]">
            <AiOutlineLogout className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
        <div className="flex  items-center justify-center text-2xl md:mb-8 rounded-lg">
          <NavLink to={`/profile/${username}`}>
          <div className="flex items-center justify-center space-x-4 px-3">
            <img className="w-10 h-10 rounded-full" src={avatar} alt="pfp" />
            <div className="font-medium text-left w-fit">
              <div>{firstName} {lastName}</div>
              <div className="text-sm">@{username}</div>
            </div>
          </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
