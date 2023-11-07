import LoginClass from "../../classes/Users/LoginClass.js";

const Login = () => {
  const newLogin = new LoginClass(".gridMain");
  newLogin.render();
};

export default Login;
