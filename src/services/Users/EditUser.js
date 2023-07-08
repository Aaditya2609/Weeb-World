import axios from "axios";
import { toast } from "react-toastify";

export const EditUserService=async(user,dispatchAuth,dispatchUser)=>{
    const token = localStorage.getItem("Token");
    try{
        const res =await axios({
            method: 'POST',
            url: `/api/users/edit/`,
            headers: {
                authorization: token
            },
            data: {
                userData:user,
              }
          });
          if(res.status===201)
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
            toast.success("Profile Updated", {
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