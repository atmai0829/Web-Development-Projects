import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../../services/userService";

export const NavigationBar = ({ setState }) => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => userLogout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: () => {
      setError("Error logging out");
    },
  });

  return (
    <Navbar className="navContainer">
      <Nav className="list">
        <Nav.Link
          className="nav-item"
          onClick={() => {
            setState(1);
          }}
        >
          <i className="bi bi-house"></i>
        </Nav.Link>
        <Nav.Link
          className="nav-item"
          onClick={() => {
            setState(2);
          }}
        >
          <i className="bi bi-calendar"></i>
        </Nav.Link>
        <Nav.Link
          className="nav-item"
          onClick={() => {
            setState(3);
          }}
        >
          <i className="bi bi-bookmark-check"></i>
        </Nav.Link>
        <Nav.Link className="nav-item" onClick={() => logout()}>
          <i className="bi bi-box-arrow-right"></i>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
