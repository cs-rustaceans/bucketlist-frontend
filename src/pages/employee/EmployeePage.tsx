import Layout from "../../components/Layout";
import { useEmployee } from "../../lib/hooks/useRole";

const EmployeePage = () => {
  useEmployee();

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6">
        Welcome! You are an employee.
      </h2>
    </Layout>
  );
};

export default EmployeePage;
