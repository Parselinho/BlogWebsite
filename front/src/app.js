// app.js
import parseRequestUrl from "./utils/utils.js";

import Home from "./components/Home.js";
import NavClass from "./components/Nav.js";
import Register from "./components/Register.js";
import NotFound from "./components/NotFound.js";
import Login from "./components/Login.js";
import MyInfo from "./components/MyInfo.js";
import Users from "./components/Users.js";
import singleUser from "./components/SignleUser.js";
import UpdateUser from "./components/UpdateUser.js";

const routes = {
  "/home": Home,
  "/register": Register,
  "/login": Login,
  "/my-info": MyInfo,
  "/users": Users,
  "/users/:id": singleUser,
  "/users/:id/update": UpdateUser,
};

const isUserExist = JSON.parse(sessionStorage.getItem("user"));

const createNav = () => {
  let navItems;
  if (!isUserExist) {
    navItems = ["Home", "Register", "Login"];
  } else {
    navItems = ["Home", "My-Info", "Posts", "Users", "Log-Out"];
  }
  const nav = new NavClass(navItems);
  nav.render();
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
  const tryingToAccesAuthPage = path === "/login" || path === "/register";

  if (loggedIn && tryingToAccesAuthPage) {
    redirectTo("/home");
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
        ).innerHTML = `<p>You Are Not Allowed!</p><a href='#/home'>Back Home Page</a>`;
      }
    } else {
      await singleUser(request.id);
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
