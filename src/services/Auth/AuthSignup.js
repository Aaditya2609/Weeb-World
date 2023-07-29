import axios from "axios";
import { toast } from "react-toastify";
export const signupService=async( firstName,
    lastName,
    userName,
    email,
    password,dispatchAuth,dispatchUsers)=>{
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
                avatar:"https://wallpapers-clan.com/wp-content/uploads/2023/01/naruto-gif-pfp-16.gif",
                cover:"https://c4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-preview.jpg"
            }
          });
          if(res.status===201)
          {
            dispatchAuth({
                type: "GET_USER_DETAILS",
                payload: res.data.createdUser,
              });
            dispatchUsers({
                type: "ADD_USERS",
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