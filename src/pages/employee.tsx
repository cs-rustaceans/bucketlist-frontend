import Cookies from "js-cookie";
import Layout from "../components/Layout";

const EmployeePage = () => {
  const email = Cookies.get("email");
  const password = Cookies.get("password");
  const role = Cookies.get("role");

  if (role !== "employee") {
    return (
      <Layout>
        <h2 className="text-2xl font-semibold mb-6">
          You do not have access to this page. Please log in as an employee.
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">
        Welcome! You are an employee.
      </h2>
    </Layout>
  );
};

export default EmployeePage;
