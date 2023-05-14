import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import UserForm from "../../components/UserForm";
import useAxios from "../../lib/hooks/useAxios";

const EditUser = () => {
  const { userId } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  const fetchUser = async () => {
    setLoading(true);
    const { data } = await axios.get(`/admin/users/${userId}`);
    setEmail(data.email);
    setRole(data.role);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const saveChanges = async () => {
    await axios.patch(`/admin/users/${userId}`, {
      email,
      ...(password !== "" && { password }),
      role,
    });
  };

  return (
    <Layout>
      {!loading && (
        <UserForm
          title="Edit user"
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          onClick={saveChanges}
          buttonText="Save"
        />
      )}
      {loading && (
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

export default EditUser;
