import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import EditUserModal from './EditUserModal';
import { usePost } from '../contexts/PostContext';
import { getUserPostsService } from '../services/Posts/GetUserPosts';
import { AiFillLike, AiFillDislike, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsBookmark, BsBookmarksFill } from "react-icons/bs";
import { DisLikePostService } from '../services/Posts/DislikePost';
import { LikePostService } from '../services/Posts/LikePost';
import { RemoveBookmarkService } from '../services/Users/RemoveBookmark';
import { BookmarkPostService } from '../services/Users/Bookmark';
import EditModal from './EditModal';
import { DeletePostService } from '../services/Posts/DeletePost';

function Profile() {
    const { stateUsers, dispatchUsers } = useUsers();
    const { stateAuth } = useAuth();
    const { statePost, dispatchPost } = usePost();
    const [editPost, setEditPost] = useState(null);
    const { userName } = useParams();
    const [user, setUser] = useState({});
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        if (stateUsers.users.length > 0 && stateAuth.userDetails.length > 0) {
            const foundUser = stateUsers.users.find(item => item.username === userName)
            setUser(foundUser);
            if (foundUser.username === stateAuth.userDetails[0].username) {
                setIsAuthUser(true)
            }
        }
    }, [stateUsers.users, stateAuth.userDetails,userName]);

    const handleEditUser = () => {
        setShowEditUser(true);
    }
    useEffect(() => {
        getUserPostsService(user?.username, dispatchPost)
        console.log(statePost)
    }, [statePost])

    const dateFormatFunction = (value) => {
        const inputDate = value;
        const dateObj = new Date(inputDate);

        const month = dateObj.toLocaleString('default', { month: 'long' });
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        const formattedDate = `${month} ${day}, ${year}`;

        return <>{formattedDate}</>;
    };

    const handleLike = (item) => {
        return item.likes.likedBy.find(items => items.username === stateAuth.userDetails[0]?.username) ?
            DisLikePostService(dispatchPost, item._id) : LikePostService(dispatchPost, item._id)
    }

    const handleEdit = (item) => {
        setEditPost(item);
        setShowEditModal(true);
    }

    const handleBookmark = (item) => {
        return stateUsers.bookmarks.find(items => items._id === item._id) ?
            RemoveBookmarkService(dispatchUsers, item._id) : BookmarkPostService(dispatchUsers, item._id)
    }
    return (
        <div className="w-12/12 md:w-10/12 max-h-[100vh] mx-auto mt-1 p-4 pt-1 rounded-xl overflow-auto">
            <div className="w-12/12 md:w-10/12 h-fit mx-auto mt-4 p-4 bg-[rgba(0,0,0,0.8)] rounded-xl">
                <div className="flex flex-col items-center py-10 bg-[rgba(255,255,255,0.8)]  rounded-xl">
                    <img className="w-28 h-28 mb-3 rounded-full shadow-lg" src={user.avatar} alt="Bonnie image" />
                    <h5 className="mb-1 text-2xl font-medium ">{user.firstName} {user.lastName}</h5>
                    <span className="text-lg text-black-300 ">@{user.username}</span>
                    <span className="text-lg ">{user.bio}</span>
                    <span className="text-md">{user.website}</span>
                    <span className="text-md"></span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        {isAuthUser ? <button onClick={() => handleEditUser()} className="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-black  bg-[#FFF01F] rounded-lg">Edit Profile</button> :
                            <button className="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-black  bg-[#FFF01F] rounded-lg">Edit Profile/Follow/Unfollow</button>}
                    </div>

                    <div className='flex gap-4 my-4 font-bold '>
                        <div>
                            <p>Posts</p>
                            <p>{statePost.userPost?.length}</p>
                        </div>
                        <div >
                            <p>Followers</p>
                            <p>{user.followers?.length}</p>
                        </div>
                                <div ><p>Following</p>
                            <p>{user.following?.length}</p>
                        </div>
                    </div>

                </div>

                </div>
                <div className="w-12/12 md:w-10/12 items-center mx-auto flex flex-col h-fit bg-[rgba(0,0,0,0.8)]  rounded-xl  my-2 overflow-auto">
                <div className="flex flex-col items-center  justify-center mx-auto mb-2 p-2 z-100 bg-transparent w-12/12 rounded-xl">
                    <div>
                        {statePost.userPost.map((item) => {
                            const tempUser = stateUsers?.users?.find(
                                (items) => items?.username === item?.username
                            );

                            return (
                                <div
                                    className="bg-[rgba(0,0,0,0.8)] mb-1 w-12/12 m-auto my-4 text-black rounded-xl"
                                    key={item._id}
                                >
                                    <div className="flex flex-col bg-[rgba(255,255,255,0.8)] rounded-xl">
                                        <div className="flex items-center space-x-4 px-4 pt-2 pb-1">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={tempUser.avatar}
                                                alt="pfp"
                                            />
                                            <div className="font-medium text-left  w-10/12">
                                                <div className="flex items-center text-xl">
                                                    {tempUser?.firstName} {tempUser?.lastName}
                                                    <div className="text-gray-700 text-sm self-end ml-2">
                                                        {dateFormatFunction(item?.createdAt)}
                                                    </div>
                                                </div>
                                                <div className="text-lg">@{tempUser?.username}</div>
                                            </div>
                                            {item.username === stateAuth.userDetails[0]?.username ? <div className='flex  items-start h-full text-2xl self-start'>
                                                <button className='mx-2' onClick={() => handleEdit(item)}>
                                                    <AiOutlineEdit />
                                                </button>
                                                <button className='mx-2' onClick={() => DeletePostService(dispatchPost, item._id)}>
                                                    <AiOutlineDelete />
                                                </button>
                                            </div> : <></>}
                                        </div>

                                        <div className="text-left px-4 mx-2 pb-2 text-xl text-black">
                                            {item.content.text}
                                        </div>
                                        <img
                                            className="max-w-10/12 mx-auto max-h-full px-2 rounded-xl"
                                            src={item.content.imageURL ? item.content.imageURL : ''}
                                        />
                                        <hr className="w-11/12 h-[0.1rem] px-12 mx-auto my-1 bg-black border-0 rounded" />
                                        <div className="flex px-8 py-1 mx-2 text-2xl justify-between">
                                            <button className="text-2xl items-center flex py-1" onClick={() => handleLike(item)}>
                                                {item.likes.likedBy.find((items) => items.username === stateAuth.userDetails[0]?.username) ? (
                                                    <AiFillDislike />
                                                ) : (
                                                    <AiFillLike />
                                                )}
                                                {item.likes.likeCount > 0 && (
                                                    <div className="text-base mx-2">{item.likes.likeCount}</div>
                                                )}
                                            </button>
                                            <button className="text-2xl items-center flex" onClick={() => handleBookmark(item)}>
                                                {stateUsers.bookmarks.find(items => items._id === item._id)
                                                    ? <BsBookmarksFill /> : <BsBookmark />}

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <button
                            title="Contact Sale"
                            className="fixed z-90 bottom-10 right-1/4 bg-black w-14 h-14 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-[#16444e]"
                        >
                            +
                        </button>
                        {showEditModal && <EditModal setShowEditModal={setShowEditModal} editPost={editPost} />}
                    </div>
                </div>
            </div>
            {showEditUser && <EditUserModal user={user} setShowEditUser={setShowEditUser} />}
        </div>

    )
}

export default Profile