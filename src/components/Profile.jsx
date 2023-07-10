import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import EditUserModal from './EditUserModal';
import { usePost } from '../contexts/PostContext';
import { getUserPostsService } from '../services/Posts/GetUserPosts';
import { AiOutlineDelete, AiOutlineEdit, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarksFill } from "react-icons/bs";
import { DisLikePostService } from '../services/Posts/DislikePost';
import { LikePostService } from '../services/Posts/LikePost';
import { RemoveBookmarkService } from '../services/Users/RemoveBookmark';
import { BookmarkPostService } from '../services/Users/Bookmark';
import EditModal from './EditModal';
import { DeletePostService } from '../services/Posts/DeletePost';
import { NavLink } from 'react-router-dom';
import { unfollowUserService } from '../services/Users/Unfollow';
import { FollowUserService } from '../services/Users/Follow';
import FollowersFollowingModal from './FollowersFollowingModal';

function Profile() {
    const { stateUsers, dispatchUsers } = useUsers();
    const { stateAuth, dispatchAuth } = useAuth();
    const { statePost, dispatchPost } = usePost();
    const [editPost, setEditPost] = useState(null);
    const { userName } = useParams();
    const [user, setUser] = useState({});
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);
    const [followingModalValue, setFollowingModalValue] = useState("")

    useEffect(() => {
        if (stateUsers.users.length > 0 && stateAuth.userDetails.length > 0) {
            const foundUser = stateUsers.users.find(item => item.username === userName)
            setUser(foundUser);
            if (foundUser.username === stateAuth.userDetails[0].username) {
                setIsAuthUser(true)
            }
            else setIsAuthUser(false)
        }
    }, [stateUsers.users, stateAuth.userDetails, userName]);

    const handleEditUser = () => {
        setShowEditUser(true);
    }
    useEffect(() => {
        getUserPostsService(user?.username, dispatchPost)
    }, [dispatchPost, user?.username, statePost.post])

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

    const handleModal = (value) => {
        setFollowingModal(true);
        setFollowingModalValue(value)
    }
    const handleFollow = (item) => {
        const user = stateUsers.users.find((u) => u.username === stateAuth?.userDetails[0]?.username);
        const followUser = item;
        if (stateAuth.userDetails[0].following.find(items => items.username === item.username)) {
            unfollowUserService(dispatchUsers, user, followUser, dispatchAuth);

        }
        else
            FollowUserService(dispatchUsers, user, followUser, dispatchAuth);



    };
    return (
        <div className=" w-12/12 md:w-10/12 h-[100vh] items-center flex-col mt-1 p-4 pt-1 rounded-xl overflow-auto">
            <div className="w-12/12 md:w-8/12 h-fit mx-auto mt-4 p-4 bg-[rgba(0,0,0,0.8)] rounded-xl">
                <div className="flex flex-col items-center  pb-6 bg-[rgba(255,255,255,0.8)]  rounded-xl">
                    <div className={`flex h-[12rem] w-full bg-cover bg-no-repeat bg-center justify-center mb-12 rounded-tr-xl rounded-tl-xl`} style={{
                        backgroundImage: `url(${user.cover})`
                    }}>
                        <img className=" relative top-[65%] w-28 h-28 mb-3 rounded-full shadow-lg" src={user.avatar} alt="pfp" />
                    </div>
                    <h5 className="mb-1 text-2xl font-medium ">{user.firstName} {user.lastName}</h5>
                    <span className="text-xl text-black-300 ">@{user.username}</span>
                    <span className="text-lg ">{user.bio ? <>Bio: {user.bio}</> : <></>}</span>
                    <NavLink to={`${user.website}`} className="text-md text-blue-700">{user.website ? <>{user.website}</> : <></>}</NavLink>
                    <span className="text-md"></span>
                    <div className="flex mt-4 space-x-3 md:mt-4">
                        {isAuthUser ? <button onClick={() => handleEditUser()} className="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-black  bg-[#FFF01F] rounded-lg">Edit Profile</button> :
                            <button className="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-black  bg-[#FFF01F] rounded-lg" onClick={() => handleFollow(user)}>{stateAuth.userDetails[0].following.find(item => item.username === user.username) ? "Unfollow" : "Follow"}</button>}
                    </div>

                    <div className='flex gap-4 mt-4 font-bold '>
                        <div >
                            <p>Posts</p>
                            <p>{statePost.userPost?.length}</p>
                        </div>
                        <div onClick={() => handleModal("Followers")}>
                            <p>Followers</p>
                            <p>{user.followers?.length}</p>
                        </div>
                        <div onClick={() => handleModal("Following")}><p>Following</p>
                            <p>{user.following?.length}</p>
                        </div>
                    </div>

                </div>

            </div>
            <div className="w-12/12 md:w-8/12 items-center mx-auto flex flex-col h-fit bg-[rgba(0,0,0,0.8)]  rounded-xl  my-2 overflow-auto">
                {statePost.userPost.length ? <div className="flex flex-col items-center  justify-center mx-auto mb-2 p-2 z-100 bg-transparent w-12/12 rounded-xl">
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
                                                <NavLink className='flex-col items-center gap-2 w-[57%]' to={`/profile/${item.username}`}>
                                                    <div className="flex items-center text-xl">
                                                        {tempUser?.firstName} {tempUser?.lastName}
                                                        <div className="text-gray-700 text-sm self-end ml-2">
                                                            {dateFormatFunction(item?.createdAt)}
                                                        </div>
                                                    </div>
                                                    <div className="text-lg">@{tempUser?.username}</div>
                                                </NavLink>
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
                                                    <AiFillHeart className='text-[#FF073A]' />
                                                ) : (
                                                    <AiOutlineHeart className='text-[#FF073A]' />
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
                        {showEditModal && <EditModal setShowEditModal={setShowEditModal} editPost={editPost} />}
                    </div>
                </div> : <div className='text-[#FFF01F] text-4xl p-4 w-8/12'>No posts yet </div>}
            </div>
            {showEditUser && <EditUserModal user={user} setShowEditUser={setShowEditUser} />}
            {followingModal && <FollowersFollowingModal user={user} setFollowingModal={setFollowingModal} value={followingModalValue} />}
        </div>

    )
}

export default Profile