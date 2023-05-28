import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";

const BucketListTable = () => {
  const axios = useAxios();

  const {
    data: bucketListItems,
    isLoading,
    refetch,
  } = useQuery<Destination[]>(["employee", "bucketlist-items"], () =>
    axios.get(`/employee/bucketlist-items`).then(d => d.data)
  );

  const changeFavourite = async (bucketListItemId: number) => {
    await axios.patch(
      `/employee/bucketlist-items/${bucketListItemId}/make-favorite`
    );
    refetch();
  };

  const columns = [
    {
      name: "Name",
      getValue: (bucketListItem: BucketListItem) => (
        <Link to={`/bucketlist-items/${bucketListItem.id}`}>
          {bucketListItem.destination.name}
        </Link>
      ),
    },
    {
      name: "Start date",
      getValue: (bucketListItem: BucketListItem) => (
        <>{bucketListItem.start_date.toString()}</>
      ),
    },
    {
      name: "End date",
      getValue: (bucketListItem: BucketListItem) => (
        <>{bucketListItem.end_date.toString()}</>
      ),
    },
    {
      name: "Favourite",
      getValue: (bucketListItem: BucketListItem) => (
        <input
          disabled={!bucketListItem.destination.is_reviewed}
          type="radio"
          name="favourite-radio-group"
          checked={bucketListItem.is_favorite}
          onChange={e => {
            changeFavourite(bucketListItem.id);
          }}
        />
      ),
    },
  ];

  return (
    <OverviewTable
      isLoading={isLoading}
      data={bucketListItems}
      columns={columns}
    />
  );
};

const BucketListItemsOverviewPage = () => {
  useRequireEmployee();
  return (
    <Layout title="My bucket-list">
      <Link to="/bucketlist-items/add">
        <Button>Add new bucket list item with custom destination</Button>
      </Link>
      <BucketListTable />
    </Layout>
  );
};

export default BucketListItemsOverviewPage;
