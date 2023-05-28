import { useNavigate } from "react-router-dom";
import BucketListItemWithDestination from "../../../components/BucketListItemWithDestinationForm";
import Card from "../../../components/Card";
import Layout from "../../../components/Layout";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";

const AddBucketListItemPage = () => {
  const { isLoading, user } = useRequireEmployee();
  const axios = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    const start_date = new Date(values.start_date).toISOString().split(".")[0];
    const end_date = new Date(values.end_date).toISOString().split(".")[0];
    const response = await axios.post(
      "/employee/bucketlist-items/add/with-private-list",
      {
        ...values,
        start_date,
        end_date,
      }
    );
    if (response.status === 201) {
      navigate("/bucketlist-items");
    }
  };

  return (
    <Layout title="Add destination">
      <Card>
        {!isLoading && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add destination</h2>
            <BucketListItemWithDestination onSubmit={onSubmit} />
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default AddBucketListItemPage;
