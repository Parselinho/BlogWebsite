import redirectTo from "../../app";
import backendUrl from "../../utils/url";

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
        <div class="updateError"></div>
        <button class="commentBtn updateBtn" data-comment-id="${
          item._id
        }">Update</button>
        <button class="commentBtn deleteBtn" data-comment-id="${
          item._id
        }">Delete</button>
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
    const divError = document.createElement("div");
    postElement.className = "post-card";
    document.querySelector(this.parent).append(divError, postElement);
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
        <div class="commentError"></div>
      </div>
    </div>
      `
    );
    const goToPostId = postElement.querySelector("#btnPostId");
    const divModify = postElement.querySelector(".deleteOrEdit");

    const divComments = postElement.querySelector(".post-comments");
    const commentsError = postElement.querySelector(".commentError");
    commentsError.innerHTML = "";

    const postComment = postElement.querySelector(".post-comment-btn");
    postComment.addEventListener("click", async (e) => {
      postComment.disabled = true;
      divComments.insertAdjacentHTML(
        "beforeend",
        `
        <form>
          <div class="errorComment"></div>
            <label for="commentTitle">enter comment title:</label>
            <input type="text" id="commentTitle" name="title">
            <label for="commentBody">enter comment body:</label>
            <input type="text" id="commentBody" name="body">
            <button type="submit">Submit</button>
            <button class="cancelBtn" type="button">Cancel</button>
        </form>
      `
      );
      const commentForm = divComments.querySelector("form");
      const divErr = divComments.querySelector(".errorComment");
      const cancel = divComments.querySelector(".cancelBtn");
      divErr.innerHTML = "";
      commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let newComment = {
          title: divComments.querySelector("#commentTitle").value,
          body: divComments.querySelector("#commentBody").value,
        };
        try {
          const { data } = await axios.post(
            backendUrl("posts", `/${this.id}`, "/comments"),
            newComment,
            { withCredentials: true }
          );
          console.log(data);
          location.reload();
        } catch (error) {
          divErr.innerHTML = `${error.response.data.msg}`;
          postComment.disabled = false;
        }
      });
      cancel.addEventListener("click", () => {
        commentForm.remove();
        postComment.disabled = false;
      });
    });

    divComments.addEventListener("click", async (e) => {
      const singleComment = e.target.getAttribute("data-comment-id");

      if (e.target.classList.contains("updateBtn")) {
        const commentParent = e.target.closest("li");
        const titleSpan = commentParent.children[0];
        const bodySpan = commentParent.children[1];
        const updateBtn = commentParent.children[4];
        const errorUpdate = commentParent.children[3];
        errorUpdate.innerHTML = "";

        if (updateBtn.textContent === "Update") {
          commentParent.titleInput = document.createElement("input");
          commentParent.bodyInput = document.createElement("input");

          commentParent.titleInput.value = titleSpan.textContent;
          commentParent.bodyInput.value = bodySpan.textContent;

          titleSpan.replaceWith(commentParent.titleInput);
          bodySpan.replaceWith(commentParent.bodyInput);

          updateBtn.textContent = "Save";
        } else if (updateBtn.textContent === "Save") {
          let updateComment = {
            title: commentParent.titleInput.value,
            body: commentParent.bodyInput.value,
          };
          try {
            const { data } = await axios.patch(
              backendUrl(
                "posts",
                `/${this.id}`,
                "/comments",
                `/${singleComment}`
              ),
              updateComment,
              { withCredentials: true }
            );
            location.reload();
          } catch (error) {
            errorUpdate.innerHTML = `${error.response.data.msg}`;
          }
        }
      } else if (e.target.classList.contains("deleteBtn")) {
        try {
          const { data } = await axios.delete(
            backendUrl(
              "posts",
              `/${this.id}`,
              "/comments",
              `/${singleComment}`
            ),
            { withCredentials: true }
          );
          location.reload();
        } catch (error) {
          commentsError.innerHTML = `${error.response.data.msg}`;
        }
      }
    });

    goToPostId.addEventListener("click", async (e) => {
      redirectTo(`/posts/${this.id}`);
    });
    if (this.isSinglePost) {
      goToPostId.innerHTML = `Back To Posts List`;
      divModify.insertAdjacentHTML(
        "beforeend",
        `<button class="updatePost">Update Post</button><button class="deletePost">Delete Post</button>`
      );
      const update = divModify.querySelector(".updatePost");
      update.addEventListener("click", async (e) => {
        divError.innerHTML = "";
        redirectTo(`/posts/${this.id}/update`);
      });
      const deletePost = divModify.querySelector(".deletePost");
      deletePost.addEventListener("click", async (e) => {
        divError.innerHTML = "";
        try {
          const { data } = await axios.delete(
            backendUrl("posts", `/${this.id}`),
            {
              withCredentials: true,
            }
          );
          divError.innerHTML = `${data.msg}`;
          setTimeout(() => redirectTo("/posts"), 500);
        } catch (error) {
          divError.innerHTML = `${error.response.data.msg}`;
        }
      });
    }
  }
}

export default PostClass;
