import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";
import dayjs from "dayjs/esm/index.js";
import LocalizedFormat from "dayjs/esm/plugin/localizedFormat";
import { fixDates } from "../../../lib/util";
import { BucketListItem } from "../../../models/BucketListItem";
import { Destination } from "../../../models/Destination";

dayjs.extend(LocalizedFormat);

const BucketListTable = () => {
  const axios = useAxios();

  const {
    data: bucketListItems,
    isLoading,
    refetch,
  } = useQuery<Destination[]>(["employee", "bucketlist-items"], () =>
    axios
      .get(`/employee/bucketlist-items`)
      .then(d => d.data)
      .then(d => d.map(fixDates("start_date", "end_date")))
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
        <>{dayjs(bucketListItem.start_date).format("LL")}</>
      ),
    },
    {
      name: "End date",
      getValue: (bucketListItem: BucketListItem) => (
        <>{dayjs(bucketListItem.end_date).format("LL")}</>
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
