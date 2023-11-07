class UpdatePostClass {
  constructor(parent, post) {
    this.parent = parent;
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
    form.className = "flexForm";
    document.querySelector(this.parent).append(h2, divError, form);
    form.insertAdjacentHTML(
      "beforeend",
      `
    <label for="titleUpdate">Edit Title:</label>
    <input type="text" id="titleUpdate" name="title" value=${this.title} />
    <label for="bodyUpdate">Edit Body:</label>
    <input type="text" id="bodyUpdate" name="body" value=${this.body} />
    <button type="submit">Submit</button>
    <button type="button">Cancel</button>
    `
    );
  }
}

export default UpdatePostClass;
