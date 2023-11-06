import UserUpdate from "../classes/UserUpdate";
import backendUrl from "../utils/url";
import parseRequestUrl from "../utils/utils";

const UpdateUser = async () => {
  const request = parseRequestUrl();
  const userId = request.id;
  try {
    const { data } = await axios.get(backendUrl("users", `/${userId}`), {
      withCredentials: true,
    });
    let updateUser = new UserUpdate(".gridMain", data.user);
    updateUser.render();
  } catch (error) {
    console.error(error.response.data.msg);
  }
};

export default UpdateUser;
