import axios from "axios";
import { toast } from "react-toastify";

export const EditPostsService=async(content,dispatchPost,postId)=>{
    const token = localStorage.getItem("Token");
    try{
        const res =await axios({
            method: 'POST',
            url: `/api/posts/edit/${postId}`,
            headers: {
                authorization: token
            },
            data: {
                postData: {content},
              }
          });
          if(res.status===201)
          {
            dispatchPost({
              type: "GET_POST",
              payload: res.data.posts,
            })

            toast.success("Post Updated", {
                position: "bottom-center",
                autoClose: 2000,
              });
          }
        }
    catch(e)
    {
        
        console.error(e)
    }
}