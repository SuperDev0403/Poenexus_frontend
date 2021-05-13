import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import jwt_decode from "jwt-decode";

import PoenexusService from "../../services/PoenexusService";
import {
  Button,
  Modal,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";

import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      email: "",
      password: "",
      loadingFlag: false,
      pwdType: "password",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showHidePwd = () => {
    this.setState({
      pwdType: this.state.pwdType === "input" ? "password" : "input",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ loadingFlag: true });

    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    PoenexusService.login(payload)
      .then((res) => {
        this.setState({ loadingFlag: false });
        if (res.status === 400) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.success("Login success", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          this.setState({ email: "", password: "", showModal: false });
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("userinfo", JSON.stringify(res.userinfo));
          setTimeout(() => localStorage.setItem("token", res.token), 3001);
          setTimeout(() => this.props.history.push("/dashboard"), 3002);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  logOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {
    const token = localStorage.getItem("user");
    var userName = "";
    if (token !== null) {
      userName = JSON.parse(token).name;
    }

    return (
      <div>
        <nav className="navbar top-navbar col-lg-12 col-12 p-0">
          <div className="container">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
              <a className="navbar-brand brand-logo" href="/">
                <img
                  src={window.location.origin + "/assets/image/LogoPNG.png"}
                  alt="logo"
                />
              </a>
            </div>
            {localStorage.getItem("token") === null ? (
              <div style={{ marginLeft: "auto" }}>
                <Button
                  variant="primary"
                  onClick={() => this.setState({ showModal: true })}
                >
                  LOG IN
                </Button>
              </div>
            ) : (
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                <h5 className="mt-auto mb-auto" style={{ marginRight: "1rem" }}>
                  {userName}
                </h5>
                <div>
                  <Button variant="danger" onClick={this.logOut}>
                    LOG OUT
                  </Button>
                </div>
              </div>
            )}

            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <button
                className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                type="button"
                data-toggle="horizontal-menu-toggle"
              ></button>
            </div>
          </div>
        </nav>

        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
          backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <div className="form-group mb-3">
                <label>Email</label>
                <InputGroup>
                  <InputGroup.Append>
                    <InputGroup.Text className="h-100">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                    required
                  />
                </InputGroup>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <InputGroup>
                  <InputGroup.Append>
                    <InputGroup.Text className="h-100">
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Append>
                  <FormControl
                    placeholder="Password"
                    type={this.state.pwdType}
                    value={this.state.password}
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                    required
                  />
                  <InputGroup.Append onClick={this.showHidePwd}>
                    <InputGroup.Text className="h-100">
                      {this.state.pwdType === "input" ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary">
                Login
                {this.state.loadingFlag === true ? (
                  <Spinner animation="border" />
                ) : (
                  ""
                )}
              </Button>
              <Button
                variant="secondary"
                onClick={() => this.setState({ showModal: false })}
              >
                Close
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(Header);
