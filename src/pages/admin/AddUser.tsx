import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import EmailInput from "../../components/EmailInput";
import Layout from "../../components/Layout";
import PasswordInput from "../../components/PasswordInput";
import useAxios from "../../lib/hooks/useAxios";

const UserAddForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();

  const handleAdd = async () => {
    try {
      const response = await axios.post("/admin/users", {
        email,
        password,
        role,
      });

      if (response.status != 201) {
        setError("User not added.");
      }
      navigate("/admin/manage-users");
    } catch (error) {
      setError("Error connnecting to the server.");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <EmailInput email={email} onChange={setEmail} />
        <PasswordInput password={password} onChange={setPassword} />
        <select
          className="w-full border-gray-300 mb-4 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ring-2 ring-gray-300"
          value={role}
          onChange={event => setRole(event.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button onClick={handleAdd}>Login</Button>
      </div>
    </div>
  );
};

const UserAdd = () => {
  return (
    <Layout>
      <UserAddForm />
    </Layout>
  );
};

export default UserAdd;
