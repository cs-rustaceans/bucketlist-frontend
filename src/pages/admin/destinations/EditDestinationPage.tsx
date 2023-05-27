import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
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
  const URL = `/admin/destinations/${destinationId}`;

  const { data: destination, isLoading } = useQuery<Destination>(
    ["admin", "destinations", destinationId],
    () => axios.get(URL).then(result => result.data)
  );

  const invalidate = () => {
    queryClient.invalidateQueries(["admin", "destinations", destinationId]);
  };

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.patch(URL, values);
      if (response.status === 200) {
        invalidate();
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
            <Button
              onClick={async () => {
                await axios.delete(URL);
                invalidate();
                navigate("/admin/destinations");
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default EditDestinationPage;
