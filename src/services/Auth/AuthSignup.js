import axios from "axios";
import { toast } from "react-toastify";
export const signupService=async( firstName,
    lastName,
    userName,
    email,
    password,dispatchAuth)=>{
    try{
        const res =await axios({
            method: 'POST',
            url: '/api/auth/signup',
            data: {
                firstName: firstName,
                lastName: lastName,
                username:userName,
                email: email,
                password: password,
            }
          });
          if(res.status===201)
          console.log(res.data)
          {
            dispatchAuth({
                type: "GET_USER_DETAILS",
                payload: res.data.createdUser,
              });
            localStorage.setItem("Token", res.data.encodedToken);
            const userDetails=JSON.stringify(res.data.createdUser)
            localStorage.setItem("userDetail",userDetails)
            toast.success("User Created", {
                position: "bottom-center",
                autoClose: 2000,
              });
        }
    }
    catch(e)
    {
        console.error(e.res)
    }
}