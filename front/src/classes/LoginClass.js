import backendUrl from "../utils/url.js";

class LoginClass {
  constructor(parent) {
    this.parent = parent;
  }
  render() {
    const h2 = document.createElement("h2");
    const divError = document.createElement("div");
    const form = document.createElement("form");
    h2.textContent = "Login Form";
    h2.className = "h2Form";
    divError.className = "errorMessage";
    form.className = "flexForm";
    document.querySelector(this.parent).append(h2, divError, form);
    form.insertAdjacentHTML(
      "afterbegin",
      `
        <label for="emailLogin">Email:</label>
        <input type="text" id="emailLogin" name="email" />
        <label for="passwordLogin">Password:</label>
        <input type="text" id="passwordLogin" name="password" />
        <button type="submit">Submit</button>
    `
    );
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      divError.textContent = "";
      let userLogin = {
        email: form.querySelector("#emailLogin").value,
        password: form.querySelector("#passwordLogin").value,
      };
      try {
        const { data } = await axios.post(
          backendUrl("users", "/login"),
          userLogin,
          {
            withCredentials: true,
          }
        );
        sessionStorage.setItem("user", JSON.stringify(data.username));
      } catch (error) {
        divError.innerHTML = `${error.response.data.msg}`;
      }
    });
  }
}

export default LoginClass;
