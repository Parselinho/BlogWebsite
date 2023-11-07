import redirectTo from "../../app";

class PostClass {
  constructor(parent, post, isSinglePost = false) {
    this.parent = parent;
    this.isSinglePost = isSinglePost;
    this.id = post._id;
    this.title = post.title;
    this.author = post.author.username;
    this.body = post.body;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.comments = post.comments;
  }
  getComments() {
    if (this.comments && this.comments.length > 0) {
      const commentsList = this.comments.map((item) => {
        return `<li>
        <span>${item.title}</span>
        <span>${item.body}</span>
        <span>Commented by ${item.author.username}</span>
        In: ${new Date(item.createdAt).toLocaleString()}
        <button class="commentBtn updateBtn">Update</button>
        <button class="commentBtn deleteBtn">Delete</button>
      </li>`;
      });
      return `<ol>${commentsList.join("")}</ol>`;
    } else {
      return `<ol><li><span>No Comments Yet</span></li></ol>`;
    }
  }

  isUpdated() {
    const createdDate = new Date(this.createdAt).toLocaleString();
    if (this.updatedAt !== this.createdAt) {
      const updateDate = new Date(this.updatedAt).toLocaleString();
      return `${createdDate} (Updated: ${updateDate})`;
    }
    return createdDate;
  }

  render() {
    const postElement = document.createElement("div");
    const comments = this.getComments();
    const date = this.isUpdated();
    postElement.className = "post-card";
    document.querySelector(this.parent).append(postElement);
    postElement.insertAdjacentHTML(
      "beforeend",
      `
      <div class="post-header">
      <h2 class="post-title">${this.title}</h2>
      <div class="post-meta">
        <span class="post-author">Posted by ${this.author} 
        <button id="btnPostId" class="post-like-btn">go to post page </button>
        </span>
        <span class="post-date">${date}</span>
      </div>
    </div>
    <div class="post-body">
      <p>${this.body}</p>
    </div>
        <div class='deleteOrEdit'></div>
    <div class="post-footer">
      <div class="post-interactions">
        <button class="post-like-btn">Like</button>
        <button class="post-comment-btn">Comment</button>
      </div>
      <div class="post-comments">
        ${comments}
      </div>
    </div>
      `
    );
    const goToPostId = postElement.querySelector("#btnPostId");
    const divModify = postElement.querySelector(".deleteOrEdit");
    if (this.isSinglePost) {
      goToPostId.innerHTML = `Back To Posts List`;
      divModify.insertAdjacentHTML(
        "beforeend",
        `<button class="updatePost">Update Post</button><button class="deletePost">Delete Post</button>`
      );
      const update = divModify.querySelector(".updatePost");
      update.addEventListener("click", async (e) => {
        redirectTo(`/posts/${this.id}/update`);
      });
    }
    goToPostId.addEventListener("click", async (e) => {
      redirectTo(`/posts/${this.id}`);
    });
  }
}

export default PostClass;
