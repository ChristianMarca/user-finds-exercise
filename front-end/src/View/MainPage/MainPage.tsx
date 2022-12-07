import React, { useEffect, useMemo, useState } from 'react'
import { User } from '../../components/api.types';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import Table from '../../components/Table'
import { TableColumn } from '../../components/Table.types';
import { IFormUser, useAppState } from '../../context';
import { StyledButtonAdd, StyledContainerFloatCard, StyledContentUser } from './components';

const MainPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const { getUsers, users, addUser, deleteUser, getLocation, location } = useAppState()

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    getUsers()
    getLocation()
  }, []);

  const onSubmit = (body: IFormUser) => {
    addUser(body)
    setOpenModal(false)
  }

  const onDelete = (id: string | number) => {
    deleteUser(id)

  }

  const columns: TableColumn<User>[] = useMemo(() => [
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
      <StyledContentUser>
        <div>
          <h1>User Table</h1>
        </div>
        <div>
          <StyledButtonAdd onClick={handleOpenModal}>Add User</StyledButtonAdd>
        </div>
      </StyledContentUser>
      <Table data={users} columns={columns} onDelete={onDelete} />
      <StyledContainerFloatCard>
        <Card data={location} />
      </StyledContainerFloatCard>
      {openModal ? (
        <Modal open={openModal} setClose={handleCloseModal} onSubmit={onSubmit} />
      ) : null}
    </div>
  )
}

export { MainPage }