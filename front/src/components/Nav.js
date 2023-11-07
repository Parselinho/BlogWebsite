class NavClass {
  constructor(navItems) {
    this.navItems = navItems;
  }
  render() {
    const nav = document.querySelector(".gridNav");
    nav.innerHTML = "";

    this.navItems.forEach((item) => {
      const a = document.createElement("a");
      a.setAttribute("href", `#/${item.toLowerCase()}`);
      a.textContent = item;
      if (item === "Logout") {
        a.id = "logoutBtn";
      }
      nav.append(a);
    });
  }
}

export default NavClass;
