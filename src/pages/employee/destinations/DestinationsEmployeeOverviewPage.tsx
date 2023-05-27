import { useQuery } from "react-query";
import Layout from "../../../components/Layout";
import OverviewTable from "../../../components/OverviewTable";
import useAxios from "../../../lib/hooks/useAxios";
import { useEmployee } from "../../../lib/hooks/useRole";
import { destinationColumns } from "../../admin/destinations/DestinationsOverviewPage";

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
      columns={destinationColumns}
    />
  );
};

const DestinationsOverviewPage = () => {
  useEmployee();
  return (
    <Layout>
      <DestinationsTable />
    </Layout>
  );
};

export default DestinationsOverviewPage;
