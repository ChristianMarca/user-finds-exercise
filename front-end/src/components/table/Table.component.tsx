import styled from 'styled-components';
import { TableProps } from './Table.types';

const Button = styled.button`
  background: none;
  color: blue;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 6px;
  overflow: hidden;
`;

const TableCustom = styled.table`
  width: 100%;
`;

const TableHead = styled.thead``;

const TableHeadName = styled.td`
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #000;
  padding: 15px;
  box-sizing: border-box;
`;

const TableBody = styled.thead``;

const TableRow = styled.tr`
  border-top: 1px solid #ddd;
`;

const TableCell = styled.td`
  letter-spacing: 0.05em;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #444;
  padding: 15px;
  box-sizing: border-box;
`;

export const Table = <T extends Record<string, string | number>>({
  columns,
  data,
  onDelete
}: TableProps<T>): JSX.Element => {
  const handleDelete = (id: number | string) => {
    onDelete(id);
  };

  return (
    <Wrapper>
      <TableCustom>
        <TableHead>
          <tr>
            {columns?.map((column) => (
              <TableHeadName key={column.title} scope="col">
                {column.title}
              </TableHeadName>
            ))}
            <TableHeadName>Actions</TableHeadName>
          </tr>
        </TableHead>

        <TableBody>
          {data?.map?.((row, index) => (
            <TableRow key={index}>
              {columns?.map((column, key) => (
                <TableCell key={`${index}-${key}`}>
                  {Object.entries(row).find(([key]) => key === column.key)?.[1]}
                </TableCell>
              ))}
              <TableCell>
                <Button onClick={() => handleDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableCustom>
    </Wrapper>
  );
};
