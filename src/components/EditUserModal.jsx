import React, { useState } from 'react'
import { EditUserService } from '../services/Users/EditUser'
import { useAuth } from '../contexts/AuthContext'
import { useUsers } from '../contexts/UserContext'

function EditUserModal({ user, setShowEditUser }) {
    const { dispatchAuth } = useAuth();
    const { dispatchUsers } = useUsers();
    const avatars = [
        { url: "https://wallpapers-clan.com/wp-content/uploads/2023/01/chibi-anime-pfp-9.jpg" },
        { url: "https://wallpapers-clan.com/wp-content/uploads/2023/01/chibi-anime-pfp-1.jpg" },
        { url: "https://wallpapers-clan.com/wp-content/uploads/2023/01/chibi-anime-pfp-12.jpg" },
        { url: "https://wallpapers-clan.com/wp-content/uploads/2023/01/chibi-anime-pfp-5.jpg" },
        { url: "https://wallpapers-clan.com/wp-content/uploads/2023/01/chibi-anime-pfp-7.jpg" },
        { url: "https://wallpapers-clan.com/wp-content/uploads/2023/01/chibi-anime-pfp-26.jpg" }]
    const [tempUser, setTempUser] = useState(user)
    const handleAvatarChange = (url) => {
        const temp = { ...tempUser, avatar: url }
        setTempUser(temp)

    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setTempUser({ ...tempUser, avatar: fileURL });
    };

    const handleBioChange = (value) => {
        const temp = { ...tempUser, bio: value }
        setTempUser(temp)
    }
    const handleWebsiteChange = (value) => {
        const temp = { ...tempUser, website: value }
        setTempUser(temp)
    }

    const handleEdit = () => {
        setShowEditUser(false)
        EditUserService(tempUser,dispatchAuth,dispatchUsers)
    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white w-fit p-4 rounded-xl ">
                <div className="flex justify-between items-center">
                    <h1 className="p-4 text-3xl">Edit User</h1>
                    <button
                        className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-xl text-[rgba(0,0,0,1)] font-bold my-4 py-2 px-4 border rounded whitespace-nowrap"
                        onClick={() => setShowEditUser(false)}
                    >
                        X
                    </button>
                </div>


                <div className='flex flex-col items-center'>
                    <img className="w-28 h-28 mb-3 rounded-full shadow-lg" src={tempUser.avatar} alt="pfp" />
                    <p>Change Avatar:</p>
                    <div className='flex items-center justify-center'>
                        {avatars.map(item => <img key={item.url} className="w-12 h-12 mb-3  rounded-full shadow-lg" src={item.url} alt="pfp" onClick={() => handleAvatarChange(item.url)} />)}
                    </div>
                    <div>
                        <label
                            className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-lg text-[rgba(0,0,0,1)]  my-1 py-1 px-2 border rounded whitespace-nowrap"
                        >
                            Add Custom Avatar
                            <input
                                type="file"
                                id="imageInput"
                                className='hidden'
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    <div className='flex justify-between w-[80%] text-lg'>
                        <p>Name</p>
                        <p>{tempUser.firstName} {tempUser.lastName}</p>
                    </div>
                    <div className='flex justify-between w-[80%] text-lg'>
                        <p>Username</p>
                        <p>{tempUser.username}</p>
                    </div>
                    <div className='flex justify-between w-[80%] text-lg'>
                        <p>Bio</p>
                        <textarea rows="3" value={tempUser.bio} className='w-[65%] mb-2 border-2 border-black rounded-lg p-1 text-sm' onChange={(e) => handleBioChange(e.target.value)}></textarea>
                    </div>
                    <div className='flex justify-between w-[80%] text-lg '>
                        <p>Website</p>
                        <input value={tempUser.website} className=' w-[65%] rounded-lg text-sm p-1 border-2 border-black' onChange={(e) => handleWebsiteChange(e.target.value)}></input>
                    </div>
                </div>

                <div className="flex w-full justify-between">
                    <button onClick={() => handleEdit()} className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-2xl text-[rgba(0,0,0,1)] font-bold my-4 py-2 px-6 border rounded whitespace-nowrap">
                        Update
                    </button>
                    <button
                        className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-2xl text-[rgba(0,0,0,1)] font-bold my-4 py-2 px-6 border rounded whitespace-nowrap"
                        onClick={() => setShowEditUser(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditUserModal