import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    alert("logging in...");
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
        <input
          className="w-full border-gray-300 mb-4 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ring-2 ring-gray-300"
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
        <input
          className="w-full border-gray-300 mb-4 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ring-2 ring-gray-300"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
