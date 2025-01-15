import HTTPClient from "./HTTPClient.js";

const BASE_API_PATH = "./api";

const handleAuthError = (error) => {
  if (error.status == 401) {
    document.location = "./login";
  }
  console.log(error);
  throw error;
};

const getHowlsByUserId = (id) => {
  return HTTPClient.get(`${BASE_API_PATH}/howls/${id}`).catch(handleAuthError);
};

const getFollowing = (id) => {
  return HTTPClient.get(`${BASE_API_PATH}/follows/${id}`).catch(
    handleAuthError
  );
};

const getUserById = (id) => {
  return HTTPClient.get(`${BASE_API_PATH}/user/${id}`).catch(handleAuthError);
};

const newFollow = (followId, userId) => {
  return HTTPClient.post(`${BASE_API_PATH}/follow`, {
    followId: followId,
    userId: userId,
  }).catch(handleAuthError);
};

const unFollow = (followId, userId) => {
  return HTTPClient.post(`${BASE_API_PATH}/unfollow`, {
    followId: followId,
    userId: userId,
  }).catch(handleAuthError);
};

const logIn = (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  return HTTPClient.post(`${BASE_API_PATH}/users/login`, data);
};

const logOut = () => {
  return HTTPClient.post(`${BASE_API_PATH}/users/logout`, {});
};

const getCurrentUser = () => {
  return HTTPClient.get(`${BASE_API_PATH}/users/current`).catch(
    handleAuthError
  );
};

export default {
  newFollow,
  unFollow,
  getUserById,
  getHowlsByUserId,
  getFollowing,
  getCurrentUser,
  logIn,
  logOut,
};
