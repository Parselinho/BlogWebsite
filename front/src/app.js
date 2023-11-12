// app.js
import parseRequestUrl from "./utils/utils.js";
import backendUrl from "./utils/url.js";

import Home from "./components/Home.js";
import NavClass from "./components/Nav.js";
import Register from "./components/Users/Register.js";
import NotFound from "./components/NotFound.js";
import Login from "./components/Users/Login.js";
import MyInfo from "./components/Users/MyInfo.js";
import Users from "./components/Users/Users.js";
import singleUser from "./components/Users/SignleUser.js";
import UpdateUser from "./components/Users/UpdateUser.js";
import Posts from "./components/Posts/Posts.js";
import SinglePost from "./components/Posts/SinglePost.js";
import createPost from "./components/Posts/CreatePost.js";

const routes = {
  "/": Home,
  "/home": Home,
  "/register": Register,
  "/login": Login,
  "/my-info": MyInfo,
  "/users": Users,
  "/users/:id": singleUser,
  "/users/:id/update": UpdateUser,

  "/createpost": createPost,
  "/posts": Posts,
  "/posts/:id": SinglePost,
  "/posts/:id/update": SinglePost,
};

const isUserExist = JSON.parse(sessionStorage.getItem("user"));

const createNav = () => {
  let navItems = ["Home"];
  if (isUserExist) {
    navItems.push(
      { label: "Users", items: ["Users", "My-Info", "Logout"] },
      { label: "Posts", items: ["Posts", "CreatePost"] }
    );
  } else {
    navItems.push("Register", "Login");
  }

  const nav = new NavClass(navItems);
  nav.render();

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
};

const router = async () => {
  document.querySelector(".gridMain").innerHTML = "";
  document.querySelector(".gridMain").className = "gridMain";
  createNav();

  const request = parseRequestUrl();
  let path = `/${request.resource || ""}`;
  if (request.id) {
    path += `/:id`;
    if (request.action) {
      path += `/${request.action}`;
    }
  }

  const loggedIn = isUserExist;
  const tryingToAccessAuthPage = path === "/login" || path === "/register";

  if (loggedIn && tryingToAccessAuthPage) {
    redirectTo("/");
    return;
  }

  const page = routes[path] || NotFound;

  if (request.resource === "users" && request.id) {
    if (request.action === "update") {
      if (
        (isUserExist && isUserExist.role === "admin") ||
        isUserExist.userId === request.id
      ) {
        await UpdateUser(request.id);
      } else {
        document.querySelector(
          ".gridMain"
        ).innerHTML = `<p>You Are Not Allowed!</p><a href='#/'>Back Home Page</a>`;
      }
    } else {
      await singleUser(request.id);
    }
  } else if (request.resource === "posts" && request.id) {
    const isUpdateAction = request.action === "update";
    if (
      isUpdateAction &&
      !(
        isUserExist &&
        (isUserExist.role === "admin" || isUserExist.userId === request.id)
      )
    ) {
      document.querySelector(
        ".gridMain"
      ).innerHTML = `<p>You Are Not Allowed!</p><a href='#/'>Back Home Page</a>`;
    } else {
      await SinglePost(request.id, isUpdateAction);
    }
  } else {
    await page();
  }
};

function redirectTo(path) {
  window.location.hash = path;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

export default redirectTo;
