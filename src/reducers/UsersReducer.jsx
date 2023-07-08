export const UsersReducer = (stateUsers, actionUsers) => {
  switch (actionUsers.type) {
    case "GET_USERS":
      return { ...stateUsers, users: actionUsers.payload };

    case "GET_BOOKMARKS":
      return { ...stateUsers, bookmarks: actionUsers.payload };

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
