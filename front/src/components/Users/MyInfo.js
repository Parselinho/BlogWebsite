import MyInfoClass from "../../classes/Users/MyInfoClass";
import backendUrl from "../../utils/url";

const MyInfo = async () => {
  try {
    const { data } = await axios.get(backendUrl("users", "/myinfo"), {
      withCredentials: true,
    });
    const { user } = data;
    const myInforender = new MyInfoClass(".gridMain", user);
    myInforender.render();
  } catch (error) {
    console.log(error.response.data.msg);
  }
};

export default MyInfo;
