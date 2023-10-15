import React from "react";
import { PencilSquare, Eye, Trash } from "react-bootstrap-icons";

import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useUserStore } from "../stores/user.store";

export default function UserTable({
  users,
  setModal,
  setFormEdit,
  setFormModal,
}) {
  const { delUser } = useUserStore();

  return (
    <div className="custom-table table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Id</th>
            <th>FullName</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.customID}>
              <td>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setFormEdit(user);
                      setFormModal(true);
                    }}
                    variant="warning"
                  >
                    <PencilSquare color="white" />
                  </Button>
                  <Button
                    onClick={() => setModal(true, user)}
                    variant="primary"
                  >
                    <Eye />
                  </Button>
                  <Button onClick={() => delUser(user._id)} variant="danger">
                    <Trash />
                  </Button>
                </ButtonGroup>
              </td>
              <td>{String(user.customID).padStart(6, "0")}</td>
              <td>{user.fullName}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
