import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import UserForm from "../components/UserForm";
import useAxios from "../lib/hooks/useAxios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();

  const handleLogin = async () => {
    const { data: role } = await axios.post(`/login`, {
      email,
      password,
    });
    Cookies.set("email", email);
    Cookies.set("password", password);
    Cookies.set("role", role); // TODO: get rid of this
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "employee") {
      navigate("/employee");
    }
  };

  return (
    <UserForm
      title="Login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onClick={handleLogin}
      buttonText="Login"
    />
  );
};

const Login = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Login;
