const express = require("express");
const cookieParser = require("cookie-parser");

const apiRouter = express.Router();

apiRouter.use(cookieParser());
apiRouter.use(express.json());

const {
  AuthenticateUser,
  initializeSession,
  removeSession,
} = require("../middleware/AuthenticateUser");

const HowlDAO = require("./db/HowlDAO");
const UserDAO = require("./db/UserDAO");
const FollowerDAO = require("./db/FollowerDAO");

apiRouter.get("/users/current/howls", AuthenticateUser, async (req, res) => {
  HowlDAO.getHowls(req.user).then((howls) => {
    res.json(howls);
  });
});

apiRouter.post("/howls", AuthenticateUser, (req, res) => {
  HowlDAO.createHowl(req.user, req.body.message)
    .then((newHowl) => {
      res.json(newHowl);
    })
    .catch((error) => {
      res.status(404).json({ error: "Failed to create howl" });
    });
});

apiRouter.get("/howls/:id", AuthenticateUser, (req, res) => {
  const userId = req.params.id;
  HowlDAO.getHowlsByUserId(userId)
    .then((howls) => {
      res.json(howls);
    })
    .catch((err) => {
      res.status(404).json({ error: "Howls not found" });
    });
});

apiRouter.get("/follows/:id", AuthenticateUser, (req, res) => {
  const userId = req.params.id;
  FollowerDAO.getFollowing(userId).then((following) => {
    res.json(following);
  });
});

apiRouter.get("/user/:id", AuthenticateUser, (req, res) => {
  const userId = req.params.id;
  UserDAO.getUserById(userId).then((user) => {
    res.json(user);
  });
});

apiRouter.post("/follow", AuthenticateUser, (req, res) => {
  FollowerDAO.newFollow(req.body.followId, req.body.userId).then((boolean) => {
    res.json(boolean);
  });
});

apiRouter.post("/unfollow", AuthenticateUser, (req, res) => {
  FollowerDAO.unFollow(req.body.followId, req.body.userId).then((boolean) => {
    res.json(boolean);
  });
});

apiRouter.post("/users/login", (req, res) => {
  if (req.body.username && req.body.password) {
    UserDAO.loginUser(req.body.username, req.body.password)
      .then((user) => {
        initializeSession(req, res, user);
        res.json({ user: user });
        return;
      })
      .catch((err) => {
        console.log(err);
        res.status(err.code).json({ error: err.message });
      });
  } else {
    res.status(400).json({ error: "Credentials not provided" });
  }
});

apiRouter.post("/users/logout", (req, res) => {
  removeSession(req, res);
  res.json({ success: true });
});

apiRouter.get("/users/current", AuthenticateUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = apiRouter;
