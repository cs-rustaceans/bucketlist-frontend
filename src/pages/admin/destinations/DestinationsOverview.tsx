import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";
import useAxios from "../../../lib/hooks/useAxios";
import { useAdmin } from "../../../lib/hooks/useRole";

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
      <div className="flex flex-col items-center">
        {isLoading && (
          <h2 className="text-2xl font-semibold mb-6">Loading...</h2>
        )}
        {!isLoading && (
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Latitude</th>
                <th className="px-4 py-2 text-left">Longitude</th>
                <th className="px-4 py-2 text-left">Is reviewed</th>
              </tr>
            </thead>
            <tbody>
              {destinations?.map(destination => (
                <tr key={destination.id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">
                    <Link to={`/admin/destinations/${destination.id}`}>
                      {destination.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{destination.latitude}</td>
                  <td className="px-4 py-2">{destination.longitude}</td>
                  <td className="px-4 py-2">{destination.is_reviewed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

const UsersOverview = () => {
  useAdmin();
  return (
    <Layout>
      <Link to="/admin/destinations/add">
        <Button>Add destination</Button>
      </Link>
      <br />
      <DestinationsTable />
    </Layout>
  );
};

export default UsersOverview;
