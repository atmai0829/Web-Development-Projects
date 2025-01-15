import trash from "../../images/trash.svg";
import { useState } from "react";
import { editTask as editTaskFunction } from "../../services/taskService";
import "./TaskTiles.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const TaskTiles = ({ data, search, setTask, setDeleteOpen }) => {
  const calculateColor = (dueDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const totalTime = due - currentDate;

    if (totalTime <= 0) {
      return "rgb(230, 102, 102)";
    }

    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (totalTime >= sevenDays) {
      return "rgb(104, 187, 104)";
    }

    return "rgb(214, 214, 109)";
  };

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
        let css = "tileHeaderColor";
        const headerBackgroundColor = calculateColor(row.task_due.slice(0, -8));
        return (
          <div className="tile">
            <div
              className={css}
              style={{ backgroundColor: headerBackgroundColor }}
            >
              <div className="tileHeader">{row.task_name} </div>
              <div className="trashIcon">
                <img
                  src={trash}
                  onClick={() => {
                    setTask(row);
                    setDeleteOpen(true);
                  }}
                />
              </div>
            </div>
            <div className="tileBody">
              <div className="tileSectionHolder">
                Due
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
              </div>
              <div className="tileSectionHolder">
                Status
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
              </div>
              <div className="tileSectionHolder">
                Priority
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
              </div>
            </div>
          </div>
        );
      }
    });
    if (!hit) {
      return <div className="noTasks">No tasks to display</div>;
    }
    return <div className="tilesHolder">{rowData}</div>;
  }
};
