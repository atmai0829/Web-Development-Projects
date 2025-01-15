const express = require("express");
const cookieParser = require("cookie-parser");

const apiRouter = express.Router();

apiRouter.use(cookieParser());
apiRouter.use(express.json());

const {
  TokenMiddleware,
  generateToken,
  removeToken,
} = require("./middleware/TokenMiddleware");

const UserDAO = require("./db/UserDAO");
const TaskDAO = require("./db/TaskDAO");

apiRouter.post("/tasks", TokenMiddleware, (req, res) => {
  let newTasks = req.body;
  TaskDAO.createTask(req.user, newTasks)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error adding Task" });
    });
});

apiRouter.get("/users/tasks", TokenMiddleware, (req, res) => {
  TaskDAO.getTasksByUserId(req.user.id)
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error getting Task" });
    });
});

apiRouter.get("/users/:userId/tasks/completed", TokenMiddleware, (req, res) => {
  TaskDAO.getCompletedTasksByUserId(req.user.id)
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error getting Task" });
    });
});

apiRouter.post("/users/login", (req, res) => {
  if (req.body.username && req.body.password) {
    UserDAO.getUserByCredentials(req.body.username, req.body.password)
      .then((user) => {
        generateToken(req, res, user);
        res.json({ user: user });
      })
      .catch((err) => {
        console.log(err);
        res.status(err.code || 500).json({ error: err });
      });
  } else {
    res.status(400).json({ error: "Credentials not provided" });
  }
});

apiRouter.post("/users", async (req, res) => {
  console.log(req.body);
  if (req.body) {
    UserDAO.checkExists(req.body.username)
      .then((res) => {
        console.log(res);
        console.log("hi");
        return UserDAO.createUser(req.body);
      })
      .then((user) => {
        console.log("here", user);
        res.status(200).json({ message: "User Created" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    res.status(400).json({ error: "Credentials not provided" });
  }
});

apiRouter.post("/users/logout", (req, res) => {
  removeToken(req, res);
  res.json({ success: true });
});

apiRouter.get("/users/current", TokenMiddleware, (req, res) => {
  res.json(req.user);
});

apiRouter.delete("/tasks/:taskId", TokenMiddleware, (req, res) => {
  if (req.params.taskId) {
    TaskDAO.deleteTask(req.params.taskId).then(
      () => {
        res.json({ removed: true });
      },
      () => {
        res.status(404);
      }
    );
  }
});

apiRouter.put("/tasks/:taskId", TokenMiddleware, (req, res) => {
  if (req.body) {
    TaskDAO.editTask(req.body).then(
      () => {
        res.json({ removed: true });
      },
      () => {
        res.status(404);
      }
    );
  }
});

module.exports = apiRouter;
