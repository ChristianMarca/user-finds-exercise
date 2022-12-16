export type TableColumn<T extends Record<string, string | number>> = {
  title: string;
  key: keyof T;
};

export interface TableProps<T extends Record<string, string | number>> {
  data: T[];
  columns: TableColumn<T>[];
  onDelete: (data: T) => void;
}
