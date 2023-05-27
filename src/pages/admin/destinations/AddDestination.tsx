import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card";
import DestinationForm from "../../../components/DestinationForm";
import Layout from "../../../components/Layout";
import useAxios from "../../../lib/hooks/useAxios";
import { useAdmin } from "../../../lib/hooks/useRole";

const AddDestination = () => {
  const { isLoading, user } = useAdmin();
  const axios = useAxios();
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post("/admin/destinations", {
        owner_id: user?.id,
        ...values,
      });
      if (response.status === 201) {
        navigate("/admin/destinations");
      }
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };
  return (
    <Layout>
      <Card>
        {!isLoading && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add destination</h2>
            <DestinationForm onSubmit={onSubmit} />
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default AddDestination;
