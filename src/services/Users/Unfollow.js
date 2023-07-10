import axios from "axios";

export const unfollowUserService=async(dispatchUser,user,followUser,dispatchAuth)=>{
    const token = localStorage.getItem("Token");
    try{
        const res =await axios({
            method: 'POST',
            url: `/api/users/unfollow/${followUser._id}`,
            headers: {
                authorization: token
            }

          });
          if(res.status===200)
          {
            const userDetails=JSON.stringify(res.data.user)
              localStorage.setItem("userDetail",userDetails)
              dispatchAuth({
                type: "GET_USER_DETAILS",
                payload: res.data.user,
              })
              dispatchUser({
                type: "UPDATE_USER",
                payload: res.data.user,
              })
              dispatchUser({
                type: "UPDATE_USER",
                payload: res.data.followUser,
              })

          }
        }
    catch(e)
    {
        
        console.error(e)
    }
}