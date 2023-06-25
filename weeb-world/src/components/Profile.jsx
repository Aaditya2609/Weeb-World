import React from 'react'

function Profile() {


    return (
        <div className="w-5/12 h-fit mx-auto mt-4 p-4 bg-[rgba(0,0,0,0.8)]  rounded-xl">
            <div className="flex flex-col items-center py-10 bg-[rgba(255,255,255,0.8)]  rounded-xl">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://gravatar.com/avatar/f3aa0b8f0a2247df317ba34f8dde7d07?s=400&d=robohash&r=x" alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium ">Name </h5>
                <span className="text-md text-black-300 ">@username</span>
                <span className="text-md ">BIO</span>
                <span className="text-md">url</span>
                <span className="text-md"></span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <button  className="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-black  bg-[#FFF01F] rounded-lg">Edit Profile/Follow/Following</button>
                </div>
                <div className='flex'>
                    <div>Posts</div>
                    <div>Followers</div>
                    <div>Following</div>
                </div>
                <div>
                    <h1>Your Posts</h1>
                </div>
            </div>
        </div>

    )
}

export default Profile