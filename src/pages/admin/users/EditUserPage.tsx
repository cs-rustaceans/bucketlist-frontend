import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import UserForm from "../../../components/UserForm";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireAdmin } from "../../../lib/hooks/useRole";
import { User } from "../../../models/User";

const EditUserPage = () => {
  useRequireAdmin();
  const { userId } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();

  const { isLoading } = useQuery<User>(["admin", "users", userId], () =>
    axios
      .get(`/admin/users/${userId}`)
      .then(d => d.data)
      .then(d => {
        setEmail(d.email);
        setRole(d.role);
        setStatus(d.status);
        return d.data;
      })
  );

  const saveChanges = async () => {
    await axios.patch(`/admin/users/${userId}`, {
      email,
      ...(password !== "" && { password }),
      role,
      status,
    });
    navigate("/admin/users");
  };

  const handleDelete = async () => {
    await axios.delete(`/admin/users/${userId}`);
    navigate("/admin/users");
  };

  return (
    <Layout title="Edit user">
      {!isLoading && (
        <UserForm
          title="Edit user"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          status={status}
          setStatus={setStatus}
          onClick={saveChanges}
          buttonText="Save"
        >
          <Button onClick={handleDelete}>Delete</Button>
        </UserForm>
      )}
      {isLoading && (
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Edit user</h2>
              <h2 className="text-2xl font-semibold mb-6">Loading...</h2>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default EditUserPage;
