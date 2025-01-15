const db = require("./DBConnection");
const User = require("./models/User");
const crypto = require("crypto");

module.exports = {
  getUserByCredentials: (username, password) => {
    return db
      .query("SELECT * FROM users WHERE usr_username=?", [username])
      .then((rows) => {
        if (rows.length === 1) {
          // we found our user
          const user = new User(rows[0]);
          return user.validatePassword(password);
        }
        // if no user with provided username
        throw new Error("No such user");
      });
  },

  checkExists: (username) => {
    return db
      .query("SELECT * FROM users WHERE usr_username=?", [username])
      .then((rows) => {
        if (rows.length === 1) {
          // we found our user
          throw new Error("Username already exists");
        }
        return true;
      });
  },

  createUser: (user) => {
    if (
      !user.username ||
      !user.password ||
      !user.re_password ||
      !user.first_name ||
      !user.last_name
    ) {
      throw new Error("Required fields are missing");
    }
    if (user.password != user.re_password) {
      throw new Error("Passwords do not match");
    }
    const salt = crypto.randomBytes(64).toString("base64");
    crypto.pbkdf2(
      user.password,
      salt,
      100000,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) {
          //problem computing digest, like hash function not available
          reject({ code: 500, message: "Error hashing password " + err });
          return;
        }
        const digest = derivedKey.toString("hex");
        return db
          .query(
            "INSERT INTO users (usr_username, usr_first_name, usr_last_name, usr_password, usr_salt) VALUES (?, ?, ?, ?, ?)",
            [user.username, user.first_name, user.last_name, digest, salt]
          )
          .then((res) => {
            return res;
          });
      }
    );
  },
};
