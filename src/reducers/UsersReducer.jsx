export const UsersReducer = (stateUsers, actionUsers) => {
  switch (actionUsers.type) {
    case "GET_USERS": 
      const localusers=localStorage.getItem("localusers")
      const localUsersObject=JSON.parse(localusers)
      if(localUsersObject)
      {
      return { ...stateUsers, users: localUsersObject };
      }
      else
      return { ...stateUsers, users: actionUsers.payload };

    case "GET_BOOKMARKS":
      return { ...stateUsers, bookmarks: actionUsers.payload };

    case "ADD_USERS":
      const allUsers=[...stateUsers.users,actionUsers.payload]
      const allUserData=JSON.stringify(allUsers);
      localStorage.setItem("localusers",allUserData);
     return { ...stateUsers, users:allUsers };

    case "UPDATE_USER":
      const updatedUsers = stateUsers.users.map(user => {
        if (user._id === actionUsers.payload._id) {
          return actionUsers.payload;
        }
        return user; 
      });
      return { ...stateUsers, users: updatedUsers };

    default:
      return stateUsers;
  }
};
