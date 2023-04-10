import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { BACKEND_API_URL } from "../constants";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const USERS_URL = `${BACKEND_API_URL}/admin/users`;
    fetch(USERS_URL)
      .then(response => response.json())
      .then(fetchedUsers => {
        setUsers(fetchedUsers);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <h2 className="text-2xl font-semibold mb-6">Loading...</h2>
      ) : (
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

const ManageUsers = () => {
  const role = Cookies.get("role");

  return (
    <Layout>
      {role === "admin" ? (
        <>
          <Link to="/admin/manage-users/add">
            <Button>Add user</Button>
          </Link>
          <UsersTable />
        </>
      ) : (
        <h2 className="text-2xl font-semibold mb-6">
          You do not have access to this page. Please log in as an admin.
        </h2>
      )}
    </Layout>
  );
};

export default ManageUsers;
