const db = require("./DBConnection");
const Task = require("./models/Task");

module.exports = {
  editTask: (task) => {
    return db
      .query(
        "UPDATE tasks SET task_due = ?, task_status = ?, task_priority = ? WHERE task_id=?",
        [task.task_due, task.task_status, task.task_priority, task.task_id]
      )
      .then((row) => {
        return row;
      });
  },
  deleteTask: (taskId) => {
    return db
      .query("DELETE FROM tasks WHERE task_id=?", [taskId])
      .then((row) => {
        return row;
      });
  },
  getTasksByUserId: (userId) => {
    return db
      .query("SELECT * FROM tasks WHERE usr_id=? AND task_status!='completed'", [userId])
      .then((rows) => {
        return rows;
      });
  },

  getCompletedTasksByUserId: (userId) => {
    return db
      .query("SELECT * FROM tasks WHERE usr_id=? AND task_status='completed'", [userId])
      .then((rows) => {
        return rows;
      });
  },

  getTaskById: (taskId) => {
    return db
      .query("SELECT * FROM tasks WHERE task_id=?", [taskId])
      .then((rows) => {
        if (rows.length === 1) {
          return new Task(rows[0]);
        }
        throw new Error("Task cannot be found");
      });
  },
  createTask: async (user, task) => {
    if (
      !user.id ||
      !task.task_name ||
      !task.task_due ||
      !task.task_status ||
      !task.task_priority
    ) {
      throw new Error("Required fields are missing");
    }

    try {
      const result = await db.query(
        "INSERT INTO tasks (usr_id, task_name, task_due, task_status, task_priority) VALUES (?, ?, ?, ?, ?)",
        [
          user.id,
          task.task_name,
          task.task_due,
          task.task_status,
          task.task_priority,
        ]
      );
      const newTaskData = {
        usr_id: user.id,
        task_id: Number(result.insertId),
        task_name: task.task_name,
        task_due: task.task_due,
        task_status: task.task_status,
        task_priority: task.task_priority,
      };
      return new Task(newTaskData).toJSON();
    } catch (error) {
      throw new Error("Error posting to database");
    }
  },
  updateTask: (task) => {
    if (!task.id || !task.name || !task.due || !task.status || !task.priority) {
      throw new Error("Required fields are missing");
    }
    db.query(
      "UPDATE tasks SET task_name = ?, task_due = ?, task_status = ?, task_priority = ? WHERE task_id = ?",
      [task.name, task.due, task.status, task_priority, task.id]
    ).then(
      (task) => {
        return new Task(task).toJSON();
      },
      (err) => {
        throw new Error("Error posting to database");
      }
    );
  },
};
