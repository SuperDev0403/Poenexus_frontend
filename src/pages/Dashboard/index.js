import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";

import { Button, InputGroup, FormControl, Spinner } from "react-bootstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      email: "",
      irlName: "",
      discordId: "",
      ign1: "",
      ign2: "",
      ign3: "",
      loadingFlag: false,
      showForm: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user: ", user);
    return (
      <div>
        <Header />
        <MenuBar />
        <div className="container">
          <div className="mt-4 mb-5">
            <h1>Dashboard</h1>
            <div className="row mt-5">
              <div className="col-md-6">
                <h2>User Info</h2>
                {this.state.showForm ? (
                  <form onSubmit={this.handleSubmit} className="dashboard-form">
                    <div className="form-group mt-4 row">
                      <label className="mt-2 col-md-4">Account Name:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            placeholder="Account Name"
                            value={this.state.accountName}
                            name="accountName"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                        <p>
                          <span className="text-danger">*</span> requires admin
                          approval
                        </p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="mt-2 col-md-4">Email:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                        <p>
                          <span className="text-danger">*</span> requires admin
                          approval
                        </p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IRL Name:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            placeholder="IRL Name"
                            value={this.state.irlName}
                            name="irlName"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">Discord ID:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            placeholder="Discord ID"
                            value={this.state.discordId}
                            name="discordId"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="mt-2 col-md-4">Trade Point:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            type="number"
                            placeholder="Trade Point"
                            value={this.state.tradePoint}
                            name="tradePoint"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <h2 className="mt-4">IGNs</h2>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 1:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            placeholder="IGN 1"
                            value={this.state.ign1}
                            name="ign1"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 2:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            placeholder="IGN 2"
                            value={this.state.ign2}
                            name="ign2"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 3:</label>
                      <div className="col-md-6">
                        <InputGroup>
                          <FormControl
                            placeholder="IGN 3"
                            value={this.state.ign3}
                            name="ign3"
                            onChange={this.handleChange}
                            required
                          />
                        </InputGroup>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="success"
                        type="submit"
                        className="w-25 mt-3 mb-5"
                      >
                        SAVE
                        {this.state.loadingFlag === true ? (
                          <Spinner animation="border" />
                        ) : (
                          ""
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="dashboard-form">
                    <div className="form-group mt-4 row mb-3">
                      <label className="mt-2 col-md-4">Account Name:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">{user.name}</p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">Email:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">{user.email}</p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IRL Name:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">N/A</p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">Discord ID:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">N/A</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="mt-2 col-md-4">Trade Point:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">N/A</p>
                      </div>
                    </div>
                    <h2 className="mt-4">IGNs</h2>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 1:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">N/A</p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 2:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">N/A</p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 3:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">N/A</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="success"
                        type="submit"
                        className="w-25 mt-3 mb-5"
                        onClick={() => this.setState({ showForm: true })}
                      >
                        EDIT
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <h2>Tier X</h2>
                <div className="mt-4">
                  <p>Trader Rating : XXXX</p>
                  <p>___</p>
                </div>
              </div>
            </div>
            <div>
              <h2>Active Sell Listings</h2>
              <div className="mt-4">
                <p>1.</p>
                <p>1.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
