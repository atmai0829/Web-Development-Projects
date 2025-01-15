// src/db/HowlDAO.js
const howls = require("./data/howls.json");
const follows = require("./data/follows.json");
const users = require("./data/users.json");

module.exports = {
  getHowls: (user) => {
    return new Promise((resolve) => {
      const userHowls = Object.values(howls)
        .filter((howl) => user.id === howl.userId)
        .map((howl) => ({
          ...howl,
          userInfo: users[howl.userId],
        }));
      let followingList = follows[user.id].following;
      let followingHowls = followingList
        .flatMap((followId) =>
          Object.values(howls).filter((howl) => followId === howl.userId)
        )
        .map((howl) => ({
          ...howl,
          userInfo: users[howl.userId],
        }));
      const allHowls = [...userHowls, ...followingHowls].sort(
        (a, b) => new Date(a.datetime) - new Date(b.datetime)
      );

      resolve(allHowls);
    });
  },

  createHowl: (user, message) => {
    return new Promise((resolve, reject) => {
      const newHowl = {
        id: howls.length + 1,
        userId: user.id,
        datetime: new Date().toISOString(),
        text: message,
        userInfo: users[user.id],
      };

      howls.push(newHowl);
      resolve(newHowl);
    });
  },
  getHowlsByUserId: (userId) => {
    return new Promise((resolve) => {
      const howlsByUser = Object.values(howls)
        .filter((howl) => userId == howl.userId)
        .map((howl) => ({
          ...howl,
          userInfo: users[howl.userId],
        }))
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      resolve(howlsByUser);
    });
  },
};
