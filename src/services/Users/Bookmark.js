import axios from "axios";

export const BookmarkPostService = async (dispatchUsers,postId) => {
    const token = localStorage.getItem("Token");
    try {
        const res = await axios({
            method: 'post',
            url: `/api/users/bookmark/${postId}`,
            headers: {
                authorization: token
            },
        });
        if (res.status === 200) {
            dispatchUsers({
                type: "GET_BOOKMARKS",
                payload: res.data.bookmarks,
              })
        }
    }
    catch (e) {
        console.error(e)
    }
}