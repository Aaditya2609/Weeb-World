import React from 'react'
import { useUsers } from '../contexts/UserContext'
import { useAuth } from '../contexts/AuthContext'

function SuggestedUsers() {
    const { stateUsers } = useUsers()
    const { stateAuth } = useAuth()
    return (
        <div className='w-3/12 fixed right-0 px-2 bg-[rgba(0,0,0,0.8)] text-white rounded-b-xl hidden md:block'>
            <h1 className='text-3xl self-start my-4 font-bold font-[manga] text-[#FFF01F]'>Suggested Users</h1>
            <div className='mb-4'>
                {stateUsers.users?.map(item => {
                    if (item.username !== stateAuth.userDetails[0]?.username)
                        return (
                            <div  className="my-2"key={item._id}>
                                <div className="flex grow-0 items-center ">
                                    <img className="w-10 h-10 rounded-full mr-2" src={item.avatar} alt="pfp" />
                                    <div className="font-medium text-left w-6/12">
                                        <div className='text-md md:text-sm'>{item.firstName} {item.lastName}</div>
                                        <div className="text-xs">@{item.username}</div>
                                    </div>
                                    <button className='bg-[#FFF01F] w-6/12  hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F] hover:border-white hover:border-1 text-md md:text-sm text-[rgba(0,0,0,0.8)] font-bold m-1 py-2 px-1 border-1 border-black rounded'>+ Follow</button>
                                </div>
                            </div>
                        )
                    else return (<div key={1}></div>)
                })}

            </div>
        </div>
    )
}

export default SuggestedUsers