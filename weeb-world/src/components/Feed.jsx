import React, { useState } from 'react';
import { usePost } from '../contexts/PostContext';
import { AiOutlineHeart, AiOutlineFileImage } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';
import { BiBookmark } from 'react-icons/bi';
import { useUsers } from '../contexts/UserContext';
import { AddPostsService } from '../services/Posts/AddPost';


function Feed() {


  const { statePost, dispatchPost } = usePost();
  const { stateUsers } = useUsers();
  const [content, setContent] = useState({
    text: '',
    imageURL: '', // Update the key name to imageURL
  });
  const [fileName, setFileName] = useState('');

  const handlePost = () => {
    AddPostsService(content, dispatchPost);
    setContent({ text: '', imageURL: '' }); // Clear both text and imageURL
    setFileName('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setContent({ ...content, imageURL: fileURL }); // Update the key name to imageURL
    setFileName(file.name);
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

  return (
    <div className="w-7/12 mx-auto">
      <div>
        <div className="flex flex-col items-center mx-auto mb-2 z-100 bg-[rgba(0,0,0,0.8)] w-10/12 md:w-12/12 rounded-b-xl">
          <h1 className="text-3xl self-start ml-8 my-4 font-bold font-[manga] text-[#FFF01F]">
            New Post
          </h1>
          <div className="w-11/12">
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
                htmlFor="imageInput"
                className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F] text-2xl text-[rgba(0,0,0,0.8)] font-bold my-4 py-2 px-6 border rounded whitespace-nowrap"
              >
                <AiOutlineFileImage />
              </label>
              <input
                type="file"
                id="imageInput"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-lg text-white">{fileName}</span>
              <button
                type="button"
                className="m-1 bg-[#FFF01F] hover:bg-[rgba(0,0,0,0.8)] hover:text-[#FFF01F]  text-[rgba(0,0,0,0.8)] font-bold my-4 py-2 px-6 text-2xl border rounded"
              >
                <BsEmojiSmile />
              </button>
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

      <div>
        {statePost.post?.map((item) => {
          const tempUser = stateUsers.users.find(
            (items) => items.username === item.username
          );

          return (
            <div
              className="bg-[rgba(0,0,0,0.8)] mb-1 w-10/12 p-2 m-auto text-black rounded-xl"
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
                </div>

                <div className="text-left px-4 mx-2 pb-2 text-xl text-black">
                  {item.content.text}
                </div>
                <img
                  className="max-w-10/12 mx-auto max-h-full px-2 rounded-xl"
                  src={item.content.imageURL ? item.content.imageURL : ''}
                />
                <hr className="w-11/12 h-[0.1rem] px-12 mx-auto my-1 bg-black border-0 rounded" />
                <div className="flex px-8 mx-2 text-2xl justify-between">
                  <button className="text-2xl items-center flex">
                    <AiOutlineHeart />
                    {item.likes.likeCount}
                  </button>
                  <button className="text-2xl items-center flex">
                    <BiBookmark />
                  </button>
                  <button className="text-2xl items-center flex">
                    <BiBookmark />
                  </button>
                  <button className="text-2xl items-center flex">
                    <BiBookmark />
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
      </div>
    </div>
  );
}

export default Feed;
