import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../../components/Card";
import DestinationForm from "../../../components/DestinationForm";
import Layout from "../../../components/Layout";
import useAxios from "../../../lib/hooks/useAxios";
import { useAdmin } from "../../../lib/hooks/useRole";

const EditDestinationPage = () => {
  useAdmin();
  const { destinationId } = useParams();
  const queryClient = useQueryClient();
  const axios = useAxios();
  const navigate = useNavigate();

  const { data: destination, isLoading } = useQuery<Destination>(
    ["admin", "destinations", destinationId],
    () =>
      axios
        .get(`/admin/destinations/${destinationId}`)
        .then(result => result.data)
  );

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.patch(
        `/admin/destinations/${destinationId}`,
        values
      );
      if (response.status === 200) {
        queryClient.invalidateQueries(["admin", "destinations", destinationId]);
        navigate("/admin/destinations");
      }
    } catch (error) {
      console.error("Error editing destination:", error);
    }
  };

  return (
    <Layout>
      <Card>
        {!isLoading && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Edit destination #{destinationId}
            </h2>
            <DestinationForm initialValues={destination} onSubmit={onSubmit} />
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default EditDestinationPage;
