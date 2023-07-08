import axios from "axios";

export const getAllUsersService=async(dispatchUsers)=>{
    try{
        const res =await axios({
            method: 'get',
            url: '/api/users',
          });
          if(res.status===200)
          {
            dispatchUsers({
              type: "GET_USERS",
              payload: res.data.users,
            })
          }
        }
    catch(e)
    {
        console.error(e)
    }
}