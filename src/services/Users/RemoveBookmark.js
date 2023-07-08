import axios from "axios";

export const RemoveBookmarkService = async (dispatchUsers,postId) => {
    const token = localStorage.getItem("Token");
    try {
        const res = await axios({
            method: 'post',
            url: `/api/users/remove-bookmark/${postId}`,
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