export function filterPostsByFollowing(posts, authUser) {
    const authUserFollowing = authUser.following.map(user => user.username);
  
    const filteredPosts = posts.filter(post => {
      return (
        authUserFollowing.includes(post.username) ||
        post.username === authUser.username
      );
    });
  
    return filteredPosts;
  }
  