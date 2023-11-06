import GetAllUsers from "../classes/GetAllUsers";

const { default: backendUrl } = require("../utils/url");

const Users = async () => {
  try {
    document.querySelector(".gridMain").innerHTML = `<h2>Users List:</h2>`;
    const { data } = await axios.get(backendUrl("users"), {
      withCredentials: true,
    });
    const { users } = data;
    users.map((item) => {
      let userslist = new GetAllUsers(".gridMain", item);
      userslist.render();
    });
  } catch (error) {
    console.error(error.response.data.msg);
  }
};

export default Users;
