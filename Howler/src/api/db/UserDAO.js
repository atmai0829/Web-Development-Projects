const crypto = require("crypto");

let users = require("./data/users.json");
function getFilteredUser(user) {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    avatar: user.avatar,
  };
}
module.exports = {
  createUser: (user) => {
    return new Promise((resolve, reject) => {
      users.forEach((value) => {
        if (value.username === user.username) {
          console.log(`User already exists: ${value.username}`);
          reject();
          return;
        }
      });
      users.push(user);
      resolve(true);
    });
  },
  loginUser: (username, password) => {
    return new Promise((resolve, reject) => {
      const user = Object.values(users).find(
        (user) => user.username == username
      );
      if (!user) {
        reject({ code: 401, message: "No such user" });
        return;
      }

      crypto.pbkdf2(
        password,
        user.salt,
        100000,
        64,
        "sha512",
        (err, derivedKey) => {
          if (err) {
            reject({ code: 401, message: "Error hashing password " + err });
            return;
          }
          const digest = derivedKey.toString("hex");
          if (user.password == digest) {
            resolve(getFilteredUser(user));
          } else {
            reject({ code: 401, message: "Invalid password" });
          }
        }
      );
    });
  },
  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
      const user = users[userId];
      if (!user) {
        reject();
      }
      resolve(getFilteredUser(user));
    });
  },
};
