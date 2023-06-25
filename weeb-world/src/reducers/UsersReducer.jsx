export const UsersReducer = (stateUsers, actionUsers) => {
    switch (actionUsers.type) {
      case "GET_USERS":
        return { ...stateUsers,  users: actionUsers.payload };
  
      case "GET_BOOKMARKS":
        return { ...stateUsers,  bookmarks: actionUsers.payload };
       
        default:
          return stateUsers;
    }
    
}