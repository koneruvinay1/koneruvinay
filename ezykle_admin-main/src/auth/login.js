import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../assets/logo.png";

import { Toast } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
// import { loginRequest } from "../network/service/UserService";
import { loginAction } from "../network/store/action/UserResponseAction";
import { useDispatch } from "react-redux";

/**
 *
 * @returns Login Component
 */
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // to show progress
  const [show, setShow] = useState(false);

  // to dsplay error/ promt message
  const [showMessage, setShowMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // user login form
  const [requestForm, setRequestForm] = useState({
    userName: "",
    password: "",
  });

  const handleChanges = (e) => {
    console.log("SDebug > handleChanges", e);
    setRequestForm({ ...requestForm, [e.target.name]: e.target.value });
  };

  const login = async () => {
    localStorage.setItem("authToken", "");
    setIsLoading(true);

    let requestObject = {
      username: requestForm.userName,
      password: requestForm.password,
      role: "1",
    };

    await dispatch(loginAction(requestObject, useDispatch)).then((response) => {
      setIsLoading(false);
      if (response.status) {
        navigate("/dashboard");
      } else {
        setShowMessage("Invalid username or Password");
        setShow(true);
      }
    });
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            zIndex: "999",
            overflow: "scroll",
          }}
        >
          <div className="loaderParentDiv">
            <div className="loaderDivCenter">
              <PuffLoader color="#7d04a9" loading={isLoading} size={80} />
            </div>
          </div>
        </div>
      )}{" "}
      <div className="container-fluid login-bg">
        <div className="row">
          <div className="login card-1">
            <div>
              <h3 className="text-centers" style={{ color: "#fff" }}>
                <img src={logo} alt="" width="100%" />
              </h3>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="form2Example11">User Name</label>
                <input
                  type="email"
                  name="userName"
                  value={requestForm.userName}
                  onChange={(e) => handleChanges(e)}
                  id="form2Example11"
                  className="form-control"
                  placeholder="Enter email/Mobile number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="form2Example22">Password</label>
                <input
                  type="password"
                  name="password"
                  value={requestForm.password}
                  onChange={(e) => handleChanges(e)}
                  id="form2Example22"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary w-100 text-center"
                onClick={(e) => login(e)}
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 10,
        }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header className="table" closeButton={false}>
            <strong className="mr-auto">Alert !!</strong>
          </Toast.Header>
          <Toast.Body className="table">{showMessage}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default Login;
