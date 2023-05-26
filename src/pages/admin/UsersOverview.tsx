import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import useAxios from "../../lib/hooks/useAxios";
import { useAdmin } from "../../lib/hooks/useRole";

const UsersTable = () => {
  const axios = useAxios();

  const { data: users, isLoading } = useQuery<User[]>(["admin", "users"], () =>
    axios.get("/admin/users").then(d => d.data)
  );

  return (
    <div className="flex flex-col items-center">
      {isLoading && <h2 className="text-2xl font-semibold mb-6">Loading...</h2>}
      {!isLoading && (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">
                  <Link to={`/admin/users/${user.id}`}>{user.email}</Link>
                </td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const UsersOverview = () => {
  useAdmin();
  return (
    <Layout>
      <Link to="/admin/users/add">
        <Button>Add user</Button>
      </Link>
      <UsersTable />
    </Layout>
  );
};

export default UsersOverview;
