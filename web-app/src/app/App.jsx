import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Button, 
  Form,
  Modal,
} from "react-bootstrap";
import {Search} from "react-bootstrap-icons"

import UserTable from "./UserTable";
import MyModal from "./../components/Modal";
import MyPagination from "../components/Pagination";
import FormUser from "./FormUser";
import { useUserStore } from "./../stores/user.store";

export default function App() {
  const {
    setLoading,
    users,
    pagination,
    page,
    limit,
    setPage,
    loadUsers,
    search,
  } = useUserStore();

  const [modalBody, setModalBody] = useState();
  const [modalShow, setModalShow] = useState(false);

  const [formModal, setFormModal] = useState(false);

  const [formEdit, setFormEdit] = useState();

  useEffect(() => {
    setLoading(true);

    loadUsers(getQuery());
  }, [page, limit]);

  function setModal(show = false, user) {
    setModalBody(user);

    if (user) {
      setModalShow(true);
    }
  }

  function getQuery() {
    const params = new URLSearchParams();
    params.set("limit", limit);
    params.set("page", page);
    params.set("search", search);
    return params;
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-center align-items-center vh-100">
          <Col xs="12" sm="8" md="6">
            <h1>Users</h1>

            <div className="mb-3 d-flex gap-2">
              <Form.Control
                placeholder="search..."
                onChange={(e) => setPage({ search: e.target.value })}
              />
              <Button
                onClick={() => {
                  loadUsers(getQuery());
                }}
              >
                <Search />
              </Button>
            </div>
            <div
              className="mb-3 d-flex gap-2"
              style={{ justifyContent: "flex-end" }}
            >
              <Button onClick={() => setFormModal(true)} variant="success">
                + Add
              </Button>
            </div>
            <div className="text-center">
              <UserTable
                users={users}
                setModal={setModal}
                setFormEdit={setFormEdit}
                setFormModal={setFormModal}
              />

              <MyPagination
                pagination={pagination}
                setPage={setPage}
                limit={limit}
                page={page}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {modalBody && (
        <MyModal user={modalBody} show={modalShow} onHide={setModal} />
      )}

      <Modal
        show={formModal}
        onHide={() => {
          setFormModal(false);
          setFormEdit(undefined);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formEdit ? "Edit User " + formEdit.customID : "User Form"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormUser user={formEdit} setFormModal={setFormModal} setFormEdit={setFormEdit} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
