import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";

const BucketListTable = () => {
  const axios = useAxios();

  const { data: bucketListItems, isLoading } = useQuery<Destination[]>(
    ["employee", "bucketlist-items"],
    () => axios.get(`/employee/bucketlist-items`).then(d => d.data)
  );

  const changeFavourite = async (bucketListItemId: number) => {
    console.log("Setting favourite to", bucketListItemId);
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
      <BucketListTable />
    </Layout>
  );
};

export default BucketListItemsOverviewPage;
