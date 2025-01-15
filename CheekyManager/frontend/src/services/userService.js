import axios from "axios";

export const userLogin = async (username, password) => {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (response.status != 200) {
    throw new Error();
  }
  return response;
};

export const userRegister = async (user) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.status != 200) {
    throw new Error();
  }
  return response;
};

export const getCurrentUser = async () => {
  const response = await fetch("/api/users/current", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (response.status != 200) {
    throw new Error();
  }
  return response;
};

export const userLogout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  return response.json();
};
