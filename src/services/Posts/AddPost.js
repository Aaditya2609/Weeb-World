import axios from "axios";

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
          }
        }
    catch(e)
    {
        
        console.error(e)
    }
}