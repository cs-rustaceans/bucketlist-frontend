import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import useAxios from "../../lib/hooks/useAxios";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  const fetchUsers = async () => {
    setLoading(true);
    const { data } = await axios.get("/admin/users");
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {loading && <h2 className="text-2xl font-semibold mb-6">Loading...</h2>}
      {!loading && (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const UsersOverview = () => {
  const role = Cookies.get("role");

  if (role !== "admin") {
    return (
      <Layout>
        <h2 className="text-2xl font-semibold mb-6">
          You do not have access to this page. Please log in as an admin.
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link to="/admin/manage-users/add">
        <Button>Add user</Button>
      </Link>
      <UsersTable />
    </Layout>
  );
};

export default UsersOverview;
