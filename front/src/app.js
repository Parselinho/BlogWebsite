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

const routes = {
  "/home": Home,
  "/register": Register,
  "/login": Login,
  "/my-info": MyInfo,
  "/users": Users,
  "/users/:id": singleUser,
  "/users/:id/update": UpdateUser,
  "/posts": Posts,
  "/posts/:id": SinglePost,
  "/posts/:id/update": SinglePost,
};

const isUserExist = JSON.parse(sessionStorage.getItem("user"));

const createNav = () => {
  let navItems;
  if (!isUserExist) {
    navItems = ["Home", "Register", "Login"];
  } else {
    navItems = [
      "Home",
      /* Try to do User group with drop-down menu*/ "My-Info",
      "Users",
      "Logout",
      /* Posts group with drop-down menu*/ "Posts",
    ];
  }
  const nav = new NavClass(navItems);
  nav.render();

  const logoutBtn = document.querySelector("#logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
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
  let path = `/${request.resource}`;
  if (request.id) {
    path += `/:id`;
    if (request.action) {
      path += `/${request.action}`;
    }
  }

  const loggedIn = isUserExist;
  const tryingToAccessAuthPage = path === "/login" || path === "/register";

  if (loggedIn && tryingToAccessAuthPage) {
    redirectTo("/home");
    return;
  }

  const page = routes[path] || NotFound;

  // Route handling for users
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
        ).innerHTML = `<p>You Are Not Allowed!</p><a href='#/home'>Back Home Page</a>`;
      }
    } else {
      await singleUser(request.id);
    }
  }
  // Route handling for posts
  else if (request.resource === "posts" && request.id) {
    const isUpdateAction = request.action === "update";
    // If it's an update action, check if the user has the right permission
    if (
      isUpdateAction &&
      !(
        isUserExist &&
        (isUserExist.role === "admin" || isUserExist.userId === request.id)
      )
    ) {
      document.querySelector(
        ".gridMain"
      ).innerHTML = `<p>You Are Not Allowed!</p><a href='#/home'>Back Home Page</a>`;
    } else {
      // Render the SinglePost or UpdatePost based on the action
      await SinglePost(request.id, isUpdateAction);
    }
  }
  // Route handling for all other pages
  else {
    await page();
  }
};

function redirectTo(path) {
  window.location.hash = path;
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

export default redirectTo;
