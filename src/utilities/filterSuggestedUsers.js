export function filterAuthorizedUsers(allUsers, authUser) {
    const authUserFollowing = authUser.following || [];
  
    const unauthorizedUsers = allUsers.filter(user => {
      return !authUserFollowing.find(followedUser => followedUser.id === user.id);
    });
  
    const finalUsers=unauthorizedUsers.filter(item=>item.username!==authUser.username)
    return finalUsers;
  }
  