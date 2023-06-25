import { createContext, useContext, useEffect, useReducer } from "react";
import { PostReducer } from "../reducers/PostReducer";
import { getAllPostsService } from "../services/Posts/GetPosts";

export const PostContext = createContext();

const usePost = () => useContext(PostContext);


const PostProvider = ({ children }) => {

  const [statePost, dispatchPost] = useReducer(PostReducer, {
    post: [],
    userPost:[]
  });

  useEffect(() => {
    getAllPostsService(dispatchPost)
  }, [])

  return (
    <PostContext.Provider value={{ statePost, dispatchPost }}>
      {children}
    </PostContext.Provider>
  )
}
export { usePost, PostProvider }
