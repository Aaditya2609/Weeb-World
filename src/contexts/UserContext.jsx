import { createContext, useContext, useEffect, useReducer } from "react";
import { UsersReducer } from "../reducers/UsersReducer";
import { getAllUsersService } from "../services/Users/GetUsers";

export const UsersContext=createContext();

const useUsers=()=>useContext(UsersContext);


const UsersProvider=({children})=>
{

    const [stateUsers, dispatchUsers] = useReducer(UsersReducer, {
        users:[],
        bookmarks:[]
      });

      useEffect(()=>{
        getAllUsersService(dispatchUsers)
      },[])

return(
<UsersContext.Provider value={{stateUsers,dispatchUsers}}>
    {children}
</UsersContext.Provider>
)
}
export {useUsers,UsersProvider}
