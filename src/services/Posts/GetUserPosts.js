import axios from "axios";

export const getUserPostsService=async(username,dispatchPost)=>{
    try{
        const res =await axios({
            method: 'get',
            url: `/api/posts/user/${username}`,
          });
        
          if(res.status===200)
          {
            dispatchPost({
              type: "GET_USER_POST",
              payload: res.data.posts,
            })
          }
        }
    catch(e)
    {
        console.error(e)
    }
}