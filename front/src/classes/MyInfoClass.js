class MyInfoClass {
  constructor(parent, user) {
    this.parent = parent;
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.id = user._id;
  }

  getPosts() {}

  getComments() {}

  render() {
    const div = document.createElement("div");
    div.className = "infoDiv";
    document.querySelector(this.parent).append(div);
    div.insertAdjacentHTML(
      "beforeend",
      `
    <h2 class="h2info">${this.username} Info</h2>
    <p>My Role: ${this.role}</p>
    <p>My Email: ${this.email}</p>
    <p>My Id: ${this.id}</p>
    <p>my posts:</p>
    <ol>
      <li><span>title</span><span>createdAt</span></li>
      <li><span>title</span><span>createdAt</span></li>
      <li><span>title</span><span>createdAt</span></li>
    </ol>
    <p>my comments</p>
    <ol>
      <li><span>title</span><span>post</span></li>
      <li><span>title</span><span>post</span></li>
      <li><span>title</span><span>post</span></li>
    </ol>
    `
    );
  }
}

export default MyInfoClass;
