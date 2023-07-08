import axios from "axios";

export const LikePostService = async (dispatchPost,postId) => {
    const token = localStorage.getItem("Token");
    try {
        const res = await axios({
            method: 'post',
            url: `/api/posts/like/${postId}`,
            headers: {
                authorization: token
            },
        });
        if (res.status === 201) {
            console.log(res.data.posts)
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