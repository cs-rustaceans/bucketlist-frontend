import Layout from "../../components/Layout";
import { useUser } from "../../lib/hooks/useUser";

const AdminPage = () => {
  const { user } = useUser();

  if (user?.role !== "admin") {
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
      <h2 className="text-2xl font-semibold mb-6">
        Welcome! You are an admin.
      </h2>
    </Layout>
  );
};

export default AdminPage;
