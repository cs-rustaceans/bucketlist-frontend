import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireAdmin } from "../../../lib/hooks/useRole";

const columns = [
  {
    name: "User id",
    getValue: (bucketListItem: BucketListItem) => (
      <Link to={`/admin/users/${bucketListItem.owner_id}`}>
        {bucketListItem.owner_id}
      </Link>
    ),
  },
  {
    name: "Destination",
    getValue: (bucketListItem: BucketListItem) => (
      <>{bucketListItem.destination.name}</>
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
];

const BucketListTable = () => {
  const axios = useAxios();

  const { data: bucketListItems, isLoading } = useQuery<Destination[]>(
    ["admin", "bucketlist-items"],
    () => axios.get(`/admin/bucketlist-items`).then(d => d.data)
  );

  return (
    <OverviewTable
      isLoading={isLoading}
      data={bucketListItems}
      columns={columns}
    />
  );
};

const FavouriteBucketListItemsOverviewPage = () => {
  useRequireAdmin();
  return (
    <Layout title="Favourite bucketlist items">
      <BucketListTable />
    </Layout>
  );
};

export default FavouriteBucketListItemsOverviewPage;
