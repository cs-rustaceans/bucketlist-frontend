import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireAdmin } from "../../../lib/hooks/useRole";
import dayjs from "dayjs";
import { fixDates } from "../../../lib/util";
import { BucketListItem } from "../../../models/BucketListItem";
import { Destination } from "../../../models/Destination";

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
      <>{dayjs(bucketListItem.start_date).format("LL")}</>
    ),
  },
  {
    name: "End date",
    getValue: (bucketListItem: BucketListItem) => (
      <>{dayjs(bucketListItem.end_date).format("LL")}</>
    ),
  },
];

const BucketListTable = () => {
  const axios = useAxios();

  const { data: bucketListItems, isLoading } = useQuery<Destination[]>(
    ["admin", "bucketlist-items"],
    () =>
      axios
        .get(`/admin/bucketlist-items`)
        .then(d => d.data)
        .then(d => d.map(fixDates("start_date", "end_date")))
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
