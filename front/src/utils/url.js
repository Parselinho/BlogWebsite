const backendUrl = (route1, route2 = "", route3 = "", route4 = "") => {
  return `http://localhost:3000/${route1}${route2}${route3}${route4}`;
};

export default backendUrl;
