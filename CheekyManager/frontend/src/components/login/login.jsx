import { useState } from "react";
import "./login.css";
import logo from "../../images/logo.webp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin, userRegister } from "../../services/userService";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login({ setState }) {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => userLogin(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: () => {
      setError("Error logging in");
    },
  });
  const { mutate: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => userRegister(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: () => {
      setError("Error registering");
    },
  });
  return (
    <div className="loginHolder">
      <div className="anothaHolder">
        <div className="logoHolder1">
          <img src={logo} className="logo1" />
        </div>
        <div className="loginArea">
          <InputGroup className="inputGroup">
            <Form.Control
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="formButton"
            />
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="formButton"
            />
          </InputGroup>
          <div className="buttonGroup">
            <Button
              onClick={() => {
                login();
              }}
              disabled={password == "" || username == ""}
              className="buttonClass"
            >
              Login
            </Button>
          </div>
          <div className="buttonGroup">
            <div
              className="registerHere"
              onClick={() => {
                setState(2);
              }}
            >
              New? Create an account here.
            </div>
          </div>
        </div>
        <div className="errorHolder">
          <div className="error" hidden={error == undefined}>
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
