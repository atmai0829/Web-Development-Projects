const follows = require("./data/follows.json");
const users = require("./data/users.json");

module.exports = {
  getFollowing: (id) => {
    return new Promise((resolve, reject) => {
      let followingList = follows[id].following;
      let followingListInfo = followingList.map((follow) => ({
        ...follow, userInfo: users[follow],
      }))

      resolve(followingListInfo);
    });
  },
  newFollow: (followId, userId) => {
    return new Promise((resolve, reject) => {
      followId = parseInt(followId);
      userId = parseInt(userId);
      let user = follows[userId];
      if (user.following.includes(followId)) {
        console.log("Already following");
        reject();
      } else {
        user.following.push(followId);
        resolve(true);
      }
    });
  },

  unFollow: (followId, userId) => {
    return new Promise((resolve, reject) => {
      userId = parseInt(userId);
      followId = parseInt(followId);
      let user = follows[userId];

      if (user.following.includes(followId)) {
        let index = user.following.indexOf(followId);
        user.following.splice(index, 1);
        resolve(true);
      } else {
        console.log("User is not following other.");
        reject();
      }
    });
  },
};
