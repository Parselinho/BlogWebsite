class HomeClass {
  constructor(parent, text) {
    this.parent = parent;
    this.text = text;
  }
  render() {
    const h2 = document.createElement("h2");
    h2.className = "h2Home";
    h2.textContent = `Welcome to my First Blog App`;
    const ol = document.createElement("ol");
    ol.className = "ol";
    document.querySelector(this.parent).append(h2, ol);
  }

  createListItem() {
    return `<li class="listItem">${this.text}</li>`;
  }
}

export default HomeClass;
