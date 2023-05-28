import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Error from "../../../components/Error";
import Layout from "../../../components/Layout";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";

const DeactivateAccountPage = () => {
  const { logout } = useRequireEmployee();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axios = useAxios();

  const onClick = async () => {
    try {
      await axios.post("/employee/users/make-account-inactive");
      logout();
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Layout title="Deactivate account">
      <Card>
        <h2 className="text-2xl font-semibold mb-6">Deactivate account</h2>
        <p className="text-black-500 mb-2">
          Are you sure? If you deactivate your account, you will have to contact
          an admin to reactivate it.
        </p>
        <Error error={error} />
        <Button onClick={onClick}>Deactivate account</Button>
      </Card>
    </Layout>
  );
};

export default DeactivateAccountPage;
