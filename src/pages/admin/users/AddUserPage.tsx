import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import UserForm from "../../../components/UserForm";
import useAxios from "../../../lib/hooks/useAxios";
import { useAdmin } from "../../../lib/hooks/useRole";

const UserAddForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();
  const axios = useAxios();

  const handleAdd = async () => {
    const response = await axios.post("/admin/users", {
      email,
      password,
      role,
    });

    if (response.status != 201) {
      throw Error("There was a problem and the user was not added.");
    }
    navigate("/admin/users");
  };

  return (
    <UserForm
      title="Add user"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      role={role}
      setRole={setRole}
      onClick={handleAdd}
      buttonText="Add"
    />
  );
};

const AddUserPage = () => {
  useAdmin();
  return (
    <Layout>
      <UserAddForm />
    </Layout>
  );
};

export default AddUserPage;
