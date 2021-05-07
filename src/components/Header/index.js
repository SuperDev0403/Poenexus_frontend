import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
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
            <div style={{ marginLeft: "auto" }}>
              <Button
                variant="primary"
                onClick={() => this.setState({ showModal: true })}
              >
                LOG IN
              </Button>
            </div>

            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <button
                className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                type="button"
                data-toggle="horizontal-menu-toggle"
              ></button>
            </div>
          </div>
        </nav>
        <nav className="bottom-navbar">
          <div className="container">
            <ul className="nav page-navigation">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="menu-title">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="menu-title">Page2</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <span className="menu-title">Page3</span>
                </a>
              </li>
            </ul>
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
          <Modal.Body>Login modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Login</Button>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showModal: false })}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Header;
