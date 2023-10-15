import React from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";

export default function MyModal(props) {
  const { customID, fullName, phone, email, _id } = props.user;

  return (
    <Modal
      {...props} 
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">CustomId {customID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>userId: {_id}</ListGroup.Item>
          <ListGroup.Item>fullName: {fullName}</ListGroup.Item>
          <ListGroup.Item>Phone: {phone}</ListGroup.Item>
          <ListGroup.Item>Email: {email}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
