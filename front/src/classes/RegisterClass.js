import backendUrl from "../utils/url.js";

class RegisterClass {
  constructor(parent) {
    this.parent = parent;
  }
  render() {
    const h2 = document.createElement("h2");
    const form = document.createElement("form");
    const errorDiv = document.createElement("div");
    errorDiv.className = "errorMessage";
    h2.textContent = `Registration Form`;
    h2.className = "h2Form";
    form.className = "flexForm";
    document.querySelector(this.parent).append(h2, errorDiv, form);
    form.insertAdjacentHTML(
      "afterbegin",
      `
      <label for="username">Username</label>
      <input type="text" id="username" name="username" />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" />
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" />
      <label for="email">Email</label>
      <input type="email" id="email" name="email" />
      <button type="submit">Join Now</button>
      `
    );

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorDiv.innerHTML = "";
      let userObj = {
        username: form.querySelector("#username").value,
        password: form.querySelector("#password").value,
        confirmPassword: form.querySelector("#confirmPassword").value,
        email: form.querySelector("#email").value,
      };
      try {
        const { data } = await axios.post(backendUrl("users"), userObj, {
          withCredentials: true,
        });
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            userId: data.userId,
            username: data.username,
            role: data.role,
          })
        );
      } catch (error) {
        errorDiv.innerHTML = `${error.response.data.msg}`;
      }
    });
  }
}

export default RegisterClass;
