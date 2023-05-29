import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import BucketListItemForm, {
  TripDates,
} from "../../../components/BucketListItemForm";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Layout from "../../../components/Layout";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";
import dayjs from "dayjs";
import { BucketListItem } from "../../../models/BucketListItem";

const EditBucketListItemPage = () => {
  const { user } = useRequireEmployee();
  const { bucketListItemId } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const URL = `/employee/bucketlist-items/${bucketListItemId}`;
  const queryKey = ["employee", "bucketlist-items", bucketListItemId];
  const {
    data: bucketListItem,
    isLoading,
    refetch,
  } = useQuery<BucketListItem>(queryKey, () =>
    axios.get(URL).then(result => result.data)
  );

  const onSubmit = async (values: TripDates) => {
    const start_date = new Date(values.start_date).toISOString().split(".")[0];
    const end_date = new Date(values.end_date).toISOString().split(".")[0];

    await axios.patch(URL, {
      start_date,
      end_date,
    });
    queryClient.invalidateQueries(queryKey);
    navigate("/bucketlist-items");
  };

  const deleteBucketListItem = async () => {
    await axios.delete(URL);
    navigate("/bucketlist-items");
  };

  const markDestinationPublic = async () => {
    await axios.patch(
      `/employee/bucketlist-items/${bucketListItem?.id}/make-public`
    );
    refetch();
  };

  return (
    <Layout title="Add bucket list destination">
      <Card>
        <h2 className="text-2xl font-semibold mb-6">Edit bucket list item</h2>
        {!isLoading && bucketListItem && (
          <>
            <BucketListItemForm
              onSubmit={onSubmit}
              destinationId={bucketListItem.destination_id}
              initialValues={{
                start_date: dayjs(bucketListItem.start_date + "Z").format(
                  "YYYY-MM-DD"
                ),
                end_date: dayjs(bucketListItem.end_date + "Z").format(
                  "YYYY-MM-DD"
                ),
              }}
            />
            <Button onClick={deleteBucketListItem}>Delete item</Button>
            {user &&
              bucketListItem.destination.is_reviewed &&
              bucketListItem.destination.owner_id === user.id &&
              bucketListItem.destination.visibility === "private" && (
                <Button onClick={markDestinationPublic}>
                  Mark underlying destination as public
                </Button>
              )}
          </>
        )}
      </Card>
    </Layout>
  );
};

export default EditBucketListItemPage;
