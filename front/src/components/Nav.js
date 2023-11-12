import backendUrl from "../utils/url";
import redirectTo from "../app";

class NavClass {
  constructor(navItems) {
    this.navItems = navItems;
  }

  render() {
    const nav = document.querySelector(".gridNav");
    nav.innerHTML = "";

    this.navItems.forEach((item) => {
      if (typeof item === "string") {
        const link = this.createNavLink(item);
        nav.appendChild(link);
      } else if (item.label && item.items) {
        const dropdown = this.createNavDropdown(item);
        nav.appendChild(dropdown);
      }
    });

    this.setupEventListeners();
  }

  createNavLink(item) {
    const a = document.createElement("a");
    a.setAttribute("href", `#/${item.toLowerCase()}`);
    a.textContent = item;
    if (item === "Logout") {
      a.id = "logoutBtn";
      a.setAttribute("href", "#");
    }
    return a;
  }

  createNavDropdown(group) {
    const div = document.createElement("div");
    div.classList.add("dropdown");

    const button = document.createElement("button");
    button.classList.add("dropbtn");
    button.textContent = group.label;
    div.appendChild(button);

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");

    group.items.forEach((subItem) => {
      const link = this.createNavLink(subItem);
      dropdownContent.appendChild(link);
    });

    div.appendChild(dropdownContent);
    return div;
  }

  setupEventListeners() {
    const logoutBtn = document.querySelector("#logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          await axios.get(backendUrl("users", "/logout"), {
            withCredentials: true,
          });
          sessionStorage.removeItem("user");
          redirectTo("/login");
          location.reload();
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
}

export default NavClass;
