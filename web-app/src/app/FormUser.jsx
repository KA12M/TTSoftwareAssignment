import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { useUserStore } from "./../stores/user.store";

export default function FormUser({ user = {}, setFormModal, setFormEdit }) {
  const { newUser, updateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({ defaultValues: user ?? {} });

  function onSubmit(data) {
    if (user._id)
      updateUser(data).then(() => {
        setFormModal(false);
        setFormEdit(undefined);
        reset();
      });
    else
      newUser(data).then(() => {
        setFormModal(false);
        reset();
      });
  }

  return (
    <div className="mb-3 mt-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            {...register("fullName", { required: true })}
            placeholder="Enter full name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            {...register("phone", { required: true })}
            placeholder="Enter phone"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="w-100"
          disabled={user._id && !isDirty}
        >
          Save
        </Button>
      </Form>
    </div>
  );
}
