import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import CreateDialog from "../CreateDialog/CreateDialog";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

import "./TaskList.css";

import changeView from "../../images/change-view.svg";
import createIcon from "../../images/create.svg";

import { TaskTable } from "../TaskTable/TaskTable";
import { TaskTiles } from "../TaskTiles/TaskTiles";

export const TaskList = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [task, setTask] = useState();
  const [tileView, setTileView] = useState(true);

  const [search, setSearch] = useState("");
  return (
    <div className="taskListHolder">
      <div className="headerHolder">
        <div className="taskHeader">
          <div className="tempHolder">
            <header>Tasks</header>
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

            <img
              src={createIcon}
              onClick={() => {
                setOpen(true);
              }}
              className="createButton"
            />
          </div>
        </div>
      </div>
      <div className="tableHolder">
        {!tileView && (
          <TaskTable
            data={data}
            search={search}
            setDeleteOpen={setDeleteOpen}
            setTask={setTask}
          />
        )}
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
      <CreateDialog open={open} setOpen={setOpen} task={task} />
    </div>
  );
};
