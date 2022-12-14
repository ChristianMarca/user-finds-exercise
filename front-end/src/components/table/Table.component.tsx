import {
  StyledTable,
  TableInnerWrapper,
  TableScrollWrapper,
  TableShadowWrapper,
  TableWrapper,
} from "./Table.styles";
import { TableProps } from "./Table.types";

export const Table = <T extends Record<string, string | number>>({
  columns,
  data,
}: TableProps<T>): JSX.Element => {
  return (
    <TableWrapper>
      <TableScrollWrapper>
        <TableInnerWrapper>
          <TableShadowWrapper>
            <StyledTable>
              <thead>
                <tr>
                  {columns?.map((column) => (
                    <th key={column.title} scope="col">
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map?.((row, index) => (
                  <tr key={index}>
                    {columns?.map((column) => (
                      <td key={`${index}-${column.key}`}>
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
            </StyledTable>
          </TableShadowWrapper>
        </TableInnerWrapper>
      </TableScrollWrapper>
    </TableWrapper>
  );
};
