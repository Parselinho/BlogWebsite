import HomeClass from "../classes/HomeClass";
import text from "../utils/textForHomePage";

const Home = () => {
  let list = new HomeClass(".gridMain");
  list.render();

  const ol = document.querySelector(`${list.parent} .ol`);

  text.map((itemText) => {
    let listItem = new HomeClass("", itemText);
    ol.insertAdjacentHTML("beforeend", listItem.createListItem());
  });

  const gridMain = document.querySelector("main");
  gridMain.className = "gridMain gridMainHomeImg";
};

export default Home;
