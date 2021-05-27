import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import PoenexusService from "../../services/PoenexusService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { Button, InputGroup, FormControl, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      email: "",
      irlName: "",
      discordId: "",
      tradePoint: 0,
      ign1: "",
      ign2: "",
      ign3: "",
      sellList: [],
      buyList: [],
      loadingFlag: false,
      showForm: false,
      showNoti: false,
    };
  }

  componentDidMount() {
    var id = JSON.parse(localStorage.getItem("userinfo")).id;
    const payload = {
      id: id,
    };
    PoenexusService.getUserInfo(payload)
      .then((res) => {
        this.setState({
          irlName: res.user.irlName,
          discordId: res.user.discordId,
          tradePoint: res.user.tradePoint,
          ign1: res.user.ign1,
          ign2: res.user.ign2,
          ign3: res.user.ign3,
          sellList: res.sellList,
          buyList: res.buyList,
        });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clickEdit = () => {
    this.setState({
      showForm: true,
      accountName: JSON.parse(localStorage.getItem("user")).name,
      email: JSON.parse(localStorage.getItem("user")).email,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ loadingFlag: true });
    const payload = {
      id: JSON.parse(localStorage.getItem("userinfo")).id,
      accountName: this.state.accountName,
      email: this.state.email,
      irlName: this.state.irlName,
      discordId: this.state.discordId,
      tradePoint: this.state.tradePoint,
      ign1: this.state.ign1,
      ign2: this.state.ign2,
      ign3: this.state.ign3,
    };

    PoenexusService.updateUserInfo(payload)
      .then((res) => {
        this.setState({ loadingFlag: false });
        if (res.user === 1) {
          toast.success("User information saved successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          setTimeout(() => window.location.reload(false), 3001);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  render() {
    const user = JSON.parse(localStorage.getItem("user"));
    const sellList = this.state.sellList;
    const buyList = this.state.buyList;
    console.log("buyList: ", buyList);
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
                      <Button
                        variant="secondary"
                        type="submit"
                        className="w-25 mt-3 mb-5"
                        style={{ marginLeft: "1rem" }}
                        onClick={() =>
                          this.setState({ showForm: !this.state.showForm })
                        }
                      >
                        CANCEL
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
                        <p className="mb-0 mt-2">
                          {this.state.irlName === null
                            ? "N/A"
                            : this.state.irlName}
                        </p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">Discord ID:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">
                          {this.state.discordId === null
                            ? "N/A"
                            : this.state.discordId}
                        </p>
                      </div>
                    </div>
                    {/* <div className="form-group row">
                      <label className="mt-2 col-md-4">Trade Point:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">
                          {this.state.tradePoint === null
                            ? "N/A"
                            : this.state.tradePoint}
                        </p>
                      </div>
                    </div> */}
                    <h2 className="mt-4">IGNs</h2>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 1:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">
                          {this.state.ign1 === null ? "N/A" : this.state.ign1}
                        </p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 2:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">
                          {this.state.ign2 === null ? "N/A" : this.state.ign2}
                        </p>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="mt-2 col-md-4">IGN 3:</label>
                      <div className="col-md-6">
                        <p className="mb-0 mt-2">
                          {this.state.ign3 === null ? "N/A" : this.state.ign3}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="success"
                        type="submit"
                        className="w-25 mt-3 mb-5"
                        onClick={this.clickEdit}
                      >
                        EDIT
                      </Button>
                    </div>
                  </div>
                )}
                <div>
                  <h2>Active Sell Listings</h2>
                  <div className="mt-4">
                    {sellList.map((list, i) => (
                      <div className="d-flex mb-2 sellList_div" key={i}>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm"
                        >
                          E
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ml-3"
                        >
                          C
                        </button>
                        <h5 className="ml-3 mt-1">
                          {i + 1}. {list.craft.CRAFT} ( {list.price_c} /{" "}
                          {list.price_ex})
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h2>Tier X</h2>
                <div className="mt-4">
                  <p>Trader Rating : {this.state.tradePoint}</p>
                  <p>___</p>
                </div>
                <hr className="w-50" />
                <div className="noti_div">
                  <div>
                    <FontAwesomeIcon
                      icon={faBell}
                      onClick={() => this.setState({ showNoti: true })}
                    />
                    <span className={this.state.showNoti ? "d-none" : "count"}>
                      {buyList.length}
                    </span>
                  </div>
                  <div>
                    {this.state.showNoti
                      ? buyList.map((list, i) => (
                          <div className="noti_unit p-2 mt-2">
                            <div className="d-flex">
                              <h6>OBJ: {list.craft.CRAFT}</h6>
                              <h6 className="ml-3">Price: ${list.converted}</h6>
                            </div>
                            <h6>Trade Sec Type: type</h6>
                            <h6>Buyer IGN: {list.buyIgn}</h6>
                            <h6>Buyer Rating: xxx</h6>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                              >
                                Accept
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm ml-auto"
                              >
                                Decline
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm ml-auto"
                              >
                                ????
                              </button>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Dashboard;
