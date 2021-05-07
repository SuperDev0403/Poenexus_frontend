import React, { Component } from "react";

// import PoenexusService from "../../services/PoenexusService";
import { Button, InputGroup, FormControl, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdType: "password",
      confirmType: "password",
      password: "",
      cpassword: "",
      irlName: "",
      siteName: "",
      email: "",
      loadingFlag: false,
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

  showHideConfirm = () => {
    this.setState({
      confirmType: this.state.confirmType === "input" ? "password" : "input",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.password !== this.state.cpassword) {
      toast.success("Password is not matched", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }

    this.setState({ loadingFlag: true });
    const payload = {
      irlName: this.state.irlName,
      siteName: this.state.siteName,
      email: this.state.email,
      password: this.state.password,
      cpassword: this.state.cpassword,
    };

    console.log("payload: ", payload);
  };

  render() {
    return (
      <div className="mt-5">
        <h3>Registration</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mt-5">
          <div className="form-group mb-3">
            <label>IRL Name</label>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text className="h-100">
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                placeholder="IRL Name"
                value={this.state.irlName}
                name="irlName"
                onChange={this.handleChange}
                required
              />
            </InputGroup>
          </div>
          <div className="form-group mb-3">
            <label>Site Username (Not your IGN)</label>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text className="h-100">
                  <FontAwesomeIcon icon={faUserAlt} />
                </InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                placeholder="Site Name"
                value={this.state.siteName}
                name="siteName"
                onChange={this.handleChange}
                required
              />
            </InputGroup>
          </div>
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
                placeholder="Create Password"
                type={this.state.pwdType}
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
          <div className="form-group mb-3">
            <label htmlFor="confirm-pwd">Confirm Password</label>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text className="h-100">
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                placeholder="Confirm Password"
                type={this.state.confirmType}
                id="confirm-pwd"
                name="cpassword"
                onChange={this.handleChange}
                required
              />
              <InputGroup.Append onClick={this.showHideConfirm}>
                <InputGroup.Text className="h-100">
                  {this.state.confirmType === "input" ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div className="text-right">
            <Button variant="success" type="submit">
              CREATE ACCOUNT
              {this.state.loadingFlag === true ? (
                <Spinner animation="border" />
              ) : (
                ""
              )}
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default Register;
