import axios from "axios";

export const DeletePostService = async (dispatchPost,postId) => {
    const token = localStorage.getItem("Token");
    try {
        const res = await axios({
            method: 'delete',
            url: `/api/posts/${postId}`,
            headers: {
                authorization: token
            },
        });
        if (res.status === 201) {
            dispatchPost({
                type: "GET_POST",
                payload: res.data.posts,
              })
        }
    }
    catch (e) {
        console.error(e)
    }
}