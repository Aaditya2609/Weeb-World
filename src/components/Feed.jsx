import React, { useEffect, useState } from 'react';
import { usePost } from '../contexts/PostContext';
import { AiOutlineDelete, AiOutlineEdit, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarksFill } from "react-icons/bs";
import { useUsers } from '../contexts/UserContext';
import { LikePostService } from '../services/Posts/LikePost';
import { useAuth } from '../contexts/AuthContext';
import { DisLikePostService } from '../services/Posts/DislikePost';
import { DeletePostService } from '../services/Posts/DeletePost';
import EditModal from './EditModal';
import { BookmarkPostService } from '../services/Users/Bookmark';
import { RemoveBookmarkService } from '../services/Users/RemoveBookmark';
import { NavLink } from 'react-router-dom';
import { sortPosts } from '../utilities/trendingLatestFilters';



function Feed() {

  const { stateAuth } = useAuth();
  const { statePost, dispatchPost } = usePost();
  const { stateUsers, dispatchUsers } = useUsers();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [filter, setFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
      const finalFilter = sortPosts(statePost.post, filter)
      setFilteredPosts(finalFilter);
  }, [filter, statePost.post])


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
    return item.likes.likedBy.find(items => items.username === stateAuth.userDetails[0].username) ?
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
    <div className="w-12/12 md:w-10/12 flex flex-col h-[100vh] overflow-auto">
      <div className='bg-[rgba(0,0,0,0.8)] w-10/12 md:w-8/12 m-auto  rounded-bl-xl rounded-br-xl '>
        <h1 className="text-3xl self-start my-4 font-bold font-[manga] text-[#FFF01F]">
          EXPLORE
        </h1>
      </div>
      <div className='flex flex-row items-center justify-between  mx-auto gap-2 bg-[rgba(0,0,0,0.8)] w-10/12 md:w-8/12 mt-4 rounded-xl px-4 py-1'>
        <h1 className='font-bold text-xl text-white w-fit'>Filter Posts: </h1>
        <div className='flex'>
        <button onClick={() => setFilter("trending")}
          className="m-1 bg-[#FFF01F] hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F]  text-[rgba(0,0,0,0.8)] font-bold my-2 py-1 px-2 text-md border rounded"
        >
          Trending
        </button>

        <button
          className="m-1 bg-[#FFF01F] hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F]  text-[rgba(0,0,0,0.8)] font-bold my-2 py-1 px-2 text-md border rounded"
          onClick={() => setFilter("latest")}
        >
          Latest
        </button>
        </div>
      </div>

      <div>
        
        {filteredPosts.map((item) => {
          const tempUser = stateUsers?.users?.find(
            (items) => items?.username === item?.username
          );

          return (
            <div
              className="bg-[rgba(0,0,0,0.8)] my-4 w-10/12 md:8/12 p-2  m-auto text-black rounded-xl"
              key={item._id}
            >
              <div className="flex flex-col bg-[rgba(255,255,255,0.8)] rounded-xl">
                <div className="flex items-center pl-2 pt-2 pb-1 gap-1">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={tempUser?.avatar}
                    alt="pfp"
                  />
                  <div className="font-medium text-left  w-10/12">
                  <NavLink className='flex-col items-center gap-2 w-[70%]' to={`/profile/${item.username}`}>
                    <div className="flex items-center lg:text-xl md:text-sm text-xl gap-2">
                      {tempUser?.firstName} {tempUser?.lastName}
                      <div className="text-gray-700 text-sm self-end">
                        {dateFormatFunction(item?.createdAt)}
                      </div>
                    </div>
                    <div className="lg:text-lg text-md">@{tempUser?.username}</div>
                    </NavLink>
                  </div>
                  {item.username === stateAuth.userDetails[0].username ? <div className='flex items-start h-full px-4 md:px-2 text-2xl self-start gap-2'>
                    <button  onClick={() => handleEdit(item)}>
                      <AiOutlineEdit />
                    </button>
                    <button onClick={() => DeletePostService(dispatchPost, item._id)}>
                      <AiOutlineDelete />
                    </button>
                  </div> : <></>}
                </div>

                <div className="text-left px-4 mx-2 pb-2 text-xl text-black">
                  {item.content.text}
                </div>
                <img
                  className="max-w-10/12 mx-auto max-h-full px-8 pb-2"
                  src={item.content.imageURL ? item.content.imageURL : ''}
                />
                <hr className="w-11/12 h-[0.1rem] px-12 mx-auto my-1 bg-black border-0 rounded" />
                <div className="flex px-8 py-1 mx-2 text-2xl justify-between">
                  <button className="text-2xl items-center flex py-1" onClick={() => handleLike(item)}>
                    {item.likes.likedBy.find((items) => items.username === stateAuth.userDetails[0].username) ? (
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
    </div>
  );
}

export default Feed;
