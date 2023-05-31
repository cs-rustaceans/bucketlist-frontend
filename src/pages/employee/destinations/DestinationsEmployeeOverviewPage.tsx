import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useRequireEmployee } from "../../../lib/hooks/useRole";
import { Destination } from "../../../models/Destination";

const columns = [
  {
    name: "Name",
    getValue: (destination: Destination) => (
      <Link to={`/destinations/${destination.id}`}>{destination.name}</Link>
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
  {
    name: "",
    getValue: (destination: Destination) => (
      <Link to={`/destinations/${destination.id}`}>
        <Button>Add</Button>
      </Link>
    ),
  },
];

const DestinationsTable = () => {
  const axios = useAxios();

  const { data: destinations, isLoading } = useQuery<Destination[]>(
    ["employee", "destinations"],
    () => axios.get(`/employee/destinations`).then(d => d.data)
  );

  return (
    <OverviewTable
      isLoading={isLoading}
      data={destinations}
      columns={columns}
    />
  );
};

const DestinationsEmployeeOverviewPage = () => {
  useRequireEmployee();
  return (
    <Layout title="Destinations overview">
      <DestinationsTable />
    </Layout>
  );
};

export default DestinationsEmployeeOverviewPage;
