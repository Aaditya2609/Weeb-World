import React, { useEffect, useState } from 'react';
import { useUsers } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { FollowUserService } from '../services/Users/Follow';
import { filterAuthorizedUsers } from '../utilities/filterSuggestedUsers';
import { NavLink } from 'react-router-dom';

function SuggestedUsers() {
  const { stateUsers, dispatchUsers } = useUsers();
  const { stateAuth, dispatchAuth } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (stateUsers.users.length > 0 && stateAuth.userDetails.length > 0) {
      const authUser = stateAuth.userDetails[0];
      const unauthorizedUsers = filterAuthorizedUsers(stateUsers.users, authUser);
      setFilteredUsers(unauthorizedUsers);
    }
  }, [stateUsers.users, stateAuth.userDetails]);

  const handleFollow = (item) => {
    const user = stateUsers.users.find((u) => u.username === stateAuth?.userDetails[0]?.username);
    const followUser = item;
    FollowUserService(dispatchUsers, user, followUser, dispatchAuth);
  };

  return (
    <div className='w-3/12 max-h-full px-2 bg-[rgba(0,0,0,0.8)] text-white rounded-b-xl hidden md:block'>
      <h1 className='text-3xl self-start my-4 font-bold font-[manga] text-[#FFF01F]'>Suggested Users</h1>
      <div className='mb-4'>
        {filteredUsers.map((item) => (
          <div className='my-2' key={item._id}>
            <NavLink to={`/profile/${item.username}`}>
            <div className='flex grow-0 items-center'>
              <img className='w-10 h-10 rounded-full mr-2' src={item.avatar} alt='pfp' />
              <div className='font-medium text-left w-6/12'>
                <div className='text-md md:text-sm'>{item.firstName} {item.lastName}</div>
                <div className='text-xs'>@{item.username}</div>
              </div>
              <button
                className='bg-[#FFF01F] w-6/12 hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F] hover:border-white hover:border-1 text-md md:text-sm text-[rgba(0,0,0,0.8)] font-bold m-1 py-2 px-1 border-1 border-black rounded'
                onClick={() => handleFollow(item)}
              >
                + Follow
              </button>
            </div>
            </NavLink>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default SuggestedUsers;
