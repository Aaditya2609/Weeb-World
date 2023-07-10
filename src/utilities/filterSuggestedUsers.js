export function filterAuthorizedUsers(allUsers, authUser) {
  const authUserFollowing = (authUser && authUser.following) || [];

  const unauthorizedUsers = allUsers?.filter(user => {
    return !authUserFollowing.find(followedUser => followedUser._id === user._id);
  });

  const finalUsers = unauthorizedUsers.filter(item => item.username !== (authUser && authUser.username));
  return finalUsers;
}
