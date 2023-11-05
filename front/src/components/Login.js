import LoginClass from "../classes/LoginClass.js";

const Login = () => {
  const newLogin = new LoginClass(".gridMain");
  newLogin.render();
};

export default Login;
