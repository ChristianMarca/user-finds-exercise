import React, { useEffect, useRef, useState } from 'react';
import { AddUserForm } from '../components/add-user-form/AddUserForm.componet';
import { Button } from '../components/button/Button.component';
import { DeleteUserConfirmation } from '../components/delete-user-confirmation/DeleteUserConfirmation.component';
import { Modal } from '../components/modal/Modal.component';
import { Table } from '../components/table/Table.component';
import type { TableColumn } from '../components/table/Table.types';
import type { User } from '../api/users/types';
import { UserService } from '../api/users/service';
import { WeatherFloatingCard } from '../components/weather-floating-card/WeatherFloatingCard.component';
import { useModal } from '../hooks/use-modal';
import { WeatherSummaryContextProvider } from '../providers/weather';

const columns: TableColumn<User>[] = [
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
];
export const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const userGettingDeleted = useRef<User | null>(null);
  const {
    isOpen: isAddUserModalOpen,
    openModal: openAddUserModal,
    closeModal: closeAddUserModal
  } = useModal(false);
  const {
    isOpen: isDeleteUserModalOpen,
    openModal: openDeleteUserModal,
    closeModal: closeDeleteUserModal
  } = useModal(false);

  function addOneUser(user: User) {
    return UserService.addOne(user).then(closeAddUserModal).then(listAllUsers);
  }
  function listAllUsers() {
    return UserService.all().then(setUsers);
  }
  function deleteOneUser(user: User) {
    return UserService.deleteOne(user.id).then(closeDeleteUserModal).then(listAllUsers);
  }
  function confirmDeleteUser(user: User) {
    userGettingDeleted.current = user;
    openDeleteUserModal();
  }

  /**
   * Fetch all users on opening MainView
   */
  useEffect(() => {
    listAllUsers();
  }, []);

  return (
    <div>
      <WeatherSummaryContextProvider>
        <WeatherFloatingCard />
      </WeatherSummaryContextProvider>
      <Table data={users} columns={columns} onDelete={confirmDeleteUser} />
      <Modal title="Add User" onClose={closeAddUserModal} open={isAddUserModalOpen}>
        <AddUserForm onSubmit={addOneUser} />
      </Modal>
      {userGettingDeleted.current && (
        <Modal title="Delete User" onClose={closeDeleteUserModal} open={isDeleteUserModalOpen}>
          <DeleteUserConfirmation
            user={userGettingDeleted.current}
            onCancel={closeDeleteUserModal}
            onConfirm={deleteOneUser}
          />
        </Modal>
      )}
      <Button onClick={openAddUserModal}>Add User</Button>
    </div>
  );
};
