import React, { useEffect, useState } from 'react';
import { usePost } from '../contexts/PostContext';
import { AiOutlineFileImage, AiOutlineDelete, AiOutlineEdit, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsBookmark, BsBookmarksFill } from "react-icons/bs";
import { BsEmojiSmile } from 'react-icons/bs';
import { useUsers } from '../contexts/UserContext';
import { AddPostsService } from '../services/Posts/AddPost';
import { LikePostService } from '../services/Posts/LikePost';
import { useAuth } from '../contexts/AuthContext';
import { DisLikePostService } from '../services/Posts/DislikePost';
import { DeletePostService } from '../services/Posts/DeletePost';
import EditModal from './EditModal';
import { toast } from 'react-toastify';
import { BookmarkPostService } from '../services/Users/Bookmark';
import { RemoveBookmarkService } from '../services/Users/RemoveBookmark';
import { filterPostsByFollowing } from '../utilities/filterPosts';
import { NavLink } from 'react-router-dom';
import { sortPosts } from '../utilities/trendingLatestFilters';
import InputEmoji from 'react-input-emoji'

function HomeFeed() {

  const { stateAuth } = useAuth();
  const { statePost, dispatchPost } = usePost();
  const { stateUsers, dispatchUsers } = useUsers();
  const [content, setContent] = useState({
    text: '',
    imageURL: '',
  });
  const [fileName, setFileName] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (stateUsers.users.length > 0 && stateAuth.userDetails.length > 0) {
      const unauthorizedUsers = filterPostsByFollowing(statePost.post, stateAuth.userDetails[0]);
      const finalFilter = sortPosts(unauthorizedUsers, filter)
      setFilteredPosts(finalFilter);
    }
  }, [stateUsers.users, stateAuth.userDetails, statePost.post, filter])

  const handlePost = () => {
    if (content.text !== "") {
      AddPostsService(content, dispatchPost);
      setContent({ text: '', imageURL: '' });
      setFileName('');
    }
    else {
      toast.warning("Post text cannot be empty", {
        position: "bottom-center",
        autoClose: 1000,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setContent({ ...content, imageURL: fileURL });
      setFileName(file.name);
    }
  };


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
    <div className="w-12/12 md:w-10/12 flex flex-col h-[100vh] overflow-auto">
    
      <div>
        <div className="flex flex-col items-center mx-auto z-100 bg-[rgba(0,0,0,0.8)] w-10/12 md:w-8/12 rounded-b-xl">
          <h1 className="text-3xl self-start ml-8 my-4 font-bold font-[manga] text-[#FFF01F]">
            New Post
          </h1>
          <div className="w-11/12" >
            <textarea
              rows="3"
              className="block p-2 w-full text-md text-gray-900 bg-white  border border-gray-300 rounded-xl"
              placeholder="What's On Your Mind...."
              value={content.text}
              onChange={(e) => setContent({ ...content, text: e.target.value })}
            ></textarea>

          </div>
          <div className="flex justify-between w-full px-4">
            <div className="flex items-center">
              <label
                className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F] text-2xl text-[rgba(0,0,0,0.8)] font-bold my-4 py-2 px-6 border rounded whitespace-nowrap"
              >
                <AiOutlineFileImage />

                <input
                  type="file"
                  id="imageInput"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <span className="text-lg text-white">{fileName}</span>
            </div>
            <button
              type="submit"
              onClick={handlePost}
              className="m-1 bg-[#FFF01F] hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F]  text-[rgba(0,0,0,0.8)] font-bold my-4 py-2 px-6 text-lg border rounded"
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center justify-between mx-auto gap-2 bg-[rgba(0,0,0,0.8)] w-10/12 md:w-8/12 my-2 rounded-xl px-4 py-1'>
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
              className="bg-[rgba(0,0,0,0.8)] mb-1 w-10/12 md:w-8/12 p-2 m-auto text-black rounded-xl"
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

export default HomeFeed;
