import Layout from "../../components/Layout";
import { useAdmin } from "../../lib/hooks/useRole";

const AdminPage = () => {
  useAdmin();

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">
        Welcome! You are an admin.
      </h2>
    </Layout>
  );
};

export default AdminPage;
