import { FC } from "react";

interface Column {
  name: string;
  getValue: (element: any) => JSX.Element;
}

interface OverviewTableProps {
  isLoading: boolean;
  data?: any[];
  columns: Column[];
}

const OverviewTable: FC<OverviewTableProps> = ({
  isLoading,
  data,
  columns,
}) => {
  return (
    <div className="flex flex-col items-center">
      {isLoading && <h2 className="text-2xl font-semibold mb-6">Loading...</h2>}
      {!isLoading && (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th className="px-4 py-2 text-left" key={index}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map(element => (
              <tr key={element.id} className="border-t hover:bg-gray-100">
                {columns.map((column, index) => (
                  <td className="px-4 py-2" key={index}>
                    {column.getValue(element)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OverviewTable;
