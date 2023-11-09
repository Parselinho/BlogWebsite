import backendUrl from "../../utils/url";
import redirectTo from "../../app";

class UpdatePostClass {
  constructor(parent, post) {
    this.parent = parent;
    this.id = post._id;
    this.title = post.title;
    this.body = post.body;
  }
  render() {
    const h2 = document.createElement("h2");
    const divError = document.createElement("div");
    const form = document.createElement("form");
    h2.className = "h2Form";
    h2.textContent = "Update Post Info";
    divError.className = "errorMessage";
    divError.innerHTML = "";
    form.className = "flexForm";
    document.querySelector(this.parent).append(h2, divError, form);
    form.insertAdjacentHTML(
      "beforeend",
      `
    <label for="titleUpdate">Edit Title:</label>
    <input type="text" id="titleUpdate" name="title" value="${this.title.replace(
      /"/g,
      "&quot;"
    )}" />
    <label for="bodyUpdate">Edit Body:</label>
    <input type="text" id="bodyUpdate" name="body" value="${this.body.replace(
      /"/g,
      "&quot;"
    )}" />
    <button class="submitBtn" type="submit">Submit</button>
    <button class="cancelBtn" type="button">Cancel</button>
    `
    );
    console.log(this.title);
    const cancelBtn = form.querySelector(".cancelBtn");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let updatedPost = {
        title: form.querySelector("#titleUpdate").value,
        body: form.querySelector("#bodyUpdate").value,
      };
      try {
        await axios.patch(backendUrl("posts", `/${this.id}`), updatedPost, {
          withCredentials: true,
        });
        divError.innerHTML = "Success! redirecting to post page";
        setTimeout(() => redirectTo(`/posts/${this.id}`), 1000);
      } catch (error) {
        divError.innerHTML = `${error.response.data.msg}`;
      }
    });

    cancelBtn.addEventListener("click", (e) => {
      console.log(e.target);
      setTimeout(() => redirectTo(`/posts/${this.id}`), 500);
    });
  }
}

export default UpdatePostClass;
