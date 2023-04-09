import Cookies from "js-cookie";
import Layout from "../components/Layout";

const AdminPage = () => {
  const email = Cookies.get("email");
  const password = Cookies.get("password");
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
      <h2 className="text-2xl font-semibold mb-6">
        Welcome! You are an admin.
      </h2>
    </Layout>
  );
};

export default AdminPage;
