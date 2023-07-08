import axios from "axios";

export const getAllPostsService=async(dispatchPost)=>{
    try{
        const res =await axios({
            method: 'get',
            url: '/api/posts',
          });
          if(res.status===200)
          {
            dispatchPost({
              type: "GET_POST",
              payload: res.data.posts,
            })
          }
        }
    catch(e)
    {
        console.error(e)
    }
}