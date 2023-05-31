import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card";
import Layout from "../../../components/Layout";
import UserForm from "../../../components/UserForm";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireAdmin } from "../../../lib/hooks/useRole";

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
      throw new Error("There was a problem and the user was not added.");
    }
    navigate("/admin/users");
  };

  return (
    <Card>
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
    </Card>
  );
};

const AddUserPage = () => {
  useRequireAdmin();
  return (
    <Layout title="Add user">
      <UserAddForm />
    </Layout>
  );
};

export default AddUserPage;
