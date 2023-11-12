import redirectTo from "../../app";
import backendUrl from "../../utils/url";

class CreatePostClass {
  constructor(parent) {
    this.parent = parent;
  }
  render() {
    const form = document.createElement("form");
    const divError = document.createElement("div");
    divError.innerHTML = "";
    document.querySelector(this.parent).append(divError, form);

    form.insertAdjacentHTML(
      "beforeend",
      `
        <h2>Create Post:</h2>
        <label for="postTitle">Set title:</label>
        <input type="text" id="postTitle" name="title" />
        <label for="postBody">Set body:</label>
        <textarea id="postBody" rows="10" cols="30" name="body"></textarea>
        <button type="submit">Submit</button>
        <button class="cancelBtn" type="button">Cancel</button>
     `
    );
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      divError.innerHTML = "";
      let newPost = {
        title: form.querySelector("#postTitle").value,
        body: form.querySelector("#postBody").value,
      };
      try {
        const { data } = await axios.post(backendUrl("posts"), newPost, {
          withCredentials: true,
        });
        divError.innerHTML = `Post Created!`;
        setTimeout(() => redirectTo("/posts"), 500);
      } catch (error) {
        divError.innerHTML = `${error.response.data.msg}`;
      }
    });
    const cancelBtn = document.querySelector(".cancelBtn");
    cancelBtn.addEventListener("click", (e) => {
      setTimeout(() => redirectTo("/posts"), 500);
    });
  }
}

export default CreatePostClass;
