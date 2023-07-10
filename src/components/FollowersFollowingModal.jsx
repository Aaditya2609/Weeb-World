import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { FollowUserService } from '../services/Users/Follow';
import { unfollowUserService } from '../services/Users/Unfollow';

function FollowersFollowingModal({ user, setFollowingModal, value }) {
    const [displayArr, setDisplayArr] = useState(value === "Followers" ? user.followers : user.following);
    const { stateUsers, dispatchUsers } = useUsers();
    const { stateAuth, dispatchAuth } = useAuth();
    const handleFollow = (item) => {
        const user = stateUsers.users.find((u) => u.username === stateAuth?.userDetails[0]?.username);
        const followUser = item;
        unfollowUserService(dispatchUsers, user, followUser, dispatchAuth);
    };
    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
                <div className="bg-white p-4 rounded-xl">
                    <div className="flex justify-between items-center min-w-[30%] gap-16">
                        <h1 className="text-3xl font-bold">{value}</h1>
                        <button
                            className="m-1 flex items-center bg-[#FFF01F] hover:bg-black hover:text-[#FFF01F] text-xl text-black font-bold my-4 py-2 px-4 border rounded whitespace-nowrap"
                            onClick={() => setFollowingModal(false)}
                        >
                            X
                        </button>
                    </div>
                    <div>
                        {displayArr.length ? <div className='mb-4'>
                            {displayArr.map((item) => (
                                <div className='my-2' key={item._id}>
                                    <div className='flex items-center gap-8 justify-between'>
                                        <NavLink className='flex items-center gap-2' to={`/profile/${item.username}`}>
                                            <img className='w-11 h-12 rounded-full' src={item.avatar} alt='pfp' />
                                            <div className='font-medium text-left'>
                                                <div className='text-xl md:text-lg'>{item.firstName} {item.lastName}</div>
                                                <div className='text-xs'>@{item.username}</div>
                                            </div>
                                        </NavLink>
                                        {value==="Following"?<button
                                            className='bg-[#FFF01F] hover:bg-black hover:text-[#FFF01F] hover:border-white hover:border-1 text-md md:text-sm text-black font-bold m-1 py-2 px-1 border-1 border-black rounded'
                                            onClick={() => handleFollow(item)}
                                        >
                                            Unfollow
                                        </button>:<></>}
                                    </div>

                                </div>

                            ))}
                        </div> : <div className='text-2xl font-semibold'>{value === "Followers" ? "No Followers Yet" : "No Following Yet"}</div>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowersFollowingModal