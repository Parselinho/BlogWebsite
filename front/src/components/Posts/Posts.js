import PostClass from "../../classes/Posts/PostClass";
import backendUrl from "../../utils/url";

const Posts = async () => {
  try {
    const { data } = await axios.get(backendUrl("posts"), {
      withCredentials: true,
    });
    const { posts } = data;
    posts.map((post) => {
      let singlePost = new PostClass(".gridMain", post);
      singlePost.render();
    });
  } catch (error) {
    console.error(error);
  }
};

export default Posts;
