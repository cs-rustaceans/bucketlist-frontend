import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "../components/Card";
import Layout from "../components/Layout";
import UserForm from "../components/UserForm";
import useAxios from "../lib/hooks/useAxios";
import { useUser } from "../lib/hooks/useUser";

const LoginForm = () => {
  const { isLoading, invalidate } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();

  const handleLogin = async () => {
    const { data } = await axios.post(`/login`, {
      email,
      password,
    });
    Cookies.set("token", data.token);
    invalidate();
    navigate("/");
  };

  if (isLoading) return <></>;

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

const LoginPage = () => {
  return (
    <Layout title="Login">
      <Card>
        <LoginForm />
      </Card>
    </Layout>
  );
};

export default LoginPage;
