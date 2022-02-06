import React, { useEffect, useMemo, useState } from "react";
import { User } from "./api.types";
import { Table } from "./Table.component";
import { TableColumn } from "./Table.types";

export const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/users/all")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  const columns: TableColumn<User>[] = useMemo(
    () => [
      {
        title: "Email",
        key: "email",
      },
      {
        title: "Name",
        key: "name",
      },
      {
        title: "User Role",
        key: "role",
      },
    ],
    []
  );

  return (
    <div>
      <Table data={users} columns={columns} />
      TODO DISPLAY WEATHER IN A CARD
      {/* https://flowbite.com/docs/components/card/ */}
      {/* API http://localhost:3001/api/weather/location */}
    </div>
  );
};
