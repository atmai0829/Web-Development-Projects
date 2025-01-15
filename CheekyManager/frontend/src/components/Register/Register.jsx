import { useState } from "react";
import "./Register.css";
import logo from "../../images/logo.webp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin, userRegister } from "../../services/userService";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Register({ setState }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });

  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => userLogin(user.username, user.password),
    retry: 10,
    retryDelay: 1000,
    onSuccess: () => {
      setLoading(false);
      setError(false);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const { mutate: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => userRegister(user),
    onSuccess: () => {
      setLoading(true);
      login();
    },
    onError: () => {
      setError("Error registering");
    },
  });

  const handleCreateAccount = () => {
    if (
      !user.username ||
      !user.first_name ||
      !user.last_name ||
      !user.password ||
      !user.re_password
    ) {
      setError("Missing required fields");
      return;
    }
    if (user.password != user.re_password) {
      setError("Passwords must match");
      return;
    }
    if (user.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    register();
  };
  return (
    <div className="loginHolder">
      <div className="anothaHolder1">
        <div className="logoHolder1">
          <img src={logo} className="logo1" />
        </div>
        <div className="loginArea">
          <InputGroup className="inputGroup">
            <div className="twoInputs">
              <Form.Control
                placeholder="first name"
                value={user.first_name}
                onChange={(e) => {
                  setUser({ ...user, first_name: e.target.value });
                }}
                className="formButton"
              />
              <Form.Control
                placeholder="last name"
                value={user.last_name}
                onChange={(e) => {
                  setUser({ ...user, last_name: e.target.value });
                }}
                className="formButton"
              />
            </div>
            <Form.Control
              placeholder="username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              className="formButton"
            />
            <div className="twoInputs">
              <Form.Control
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                className="formButton"
              />
              <Form.Control
                type="password"
                placeholder="verify password"
                value={user.re_password}
                onChange={(e) => {
                  setUser({ ...user, re_password: e.target.value });
                }}
                className="formButton"
              />
            </div>
          </InputGroup>
          <div className="buttonGroup">
            <Button
              onClick={() => {
                handleCreateAccount();
              }}
              className="buttonClass"
            >
              Create Account
            </Button>
          </div>
          <div className="buttonGroup">
            <div
              className="registerHere"
              onClick={() => {
                setState(1);
              }}
            >
              Have an account? Login here.
            </div>
          </div>
        </div>
        <div className="errorHolder">
          <div className="error" hidden={error == undefined}>
            {error}
          </div>
          <div className="loading" hidden={loading == undefined}>
            loading...
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
