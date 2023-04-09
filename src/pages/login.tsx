import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import { BACKEND_API_URL } from "../constants";

const handleLogin = async (
  event: React.FormEvent,
  email: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  event.preventDefault();
  const response = await fetch(`${BACKEND_API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    setError("Invalid email or password.");
    return;
  }
  const role = await response.text();
  Cookies.set("email", email);
  Cookies.set("password", password);
};

const EmailInput = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <label className="block mb-2" htmlFor="email">
        Email
      </label>
      <TextInput
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        required
      />
    </>
  );
};

const PasswordInput = ({
  password,
  setPassword,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <label className="block mb-2" htmlFor="password">
        Password
      </label>
      <TextInput
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        required
      />
    </>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="max-w-md w-full p-6 rounded-lg shadow-lg"
        onSubmit={event => handleLogin(event, email, password, setError)}
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
