import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCompletedTasks } from "../../services/taskService";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import logo from "../../images/logo.webp";

import "./completedView.css";
import Button from "react-bootstrap/esm/Button";

import DeleteDialog from "../DeleteDialog/DeleteDialog";
import changeView from "../../images/change-view.svg";

import { TaskTable } from "../TaskTable/TaskTable";
import { TaskTiles } from "../TaskTiles/TaskTiles";

function CompletedView({ user }) {
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [task, setTask] = useState();
  const [tileView, setTileView] = useState(true);
  const { data } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: () => getCompletedTasks(user.id),
    onError: (err) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const [search, setSearch] = useState("");
  return (
    <div className="taskListHolder">
      <div className="headerHolder">
        <div className="taskHeader">
          <div className="tempHolder1">
            <header>Completed Tasks</header>
            <InputGroup className="inputGroup">
              <Form.Control
                placeholder="Search for a task by name"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="formButton1"
              />
            </InputGroup>
          </div>
          <div className="tempHolder2">
            <img
              src={changeView}
              onClick={() => {
                setTileView(!tileView);
              }}
              className="changeView"
            />
          </div>
        </div>
      </div>
      <div className="tableHolder">
        {!tileView && <TaskTable data={data} search={search} />}
        {tileView && (
          <TaskTiles
            data={data}
            search={search}
            setDeleteOpen={setDeleteOpen}
            setTask={setTask}
          />
        )}
      </div>
      {deleteOpen && (
        <DeleteDialog open={deleteOpen} setOpen={setDeleteOpen} task={task} />
      )}
    </div>
  );
}

export default CompletedView;
