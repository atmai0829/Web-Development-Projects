import trash from "../../images/trash-1.svg";
import "../TaskList/TaskList.css";
import { useState } from "react";
import { editTask as editTaskFunction } from "../../services/taskService";
import "./TaskTable.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const TaskTable = ({ data, search, setTask, setDeleteOpen }) => {
  const queryClient = useQueryClient();
  const [editTask, setEditTask] = useState();
  const { mutate: updateTask } = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: () => editTaskFunction(editTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  if (data) {
    let hit = false;
    const rowData = data.map((row) => {
      if (
        search == "" ||
        search == undefined ||
        row.task_name.toLowerCase().includes(search.toLowerCase())
      ) {
        hit = true;
        return (
          <tr className="hoverRow" key={row.task_id}>
            <td>{row.task_name}</td>
            <td>
              <input
                className="tileDate"
                type="datetime-local"
                value={row.task_due.slice(0, -1)}
                onChange={(e) => {
                  console.log(e.target.value);
                  setEditTask({
                    ...row,
                    task_due: e.target.value,
                  });
                  updateTask();
                }}
              />
            </td>
            <td>
              <select
                className="tileSelect"
                defaultValue={row.task_priority}
                onChange={(e) => {
                  setEditTask({
                    ...row,
                    task_priority: e.target.value,
                    task_due: row.task_due.slice(0, -8),
                  });
                  updateTask();
                }}
              >
                <option key="1" value="low">
                  Low
                </option>
                <option key="2" value="medium">
                  Medium
                </option>
                <option key="3" value="high">
                  High
                </option>
              </select>
            </td>
            <td>
              <select
                className="tileSelect"
                defaultValue={row.task_status}
                onChange={(e) => {
                  setEditTask({
                    ...row,
                    task_status: e.target.value,
                    task_due: row.task_due.slice(0, -8),
                  });
                  updateTask();
                }}
              >
                  <option key="1" value="not_started">
                    Not Started
                  </option>
                  <option key="2" value="in_progress">
                    In Progress
                  </option>
                  <option key="3" value="completed">
                    Completed
                  </option>
              </select>
            </td>
            <td>
              <img
                className="trash"
                src={trash}
                onClick={() => {
                  console.log("yuh");
                  setTask(row);
                  setDeleteOpen(true);
                }}
              />
            </td>
          </tr>
        );
      }
    });
    if (!hit) {
      return <div className="noTasks">No tasks to display</div>;
    }
    return (
      <table border="1" frame="void" rules="rows">
        <thead>
          <tr>
            <th scope="col" className="longer">
              Name
            </th>
            <th scope="col" className="longer">
              Date Due
            </th>
            <th scope="col" className="shorter">
              Priority
            </th>
            <th scope="col" className="shorter">
              Status
            </th>
            <th className="trashCol">
              {" "}
              <div></div>
            </th>
          </tr>
        </thead>
        <tbody>{rowData}</tbody>
      </table>
    );
  }
};
