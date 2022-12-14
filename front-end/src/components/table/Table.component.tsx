import { TableProps } from "./Table.types";

export const Table = <T extends Record<string, string | number>>({
  columns,
  data,
}: TableProps<T>): JSX.Element => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block py-2 min-w-full">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {columns?.map((column) => (
                    <th
                      key={column.title}
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map?.((row, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    {columns?.map((column) => (
                      <td
                        key={`${index}-${column.key}`}
                        className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {
                          Object.entries(row).find(
                            ([key, value]) => key === column.key
                          )?.[1]
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
