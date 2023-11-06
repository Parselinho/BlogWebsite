import backendUrl from "../utils/url";

class UserUpdate {
  constructor(parent, user) {
    this.parent = parent;
    this.id = user._id;
    this.username = user.username;
    this.email = user.email;
  }
  render() {
    const h2 = document.createElement("h2");
    const divError = document.createElement("div");
    const form = document.createElement("form");
    h2.className = "h2Form";
    h2.textContent = "Update Your Info";
    divError.className = "errorMessage";
    form.className = "flexForm";
    document.querySelector(this.parent).append(h2, divError, form);
    form.insertAdjacentHTML(
      "afterbegin",
      `
    <label for="emailUpdate">Email:</label>
    <input type="text" id="emailUpdate" name="email" value=${this.email} />
    <label for="usernameUpdate">Username:</label>
    <input type="text" id="usernameUpdate" name="username" value=${this.username} />
    <button type="submit">Submit</button>
    `
    );
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      divError.textContent = "";
      let updatedUser = {
        email: form.querySelector("#emailUpdate").value,
        username: form.querySelector("#usernameUpdate").value,
      };
      try {
        const { data } = await axios.patch(
          backendUrl("users", `/${this.id}`),
          updatedUser,
          { withCredentials: true }
        );
        console.log(data);
        const existUserData = JSON.parse(sessionStorage.getItem("user"));
        existUserData.username = data.user.username;
        sessionStorage.setItem("user", JSON.stringify(existUserData));
      } catch (error) {
        divError.textContent = `${error.response.data.msg}`;
      }
    });
  }
}

export default UserUpdate;
