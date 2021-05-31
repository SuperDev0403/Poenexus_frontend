import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import PoenexusService from "../../services/PoenexusService";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import { Button, Spinner } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bench: [],
      harvest: [],
      syndicate: [],
      columns: [],
      products: [],
      igns: [],
      league: "",
      gamemode: "",
      service: "",
      ign: "",
      security: "",
      collat: 0,
      requireCollat: false,
      chaos: 0,
      exalted: "",
      objId: null,
      loadingFlag: false,
    };
    this.rowEvent = {
      onClick: (e, row, rowIndex) => {
        this.setState({ objId: row.uid });
      },
    };
  }

  componentDidMount() {
    const payload = {
      userId: JSON.parse(localStorage.getItem("userinfo")).id,
    };
    PoenexusService.getSellData(payload)
      .then((res) => {
        this.setState({
          bench: res.bench,
          harvest: res.harvest,
          syndicate: res.syndicate,
          loading: false,
          igns: [res.userinfo.ign1, res.userinfo.ign2, res.userinfo.ign3],
        });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    PoenexusService.getGameMode()
      .then((res) => {
        var notNullArray = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].endAt !== null) {
            notNullArray.push(res[i]);
          }
        }
        this.setState({ league: notNullArray[0].id });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  changeService = (e) => {
    this.setState({
      columns: [],
      products: [],
      [e.target.name]: e.target.value,
    });
    var serviceData = this.state[e.target.value];
    var columns = [];
    var products = [];
    switch (e.target.value) {
      case "bench":
        columns = [
          {
            dataField: "uid",
            text: "UID",
            sort: true,
          },
          {
            dataField: "craft",
            text: "CRAFT",
            sort: true,
          },
          {
            dataField: "craft2",
            text: "CRAFT2",
            sort: true,
          },
          {
            dataField: "cost",
            text: "COST",
            sort: true,
          },
          {
            dataField: "unit",
            text: "UNIT",
            sort: true,
          },
        ];
        for (let i = 0; i < serviceData.length; i++) {
          products.push({
            uid: serviceData[i].UID,
            craft: serviceData[i].CRAFT,
            craft2: serviceData[i].CRAFT2,
            cost: serviceData[i].COST,
            unit: serviceData[i].UNIT,
          });
        }
        this.setState({ columns, products, selectedService: e.target.value });
        break;
      case "harvest":
        columns = [
          {
            dataField: "uid",
            text: "UID",
            sort: true,
          },
          {
            dataField: "craft",
            text: "CRAFT",
            sort: true,
          },
          {
            dataField: "tag1",
            text: "TAG1",
            sort: true,
          },
          {
            dataField: "tag2",
            text: "TAG2",
            sort: true,
          },
          {
            dataField: "tag3",
            text: "TAG3",
            sort: true,
          },
          {
            dataField: "tag4",
            text: "TAG4",
            sort: true,
          },
          {
            dataField: "tag5",
            text: "TAG5",
            sort: true,
          },
        ];
        for (let i = 0; i < serviceData.length; i++) {
          products.push({
            uid: serviceData[i].UID,
            craft: serviceData[i].CRAFT,
            tag1: serviceData[i].TAG1,
            tag2: serviceData[i].TAG2,
            tag3: serviceData[i].TAG3,
            tag4: serviceData[i].TAG4,
            tag5: serviceData[i].TAG5,
          });
        }
        this.setState({ columns, products, selectedService: e.target.value });
        break;
      case "syndicate":
        columns = [
          {
            dataField: "uid",
            text: "UID",
            sort: true,
          },
          {
            dataField: "name",
            text: "NAME",
            sort: true,
          },
          {
            dataField: "location",
            text: "LOCATION",
            sort: true,
          },
          {
            dataField: "rank",
            text: "RANK",
            sort: true,
          },
          {
            dataField: "tier",
            text: "TIER",
            sort: true,
          },
          {
            dataField: "craft",
            text: "CRAFT",
            sort: true,
          },
        ];
        for (let i = 0; i < serviceData.length; i++) {
          products.push({
            uid: serviceData[i].UID,
            name: serviceData[i].NAME,
            location: serviceData[i].LOCATION,
            rank: serviceData[i].RANK,
            tier: serviceData[i].TIER,
            craft: serviceData[i].CRAFT,
          });
        }
        this.setState({ columns, products, selectedService: e.target.value });
        break;
      default:
    }
  };

  changeHandle = (e) => {
    if (e.target.name === "security" && e.target.value === "Collateral") {
      this.setState({ requireCollat: true });
    } else if (e.target.name === "security" && e.target.value === "Unsecured") {
      this.setState({ requireCollat: false });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ loadingFlag: true });

    const payload = {
      userId: JSON.parse(localStorage.getItem("userinfo")).id,
      mode: this.state.gamemode,
      type: this.state.service,
      ign: this.state.ign,
      security: this.state.security,
      collat: this.state.collat,
      objid: this.state.objId,
      price_c: this.state.chaos,
      price_ex: this.state.exalted,
      available: true,
    };

    PoenexusService.saveSell(payload)
      .then((res) => {
        this.setState({ loadingFlag: false });
        if (res.status === 500) {
          toast.error("Error", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        } else {
          toast.success("Your Item has been posted for sale!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  render() {
    const { SearchBar } = Search;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      classes: "select-row",
      style: () => {
        const backgroundColor = "#bfbfbf";
        return { backgroundColor };
      },
    };

    const igns = this.state.igns;

    return (
      <div>
        <Header />
        <MenuBar />
        <div className="container">
          {this.state.loading ? (
            <h5 className="mt-3">Loading....</h5>
          ) : (
            <div className="mt-4 mb-5">
              <h1>Sell</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="mt-4">
                  <h4>Game Mode</h4>
                  <div className="div_radio mt-3">
                    <div>
                      <input
                        type="radio"
                        id="Standard-SC"
                        name="gamemode"
                        value="Standard-SC"
                        onChange={this.changeHandle}
                        required
                      />
                      <label htmlFor="Standard-SC">Standard-SC</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="Standard-HC"
                        name="gamemode"
                        value="Standard-HC"
                        required
                        onChange={this.changeHandle}
                      />
                      <label htmlFor="Standard-HC">Standard-HC</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id={"League-SC-" + this.state.league}
                        name="gamemode"
                        value={"League-SC-" + this.state.league}
                        required
                        onChange={this.changeHandle}
                      />
                      <label htmlFor={"League-SC-" + this.state.league}>
                        League-SC-{this.state.league}
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id={"League-HC-" + this.state.league}
                        name="gamemode"
                        value={"League-HC-" + this.state.league}
                        required
                        onChange={this.changeHandle}
                      />
                      <label htmlFor={"League-HC-" + this.state.league}>
                        League-HC-{this.state.league}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4>Service Type</h4>
                  <div className="div_radio mt-3">
                    <div>
                      <input
                        type="radio"
                        id="bench"
                        name="service"
                        value="bench"
                        onChange={this.changeService}
                        required
                      />
                      <label htmlFor="bench">Crafting Bench</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="syndicate"
                        name="service"
                        value="syndicate"
                        onChange={this.changeService}
                        required
                      />
                      <label htmlFor="syndicate">Syndicate</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="harvest"
                        name="service"
                        value="harvest"
                        onChange={this.changeService}
                        required
                      />
                      <label htmlFor="harvest">Harvest</label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4>User Options</h4>
                  <div className="div_radio mt-3 d-flex">
                    <p className="mb-0">IGN:</p>
                    <select
                      name="ign"
                      onChange={this.changeHandle}
                      defaultValue={""}
                      required
                    >
                      <option value="" disabled>
                        Please select
                      </option>
                      {igns.map((ign, i) => (
                        <option value={ign} key={i}>
                          {ign}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <h5>Trade Security</h5>
                  <div className="div_radio mt-3">
                    <div>
                      <input
                        type="radio"
                        id="Unsecured"
                        name="security"
                        value="Unsecured"
                        onChange={this.changeHandle}
                        required
                      />
                      <label htmlFor="Unsecured">Unsecured</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="Collateral"
                        name="security"
                        value="Collateral"
                        onChange={this.changeHandle}
                        required
                      />

                      <label htmlFor="Collateral">
                        Provided Collateral:
                        {this.state.requireCollat ? (
                          <input
                            type="number"
                            name="collat"
                            onChange={this.changeHandle}
                            required
                          />
                        ) : (
                          <input type="number" name="collat" disabled />
                        )}
                        Exalteds
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="escrow"
                        name="trade"
                        value="escrow"
                        disabled
                      />
                      <label htmlFor="escrow">
                        Escrow{" "}
                        <span className="text-danger">
                          *You must opt into and fund your Escrow account before
                          using this option.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4>Sale Object</h4>
                  {this.state.columns.length === 0 ? (
                    <p className="text-danger ml-3">
                      Please select service type
                    </p>
                  ) : (
                    <div
                      id={this.state.selectedService + "table"}
                      className="ml-3"
                    >
                      <ToolkitProvider
                        bootstrap4
                        data={this.state.products}
                        columns={this.state.columns}
                        search
                      >
                        {(props) => (
                          <div>
                            <SearchBar {...props.searchProps} />
                            <hr />
                            <BootstrapTable
                              {...props.baseProps}
                              keyField="uid"
                              selectRow={selectRow}
                              hover
                              striped
                              condensed
                              rowEvents={this.rowEvent}
                            />
                          </div>
                        )}
                      </ToolkitProvider>
                    </div>
                  )}

                  <div className="div_radio mt-3">
                    <h5>Price</h5>
                    <div className="mb-3">
                      <input
                        type="number"
                        name="chaos"
                        value={this.state.chaos}
                        onChange={this.changeHandle}
                        required
                      />
                      <label htmlFor="chaos">Chaos</label>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="exalted"
                        value={this.state.exalted}
                        onChange={this.changeHandle}
                        required
                      />
                      <label htmlFor="exalted">Exalted</label>
                    </div>
                  </div>
                </div>
                <Button variant="success" type="submit" className="mt-3">
                  Submit
                  {this.state.loadingFlag === true ? (
                    <Spinner animation="border" />
                  ) : (
                    ""
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Sell;
