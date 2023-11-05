import backendUrl from "../utils/url";

const MyInfo = async () => {
  try {
    const { data } = await axios.get(backendUrl("users", "/myinfo"), {
      withCredentials: true,
    });
    const { user } = data;
    if (user.comments.length <= 0) {
      console.log("good");
    }
    if (!user.comments) {
      console.log("good two");
    }
    if (user.posts.length > 0) {
      console.log("good three");
    }
    if (!user.posts) {
      console.log("good Four");
    }
    console.log(data);
  } catch (error) {
    console.log(error.response.data.msg);
  }
};

export default MyInfo;
