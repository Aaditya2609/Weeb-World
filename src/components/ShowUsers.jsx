import React, { useEffect, useState } from 'react';
import { useUsers } from '../contexts/UserContext';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { unfollowUserService } from '../services/Users/Unfollow';
import { FollowUserService } from '../services/Users/Follow';

function ShowUsers() {
  const { stateUsers, dispatchUsers } = useUsers();
  const { stateAuth, dispatchAuth } = useAuth();
  const [key, setKey] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const temp = stateUsers.users.filter(
      (item) =>
        item.firstName.toLowerCase().includes(key.toLowerCase()) ||
        item.lastName.toLowerCase().includes(key.toLowerCase()) ||
        item.username.toLowerCase().includes(key.toLowerCase())
    );

    const filteredTemp = temp.filter(
      (item) => item.username !== stateAuth.userDetails[0].username
    );

    setFilteredUsers(filteredTemp);
  }, [key, stateUsers.users, stateAuth.userDetails]);

  const handleUnfollow = (item) => {
    const user = stateUsers.users.find(
      (u) => u.username === stateAuth?.userDetails[0]?.username
    );
    const followUser = item;
    unfollowUserService(dispatchUsers, user, followUser, dispatchAuth);
  };

  const handlefollow = (item) => {
    const user = stateUsers.users.find(
      (u) => u.username === stateAuth?.userDetails[0]?.username
    );
    const followUser = item;
    FollowUserService(dispatchUsers, user, followUser, dispatchAuth);
  };

  return (
    <div className="w-full flex flex-col h-[100vh] items-center ">
      <div className="bg-[rgba(0,0,0,0.8)] mb-1 w-10/12 md:w-10/12 p-2 text-white rounded-xl overflow-auto">
        <h1 className="font-bold text-3xl font-[manga] text-[#FFF01F] mt-2">
          Search Users
        </h1>
        <input
          placeholder="Search Users"
          className="p-1 rounded-xl my-4 text-2xl text-black"
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="bg-[rgba(0,0,0,0.8)] mb-1 w-10/12 md:w-10/12 p-2 text-white rounded-xl">
        <div><h1 className="font-bold text-3xl font-[manga] text-[#FFF01F] mt-2">
          {key===""?"Showing All Users":`Showing users containing "${key}"`}
        </h1>
          {filteredUsers.map((item) => (
            <div className="bg-[rgba(255,255,255,0.8)] p-2 m-2 rounded-xl" key={item.username}>
              <div className="flex items-center gap-4 text-black justify-between">
                <NavLink className="flex items-center gap-2" to={`/profile/${item.username}`}>
                  <img className="w-10 h-10 rounded-full" src={item.avatar} alt="pfp" />
                  <div className="font-medium text-left">
                    <div className="text-xl">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-lg">@{item.username}</div>
                  </div>
                </NavLink>
                <div
                  className="bg-[#FFF01F] hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F] hover:border-white hover:border-1 text-xl text-[rgba(0,0,0,0.8)] font-bold m-1 py-2 px-4 border-1 border-black rounded"
                >
                  {item.followers.some((follower) => follower.username === stateAuth.userDetails[0].username) ? (
                    <button onClick={() => handleUnfollow(item)}>Unfollow</button>
                  ) : (
                    <button onClick={() => handlefollow(item)}>+ Follow</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowUsers;
