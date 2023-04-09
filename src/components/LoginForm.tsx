import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../constants";
import Button from "./Button";
import TextInput from "./TextInput";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
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

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="max-w-md w-full p-6 rounded-lg shadow-lg"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
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
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
