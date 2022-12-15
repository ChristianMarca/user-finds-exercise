import { Button } from '../button/Button.component';
import {
  StyledTable,
  TableInnerWrapper,
  TableScrollWrapper,
  TableShadowWrapper,
  TableWrapper
} from './Table.styles';
import { TableProps } from './Table.types';

export const Table = <T extends Record<string, string | number>>({
  columns,
  data,
  onDelete
}: TableProps<T>): JSX.Element => {
  function handleDelete(data: T) {
    onDelete(data);
  }
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.map?.((row, index) => (
                  <tr key={index}>
                    {columns?.map((column) => (
                      <td key={`${index}-${column.key.toString()}`}>
                        {Object.entries(row).find(([key]) => key === column.key)?.[1]}
                      </td>
                    ))}
                    <td>
                      <Button type="button" onClick={() => handleDelete(row)}>
                        Delete
                      </Button>
                    </td>
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
