import { StyledBlockTable, StyledButtonDelete, StyledContainerTable, StyledContentTable, StyledLayoutTable, StyledTable, StyledTableBody, StyledTableHead, StyledTableTD, StyledTableTH, StyledTableTR } from "./components";

export type TableColumn<T extends Record<string, string | number>> = {
  title: string;
  key: keyof T;
};

export interface TableProps<T extends Record<string, string | number>> {
  data: T[] | null;
  columns: TableColumn<T>[];
  onDelete: (id: string | number) => void;
}

export const Table = <T extends Record<string, string | number>>({
  columns,
  data,
  onDelete
}: TableProps<T>): JSX.Element => {
  return (
    <StyledLayoutTable>
      <StyledContainerTable>
        <StyledBlockTable>
          <StyledContentTable>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  {columns?.map((column) => (
                    <StyledTableTH
                      key={column.title}
                      scope="col"
                    >
                      {column.title}
                    </StyledTableTH>
                  ))}
                  <StyledTableTH
                    scope="col"
                  >Action</StyledTableTH>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {data?.map?.((row, index) => (
                  <StyledTableTR
                    key={index}
                  >
                    {columns?.map((column) => (
                      <>
                        <StyledTableTD
                          key={`${index}-${column.key as string}`}
                        >
                          {Object.entries(row).find(([key, value]) => key === column.key)?.[1]}
                        </StyledTableTD>
                      </>
                    ))}
                    <StyledTableTD
                    ><StyledButtonDelete onClick={() => onDelete(row.id)}>Delete</StyledButtonDelete></StyledTableTD>
                  </StyledTableTR>
                ))}
              </StyledTableBody>
            </StyledTable>
          </StyledContentTable>
        </StyledBlockTable>
      </StyledContainerTable>
    </StyledLayoutTable>
  );
};
