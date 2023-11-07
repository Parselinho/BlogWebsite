import redirectTo from "../../app";

class GetAllUsers {
  constructor(parent, user) {
    this.parent = parent;
    this.id = user._id;
    this.username = user.username;
    this.posts = user.posts;
    this.comments = user.comments;
  }
  getPosts() {
    if (this.posts && this.posts.length > 0) {
      const postsList = this.posts.map((item) => {
        // maybe instead of button make href:
        return `<li><span class="post-title">${item.title}</span><span class="post-date">${item.createdAt}</span><button class="info-btn">More Info About Post</button></li>`;
      });
      return `<ol>${postsList}</ol>`;
    } else {
      return `<ol><li><span class=post-title>There is not posts for this user</span></li></ol>`;
    }
  }

  getComments() {
    if (this.comments && this.comments.length > 0) {
      const commentsList = this.comments.map((item) => {
        // maybe instead of button make href:
        return `<li><span class="post-title">${item.title}</span><span class="post-date">${item.post}</span><button class="info-btn">More Info About Comment</button></li>`;
      });
      return `<ol>${commentsList}</ol>`;
    } else {
      return `<ol><li><span class=post-title>There is not comments for this user</span></li></ol>`;
    }
  }

  render() {
    const div = document.createElement("div");
    div.className = "user-list-container";
    document.querySelector(this.parent).append(div);
    const posts = this.getPosts();
    const comments = this.getComments();
    div.insertAdjacentHTML(
      "beforeend",
      `
        <div class="user-info">
        <h3>${this.username}</h3>
        <div class="user-posts">
            <p>${this.username} Posts:</p>
                ${posts}
        </div>
        <div class="user-comments">
            <p>${this.username} Comments:</p>
                ${comments}
        </div>
        </div>
        <button class='userIdBtn' type="button">More Info About User</button>
      `
    );
    div.querySelector(".userIdBtn").addEventListener("click", (e) => {
      redirectTo(`/users/${this.id}`);
    });
  }
}

export default GetAllUsers;
