// app.js
import parseRequestUrl from "./utils/utils.js";

import Home from "./components/Home.js";
import NavClass from "./components/Nav.js";
import Register from "./components/Register.js";
import NotFound from "./components/NotFound.js";
import Login from "./components/Login.js";
import MyInfo from "./components/MyInfo.js";

const routes = {
  "/": Home,
  "/home": Home,
  "/register": Register,
  "/login": Login,
  "/my-info": MyInfo,
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
  // document.querySelector(".gridMain").innerHTML = "";
  // document.querySelector(".gridMain").className = "gridMain";
  createNav();
  const request = parseRequestUrl();
  const parseUrl =
    `/${request.resource || ""}` +
    `${request.id ? "/:id" : ""}` +
    `${request.action ? `/${request.action}` : ""}`;

  const page = routes[parseUrl] || NotFound;
  await page();
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
