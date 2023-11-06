import GetSingleUser from "../classes/GetSignleUser";
import backendUrl from "../utils/url";
import parseRequestUrl from "../utils/utils";

const singleUser = async () => {
  const request = parseRequestUrl();
  const userId = request.id;
  try {
    const { data } = await axios.get(backendUrl("users", `/${userId}`), {
      withCredentials: true,
    });
    let specificUser = new GetSingleUser(".gridMain", data.user);
    specificUser.render();
  } catch (error) {
    console.error(error.response.data.msg);
  }
};

export default singleUser;
