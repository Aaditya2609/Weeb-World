import React, { useState } from 'react'
import { AddPostsService } from '../services/Posts/AddPost';
import { usePost } from '../contexts/PostContext';
import { toast } from 'react-toastify';
import { AiOutlineFileImage } from 'react-icons/ai';
import { BsEmojiSmile } from 'react-icons/bs';


function AddPostModal({ setShowAddPost }) {
    const { statePost, dispatchPost } = usePost();
    const [content, setContent] = useState({
        text: '',
        imageURL: '',
    });
    const [fileName, setFileName] = useState('');
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
        setShowAddPost(false)
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileURL = URL.createObjectURL(file);
            setContent({ ...content, imageURL: fileURL });
            setFileName(file.name);
        }
    };


    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-100">
                <div className="bg-[rgba(255,255,255,0.8)] p-4 rounded-xl w-[35%] ">
                    <div className="flex justify-between items-center">
                    <h1 className="text-3xl self-start px-4 my-4 font-bold font-[manga] text-black">
                            New Post
                        </h1>
                        <button
                            className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-xl text-[rgba(0,0,0,1)] font-bold my-4 py-2 px-4 border rounded whitespace-nowrap"
                            onClick={() => setShowAddPost(false)}
                        >
                            X
                        </button>
                    </div>


                    <div className="flex flex-col items-center mx-auto z-100  w-12/12 rounded-xl">
                        <div className="w-11/12" >
                            <textarea
                                rows="3"
                                className="block p-2 w-full text-md text-gray-900  border border-black rounded-xl"
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
                                <span className="text-lg text-black">{fileName}</span>
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
            </div>
        </div>
    )
}

export default AddPostModal