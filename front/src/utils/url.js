const backendUrl = (route1, route2 = "", route3 = "") => {
  return `http://localhost:3000/${route1}${route2}${route3}`;
};

export default backendUrl;
