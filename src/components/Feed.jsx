import React, {  useState } from 'react';
import { usePost } from '../contexts/PostContext';
import { AiOutlineFileImage, AiFillLike, AiFillDislike, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsBookmark,BsBookmarksFill } from "react-icons/bs";
import { useUsers } from '../contexts/UserContext';
import { LikePostService } from '../services/Posts/LikePost';
import { useAuth } from '../contexts/AuthContext';
import { DisLikePostService } from '../services/Posts/DislikePost';
import { DeletePostService } from '../services/Posts/DeletePost';
import EditModal from './EditModal';
import { BookmarkPostService } from '../services/Users/Bookmark';
import { RemoveBookmarkService } from '../services/Users/RemoveBookmark';


function Feed() {

  const { stateAuth } = useAuth();
  const { statePost, dispatchPost } = usePost();
  const { stateUsers,dispatchUsers } = useUsers();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState(null);






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

  const handleBookmark =(item)=>{
    return stateUsers.bookmarks.find(items => items._id === item._id) ?
      RemoveBookmarkService(dispatchUsers, item._id) : BookmarkPostService(dispatchUsers, item._id)

  }


  return (
    <div className="w-12/12 md:w-10/12 flex flex-col h-[100vh] overflow-auto">
      <div className='bg-[rgba(0,0,0,0.8)] w-8/12 m-auto  rounded-bl-xl rounded-br-xl '>
      <h1 className="text-3xl self-start ml-8 my-4 font-bold font-[manga] text-[#FFF01F]">
            EXPLORE
          </h1>
      </div>

      <div>
        {statePost.post?.map((item) => {
          const tempUser = stateUsers?.users?.find(
            (items) => items?.username === item?.username
          );

          return (
            <div
              className="bg-[rgba(0,0,0,0.8)] my-4 w-8/12 p-2  m-auto text-black rounded-xl"
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
                  {item.username === stateAuth.userDetails[0].username ? <div className='flex  items-start h-full text-2xl self-start'>
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
                  className="max-w-10/12 mx-auto max-h-full px-8 pb-2"
                  src={item.content.imageURL ? item.content.imageURL : ''}
                />
                <hr className="w-11/12 h-[0.1rem] px-12 mx-auto my-1 bg-black border-0 rounded" />
                <div className="flex px-8 py-1 mx-2 text-2xl justify-between">
                  <button className="text-2xl items-center flex py-1" onClick={() => handleLike(item)}>
                    {item.likes.likedBy.find((items) => items.username === stateAuth.userDetails[0].username) ? (
                      <AiFillDislike />
                    ) : (
                      <AiFillLike />
                    )}
                    {item.likes.likeCount > 0 && (
                      <div className="text-base mx-2">{item.likes.likeCount}</div>
                    )}
                  </button>
                  <button className="text-2xl items-center flex" onClick={()=>handleBookmark(item)}>
                    {stateUsers.bookmarks.find(items => items._id === item._id)
                    ?<BsBookmarksFill />:<BsBookmark/>}
                    
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
  );
}

export default Feed;
