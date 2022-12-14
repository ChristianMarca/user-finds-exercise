import React, { useEffect, useState } from "react";
import { Table } from "../components/table/Table.component";
import { Modal } from "../components/modal/Modal.component";
import { Button } from "../components/button/Button.component";
import { UserService } from "../api/users/service";
import { useModal } from "../hooks/use-modal";
import { AddUserForm } from "../components/add-user-form/AddUserForm";
import type { User } from "../components/api.types";
import type { TableColumn } from "../components/table/Table.types";

const columns: TableColumn<User>[] = [
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
];
export const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const {
    isOpen: isAddUserModalOpen,
    openModal: openAddUserModal,
    closeModal: closeAddUserModal,
  } = useModal(false);

  function addOneUser(user: User) {
    return UserService.addOne(user).then(closeAddUserModal).then(listAllUsers);
  }
  function listAllUsers() {
    return UserService.all().then(setUsers);
  }

  /**
   * Fetch all users on opening MainView
   */
  useEffect(() => {
    listAllUsers();
  }, []);

  return (
    <div>
      <Table data={users} columns={columns} />
      <Modal
        title="Add User"
        onClose={closeAddUserModal}
        open={isAddUserModalOpen}
      >
        <AddUserForm onSubmit={addOneUser} />
      </Modal>
      <Button onClick={openAddUserModal}>Add User</Button>
    </div>
  );
};
