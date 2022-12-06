import React, { useMemo, useState, useContext } from 'react';
import styled from 'styled-components';
import { User } from './api.types';
import { Table } from './table/Table.component';
import { TableColumn } from './table/Table.types';
import Modal from './modal/Modal.component';
import Weather from './weather/Weather.component';

import { AppContext, AppContextTypes } from '../context/AppProvider';

const Button = styled.button`
  background: blue;
  color: #fff;
  padding: 8px 20px;
  border-radius: 6px;
  margin-bottom: 20px;
  box-shadow: none;
  border: none;
  cursor: pointer;
`;

const ShowWeather = styled.div`
  margin-top: 40px;
`;

export const MainPage: React.FC = () => {
  const { userStore, weatherStore, onCreateUser, onDeleteUser } = useContext(
    AppContext
  ) as AppContextTypes;
  const [open, setOpen] = useState<boolean>(false);

  const columns: TableColumn<User>[] = useMemo(
    () => [
      {
        title: 'Email',
        key: 'email'
      },
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'User Role',
        key: 'role'
      }
    ],
    []
  );

  const handleToggleModal = () => {
    setOpen(!open);
  };

  const handleSave = (values: object) => {
    onCreateUser(values);
    handleToggleModal();
  };

  const handleDelete = (id: number | string) => {
    onDeleteUser(id);
  };

  return (
    <div>
      <Button onClick={handleToggleModal}>Add User</Button>
      <Modal open={open} onClose={handleToggleModal} onSave={handleSave} />
      <Table data={userStore.users} columns={columns} onDelete={handleDelete} />

      <ShowWeather>
        <h4>Weather</h4>
        <Weather data={(weatherStore.weather && weatherStore.weather.dataseries) || []} />
      </ShowWeather>
      {/* <div>
        {dedent`
          MANDATORY
          * FIX FE-BE communication BUG [intentional]
          * TODO ADD BUTTON AND MODAL (PORTAL) TO ADD NEW USER
          * TODO IN LIST ADD BUTTON TO REMOVE USER FROM LIST
          * TODO DISPLAY WEATHER IN A CARD (in bottom right corner as a floating card)

          NICE TO HAVE
          * STATE MANAGEMENT USING CONTEXT API OR IN WORST CASE REDUX
          * ADD TESTS
          * MIGRATE CSS COMPONENTS TO STYLED-COMPONENTS
        `}
      </div> */}
      {/* https://flowbite.com/docs/components/card/ */}
      {/* API http://localhost:3001/api/weather/location */}
    </div>
  );
};
