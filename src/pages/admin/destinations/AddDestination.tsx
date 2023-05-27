import { useNavigate } from "react-router-dom";
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
    <Layout>{!isLoading && <DestinationForm onSubmit={onSubmit} />}</Layout>
  );
};

export default AddDestination;
