import React, {  useState } from 'react';
import { EditPostsService } from '../services/Posts/EditPost';
import { usePost } from '../contexts/PostContext';

function EditModal({ setShowEditModal, editPost }) {
    const {dispatchPost}=usePost();
    const [tempContent, setTempContent] = useState(editPost.content)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileURL = URL.createObjectURL(file);
        setTempContent({ ...tempContent, imageURL: fileURL });
      };
    
      const handleEdit=()=>{
        EditPostsService(tempContent,dispatchPost,editPost._id);
        setShowEditModal(false)
      }


    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Edit Post</h1>
                    <button
                        className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-xl text-[rgba(0,0,0,1)] font-bold my-4 py-2 px-4 border rounded whitespace-nowrap"
                        onClick={() => setShowEditModal(false)}
                    >
                        X
                    </button>
                </div>
                <div>
                    <textarea
                        rows="3"
                        className="block p-2 w-full text-md text-gray-900 bg-white border border-gray-300 rounded-xl"
                        value={tempContent.text}
                        onChange={(e) => setTempContent({ ...tempContent, text: e.target.value })}
                    ></textarea>
                    <img src={tempContent.imageURL} className='h-auto w-32 m-4 mx-auto' />
                    <button onClick={()=>setTempContent({...tempContent,imageURL:""})}>Remove Image</button>
<label
                className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-2xl text-[rgba(0,0,0,1)] font-bold my-2 py-2 px-4 border rounded whitespace-nowrap"
              >
                Change File
                <input
                type="file"
                id="imageInput"
                className='hidden'
                onChange={handleImageChange}
              />
              </label>
            
                </div>
                <div className="flex">
                    <button onClick={handleEdit} className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-2xl text-[rgba(0,0,0,1)] font-bold my-4 py-2 px-6 border rounded whitespace-nowrap">
                        Update
                    </button>
                    <button
                        className="m-1 flex items-center bg-[#FFF01F] hover:bg-[rgba(0,0,0,1)] hover:text-[#FFF01F] text-2xl text-[rgba(0,0,0,1)] font-bold my-4 py-2 px-6 border rounded whitespace-nowrap"
                        onClick={() => setShowEditModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
