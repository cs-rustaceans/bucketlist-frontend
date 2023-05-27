import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useEmployee } from "../../../lib/hooks/useRole";

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
  useEmployee();
  return (
    <Layout>
      <DestinationsTable />
    </Layout>
  );
};

export default DestinationsEmployeeOverviewPage;
