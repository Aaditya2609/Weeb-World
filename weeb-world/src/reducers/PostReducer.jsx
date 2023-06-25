export const PostReducer = (statePost, actionPost) => {
    switch (actionPost.type) {
      case "GET_POST":
        return { ...statePost,  post: actionPost.payload };
      case "GET_USER_POST":
          return { ...statePost,  post: actionPost.payload };
      case "GET_BOOKMARKS":
        return { ...statePost,  bookmarks: actionPost.payload };
      default:
        return statePost;
    }
}