import Layout from "../../components/Layout";
import { useRequireEmployee } from "../../lib/hooks/useRole";

const EmployeePage = () => {
  useRequireEmployee();

  return (
    <Layout title="Employee">
      <h2 className="text-2xl font-semibold mb-6">
        Welcome! You are an employee.
      </h2>
    </Layout>
  );
};

export default EmployeePage;
