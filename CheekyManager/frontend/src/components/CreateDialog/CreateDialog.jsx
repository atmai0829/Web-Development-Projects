import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./CreateDialog.css";
import { createTasks } from "../../services/taskService";

function CreateDialog({ open, setOpen }) {
  const queryClient = useQueryClient();
  const [inputs, setInputs] = useState({
    task_name: "",
    task_due: "",
    task_status: "pending",
    task_priority: "low",
  });
  const [error, setError] = useState(undefined);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const { mutate: create } = useMutation({
    mutationKey: ["create"],
    mutationFn: () => createTasks(inputs),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setOpen(false);
      setInputs({
        task_name: "",
        task_due: "",
        task_status: "not_started",
        task_priority: "low",
      });
    },
    onError: () => {
      setError("Cannot create task.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    create();
  };

  return (
    <>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="dialog-body">
          <Modal.Title className="title">Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body className="dialog-body">
          <form className="dialog-container" onSubmit={handleSubmit}>
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              id="taskName"
              name="task_name"
              className="inputField"
              required
              onChange={handleChange}
            />

            <label htmlFor="taskStatus">Status</label>
            <select
              id="taskStatus"
              name="task_status"
              className="inputField"
              onChange={handleChange}
            >
              <option value="not_started">Not Started</option>
              <option value="in_progess">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <label htmlFor="taskPriority">Priority</label>
            <select
              id="taskPriority"
              name="task_priority"
              className="inputField"
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label htmlFor="taskDue">Due Date</label>
            <input
              type="datetime-local"
              id="taskDue"
              name="task_due"
              className="inputField"
              required
              onChange={handleChange}
            />

            <Modal.Footer className="dialog-body">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Add
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateDialog;
