import PostClass from "../../classes/Posts/PostClass";
import UpdatePostClass from "../../classes/Posts/UpdatePostClass";
import backendUrl from "../../utils/url";

const SinglePost = async (id, isUpdate = false) => {
  document.querySelector(".gridMain").innerHTML = "";

  try {
    const { data } = await axios.get(backendUrl("posts", `/${id}`), {
      withCredentials: true,
    });

    if (isUpdate) {
      let updatePost = new UpdatePostClass(".gridMain", data.singlePost);
      updatePost.render();
    } else {
      let onePost = new PostClass(".gridMain", data.singlePost, true);
      onePost.render();
    }
  } catch (error) {
    console.error(error.response.data.msg);
  }
};

export default SinglePost;
