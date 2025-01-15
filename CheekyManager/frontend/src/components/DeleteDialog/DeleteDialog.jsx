import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./DeleteDialog.css";
import { deleteTask } from "../../services/taskService";

function DeleteDialog({ open, setOpen, task }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState(undefined);
  const handleClose = () => setOpen(false);

  const { mutate: deleteATask } = useMutation({
    mutationKey: ["delete"],
    mutationFn: () => deleteTask(task.task_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
    },
    onError: () => {
      setError("Cannot create task.");
    },
  });

  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="dialog-body">
          <Modal.Title className="title">Delete Task</Modal.Title>
        </Modal.Header>

        <Modal.Body className="dialog-body">
          <div className="delete">
            Do you want to delete task '{task.task_name}' and all of its data?
          </div>
          <Modal.Footer className="dialog-body">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={deleteATask}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteDialog;
