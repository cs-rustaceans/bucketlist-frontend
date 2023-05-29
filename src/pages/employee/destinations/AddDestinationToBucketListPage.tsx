import { useNavigate, useParams } from "react-router-dom";
import BucketListItemForm, {
  TripDates,
} from "../../../components/BucketListItemForm";
import Card from "../../../components/Card";
import Layout from "../../../components/Layout";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";
import dayjs from "dayjs/esm/index.js";

const AddDestinationToBucketListPage = () => {
  useRequireEmployee();
  const { destinationId } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (values: TripDates) => {
    const start_date = new Date(values.start_date).toISOString().split(".")[0];
    const end_date = new Date(values.end_date).toISOString().split(".")[0];

    await axios.post(`/employee/bucketlist-items/add/from-available`, {
      destination_id: Number(destinationId),
      start_date,
      end_date,
    });
    navigate("/bucketlist-items");
  };

  return (
    <Layout title="Add bucket list destination">
      <Card>
        <h2 className="text-2xl font-semibold mb-6">
          Add destination to bucket list
        </h2>
        <BucketListItemForm
          onSubmit={onSubmit}
          destinationId={Number(destinationId)}
          initialValues={{
            start_date: dayjs().format("YYYY-MM-DD"),
            end_date: dayjs().format("YYYY-MM-DD"),
          }}
        />
      </Card>
    </Layout>
  );
};

export default AddDestinationToBucketListPage;
