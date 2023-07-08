import React from 'react';
import { AiOutlineHome, AiOutlineCompass, AiOutlineLogout } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { useAuth } from '../contexts/AuthContext';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Nav() {
  const { stateAuth, dispatchAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatchAuth({ type: 'USER_LOGOUT' });
    navigate('/');
    localStorage.clear();
  };

  return (
    <div className="w-[100vw] md:w-[25%]">
      <div className="flex flex-row md:flex-col h-20 md:h-full items-center  bg-[rgba(0,0,0,0.8)] text-white md:p-0 px-4">
        <div className="px-4 py-8 mb-4 items-center text-3xl font-[manga] text-[#FFF01F] hidden md:block">
          Weeb-World
        </div>
        <div className="flex flex-row md:flex-col flex-grow items-center">
          <NavLink
            to="/"
            exact
            className={`flex items-center w-full px-8 py-1 text-2xl rounded-full md:text-xl lg:text-md font-[manga] ${
              location.pathname === '/Home' ? 'text-[#FFF01F] bg-black ' : ''
            }`}
          >
            <AiOutlineCompass className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Home</span>
          </NavLink>
          <NavLink
            to="/explore"
            className={`flex items-center w-full px-8 py-1 text-2xl rounded-full md:text-xl lg:text-md font-[manga] ${
              location.pathname === '/explore' ? 'text-[#FFF01F] bg-black ' : ''
            }`}
          >
            <AiOutlineHome className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Explore</span>
          </NavLink>
          <NavLink
            to="/Bookmarks"
            className={`flex items-center w-full px-8 py-1 text-2xl rounded-full md:text-xl lg:text-md font-[manga] ${
              location.pathname === '/Bookmarks' ? 'text-[#FFF01F] bg-black ' : ''
            }`}
          >
            <BiBookmark className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Bookmarks</span>
          </NavLink>
          <div
            className={`flex items-center w-full px-8 py-1 text-2xl rounded-lg md:text-xl lg:text-md font-[manga] cursor-pointer`}
            onClick={handleLogout}
          >
            <AiOutlineLogout className="inline m-2 md:text-3xl" />
            <span className="hidden md:block">Logout</span>
          </div>
        </div>
        <div className="flex  items-center justify-center text-2xl md:mb-8 rounded-lg">
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
    </div>
  );
}

export default Nav;
