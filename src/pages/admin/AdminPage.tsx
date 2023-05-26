import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useUser } from "../../lib/hooks/useUser";

const AdminPage = () => {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user?.role !== "admin") {
      navigate("/page-not-found");
    }
  }, [isLoading, user]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">
        Welcome! You are an admin.
      </h2>
    </Layout>
  );
};

export default AdminPage;
