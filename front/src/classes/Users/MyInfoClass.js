import redirectTo from "../../app";

class MyInfoClass {
  constructor(parent, user) {
    this.parent = parent;
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.id = user._id;
    this.comments = user.comments;
    this.posts = user.posts;
  }

  getPosts() {
    if (this.posts && this.posts.length > 0) {
      const postsList = this.posts.map((item) => {
        return `<li><span>${item.title}</span><span>${item.createdAt}</span></li>`;
      });
      return `<ol>${postsList.join("")}</ol>`;
    } else {
      return `<ol><li><span>You dont have posts yet</span></li></ol>`;
    }
  }

  getComments() {
    if (this.comments && this.comments.length > 0) {
      const commentsList = this.comments.map((item) => {
        return `<li><span>${item.title}</span><span>${item.createdAt}</span></li>`;
      });
      return `<ol>${commentsList.join("")}</ol>`;
    } else {
      return `<ol><li><span>You dont have comments yet</span></li></ol>`;
    }
  }

  render() {
    const div = document.createElement("div");
    div.className = "infoDiv";
    const myPosts = this.getPosts();
    const myComments = this.getComments();
    document.querySelector(this.parent).append(div);
    div.insertAdjacentHTML(
      "beforeend",
      `
    <h2 class="h2info">${this.username} Info</h2>
    <p>My Role: ${this.role}</p>
    <p>My Email: ${this.email}</p>
    <p>My Id: ${this.id}</p>
    <p>my posts:</p>
      ${myPosts}
    <p>my comments:</p>
      ${myComments}
    <div class="centerBtn">
      <button type="button" class="edit-profile-btn">Edit My Profile</button>
      <button type="button" class="delete-profile-btn">Delete My Profile</button>
    </div>
    `
    );
    const editBtn = div.querySelector(".edit-profile-btn");
    const deleteBtn = div.querySelector(".delete-profile-btn");

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();
      redirectTo(`/users/${this.id}/update`);
    });
    deleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      divError.textContent = "";
      let alertW = window.confirm(`You Sure You Want to delete your user?`);
      if (alertW) {
        try {
          await axios.delete(backendUrl("users", `/${this.id}`), {
            withCredentials: true,
          });
          sessionStorage.removeItem("user");
          redirectTo("/register");
          location.reload();
        } catch (error) {
          div.textContent = "";
          divError.insertAdjacentHTML(
            "beforeend",
            `<h2>${error.response.data.msg}</h2><a href='#/'>Back Home Page</a>`
          );
        }
      }
    });
  }
}

export default MyInfoClass;
