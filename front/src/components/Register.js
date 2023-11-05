import RegisterClass from "../classes/RegisterClass.js";

const Register = () => {
  const RegisterForm = new RegisterClass(".gridMain");
  RegisterForm.render();
};

export default Register;
