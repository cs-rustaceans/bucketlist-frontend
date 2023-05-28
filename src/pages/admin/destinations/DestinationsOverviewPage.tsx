import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireAdmin } from "../../../lib/hooks/useRole";

const columns = [
  {
    name: "Name",
    getValue: (destination: Destination) => (
      <Link to={`/admin/destinations/${destination.id}`}>
        {destination.name}
      </Link>
    ),
  },
  {
    name: "Latitude",
    getValue: (destination: Destination) => <>{destination.latitude}</>,
  },
  {
    name: "Longitude",
    getValue: (destination: Destination) => <>{destination.longitude}</>,
  },
  {
    name: "Is reviewed",
    getValue: (destination: Destination) => <>{`${destination.is_reviewed}`}</>,
  },
];

const DestinationsTable = () => {
  const axios = useAxios();
  const [unreviewed, setUnreviewed] = useState(false);

  const { data: destinations, isLoading } = useQuery<Destination[]>(
    ["admin", "destinations", unreviewed],
    () =>
      axios
        .get(`/admin/destinations${unreviewed ? "/unreviewed" : ""}`)
        .then(d => d.data)
  );

  return (
    <>
      <label>
        See unreviewed destinations
        <input
          type="checkbox"
          checked={unreviewed}
          onChange={_ => {
            setUnreviewed(unreviewed => !unreviewed);
          }}
        />
      </label>
      <OverviewTable
        isLoading={isLoading}
        data={destinations}
        columns={columns}
      />
    </>
  );
};

const DestinationsOverviewPage = () => {
  useRequireAdmin();
  return (
    <Layout title="Destinations overview">
      <Link to="/admin/destinations/add">
        <Button>Add destination</Button>
      </Link>
      <br />
      <DestinationsTable />
    </Layout>
  );
};

export default DestinationsOverviewPage;
