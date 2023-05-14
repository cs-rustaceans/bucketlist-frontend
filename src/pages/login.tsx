import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import EmailInput from "../components/EmailInput";
import Layout from "../components/Layout";
import PasswordInput from "../components/PasswordInput";
import useAxios from "../lib/hooks/useAxios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();

  const handleLogin = async () => {
    try {
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
    } catch (err: any) {
      setError(err.toString());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <EmailInput email={email} onChange={setEmail} />
        <PasswordInput password={password} onChange={setPassword} />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
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
