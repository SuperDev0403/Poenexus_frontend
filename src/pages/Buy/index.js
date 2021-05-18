import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import PoenexusService from "../../services/PoenexusService";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import { Button } from "react-bootstrap";

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bench: [],
      harvest: [],
      syndicate: [],
      sell: [],
      columns: [],
      products: [],
      igns: [],
      league: "",
      gamemode: "",
      priceChaos: null,
      selectdObjCraft: "",
      selectdObjUid: null,
      lowestPrice: null,
      totalAvailable: null,
      avgPrice: null,
      checkedUnsecured: false,
      checkedCollateral: false,
      checkedEscrow: false,
      collat: 0,
    };
    this.rowEvent = {
      onClick: (e, row, rowIndex) => {
        this.setState({ selectdObjCraft: row.craft, selectdObjUid: row.uid });
      },
    };
  }

  componentDidMount() {
    const payload = {
      userId: JSON.parse(localStorage.getItem("userinfo")).id,
    };
    PoenexusService.getBuyData(payload)
      .then((res) => {
        this.setState({
          bench: res.bench,
          harvest: res.harvest,
          syndicate: res.syndicate,
          sell: res.sell,
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
    PoenexusService.getPriceChaos()
      .then((res) => {
        var lines = res.lines;
        var priceChaos = null;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].currencyTypeName === "Exalted Orb") {
            priceChaos = lines[i].chaosEquivalent;
          }
        }
        this.setState({ priceChaos });
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
      this.setState({
        checkedCollateral: !this.state.checkedCollateral,
      });
    } else if (e.target.name === "security" && e.target.value === "Unsecured") {
      this.setState({ checkedUnsecured: !this.state.checkedUnsecured });
    } else if (e.target.name === "security" && e.target.value === "Escrow") {
      this.setState({ checkedEscrow: !this.state.checkedEscrow });
    }

    if (e.target.name === "service") {
      this.setState({ selectdObjUid: null });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { SearchBar } = Search;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      classes: "select-row",
      style: { background: "#7d7d7d" },
    };

    const igns = this.state.igns;

    var lowest = null;
    var count = null;
    var avgValue = null;

    if (!this.state.loading) {
      var sell = this.state.sell;
      var filteredSell = [];

      if (this.state.checkedUnsecured) {
        for (let i = 0; i < sell.length; i++) {
          if (sell[i].security === "Unsecured") {
            filteredSell.push(sell[i]);
          }
        }
      }

      if (this.state.checkedCollateral) {
        for (let i = 0; i < sell.length; i++) {
          if (sell[i].security === "Collateral") {
            filteredSell.push(sell[i]);
          }
        }
        var collat = Number(this.state.collat);

        filteredSell = filteredSell.filter(function (item) {
          if (item.security === "Collateral" && item.collat >= collat)
            return false;
          return true;
        });
      }

      if (this.state.checkedEscrow) {
        for (let i = 0; i < sell.length; i++) {
          if (sell[i].security === "Escrow") {
            filteredSell.push(sell[i]);
          }
        }
      }

      var finalSell = [];
      for (let i = 0; i < filteredSell.length; i++) {
        if (filteredSell[i].objid === this.state.selectdObjUid) {
          finalSell.push(filteredSell[i]);
        }
      }

      var convertedArr = [];

      for (let i = 0; i < finalSell.length; i++) {
        convertedArr.push(
          Number(finalSell[i].price_ex) * this.state.priceChaos +
            Number(finalSell[i].price_c)
        );
      }

      count = finalSell.length;

      lowest = convertedArr[0];

      var sum = 0;
      for (let i = 0; i < convertedArr.length; i++) {
        if (lowest >= convertedArr[i]) {
          lowest = convertedArr[i];
        }
        sum += convertedArr[i];
      }

      avgValue = sum / count;
    }

    return (
      <div>
        <Header />
        <MenuBar />
        <div className="container">
          {this.state.loading ? (
            <h5 className="mt-3">Loading....</h5>
          ) : (
            <div className="mt-4 mb-5">
              <h1>Buy</h1>
              <form>
                <div className="row">
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                  <div className="col-md-6">
                    <h5>Trade Security</h5>
                    <div className="div_radio mt-3">
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          id="Unsecured"
                          name="security"
                          value="Unsecured"
                          onChange={this.changeHandle}
                        />
                        <label htmlFor="Unsecured">Unsecured</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="Collateral"
                          name="security"
                          value="Collateral"
                          onChange={this.changeHandle}
                        />

                        <label htmlFor="Collateral">
                          Collateral CAP:
                          <input
                            type="number"
                            name="collat"
                            value={this.state.collat}
                            onChange={this.changeHandle}
                          />
                          Exalteds
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="Escrow"
                          name="security"
                          value="Escrow"
                          onChange={this.changeHandle}
                        />
                        <label htmlFor="Escrow">
                          Escrow{" "}
                          <span className="text-danger">
                            *You must opt into and fund your Escrow account
                            before using this option.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4>Buy Object</h4>
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
                  <div className="mt-5 ml-3">
                    <div className="mb-4">
                      <h6>
                        OBJ: <span>{this.state.selectdObjCraft}</span>
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <h6>
                          Lowest Price: <span>{lowest}</span>
                        </h6>
                      </div>
                      <div className="col-md-3">
                        <h6>
                          Total Available: <span>{count}</span>
                        </h6>
                      </div>
                      <div className="col-md-3">
                        <h6>
                          AVG Price: <span>{avgValue}</span>
                        </h6>
                      </div>
                      <div className="col-md-3">
                        <h6>
                          1Ex: <span>{this.state.priceChaos}</span>
                        </h6>
                      </div>
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

                <Button variant="success" type="submit" className="mt-3">
                  Submit
                  {/* {this.state.loadingFlag === true ? (
                  <Spinner animation="border" />
                ) : (
                  ""
                )} */}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Buy;
