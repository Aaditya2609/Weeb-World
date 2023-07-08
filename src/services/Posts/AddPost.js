import axios from "axios";
import { toast } from "react-toastify";

export const AddPostsService=async(content,dispatchPost)=>{
    const token = localStorage.getItem("Token");
    try{
        const res =await axios({
            method: 'POST',
            url: '/api/posts/',
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

            toast.success("Posted", {
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