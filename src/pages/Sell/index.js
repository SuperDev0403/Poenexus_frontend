import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import PoenexusService from "../../services/PoenexusService";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import { Button } from "react-bootstrap";

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
    };
  }

  componentDidMount() {
    console.log("111");
    PoenexusService.getSellData()
      .then((res) => {
        console.log("res: ", res);
        this.setState({
          bench: res.bench,
          harvest: res.harvest,
          syndicate: res.syndicate,
          loading: false,
        });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  changeService = (e) => {
    var serviceData = this.state[e.target.value];
    var columns = [];
    var products = [];
    switch (e.target.value) {
      case "bench":
        columns = [
          {
            dataField: "no",
            text: "#",
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
            no: i + 1,
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
            dataField: "no",
            text: "#",
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
            no: i + 1,
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
            dataField: "no",
            text: "#",
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
            no: i + 1,
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

  render() {
    const { SearchBar } = Search;
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
              <form>
                <div className="mt-4">
                  <h4>Game Mode</h4>
                  <div className="div_radio mt-3">
                    <div>
                      <input
                        type="radio"
                        id="stand"
                        name="gamemode"
                        value="stand"
                        required
                      />
                      <label htmlFor="stand">Standard Trade</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="league"
                        name="gamemode"
                        value="league"
                        required
                      />
                      <label htmlFor="league">league</label>
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
                    <p className="mb-0">Choose a car:</p>
                    <select id="ign">
                      <option value="ign1">ign1</option>
                      <option value="ign2">ign2</option>
                      <option value="ign3">ign3</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <h5>Trade Security</h5>
                  <div className="div_radio mt-3">
                    <div>
                      <input
                        type="radio"
                        id="unsecured"
                        name="trade"
                        value="unsecured"
                        required
                      />
                      <label htmlFor="unsecured">Unsecured</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="collateral"
                        name="trade"
                        value="collateral"
                        required
                      />

                      <label htmlFor="collateral">
                        Required Collateral:
                        <input type="number" />
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
                    <div id={this.state.selectedService + "table"}>
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.products}
                        columns={this.state.columns}
                        hover
                        striped
                        condensed
                        search
                      >
                        {(props) => (
                          <div>
                            <SearchBar {...props.searchProps} />
                            <hr />
                            <BootstrapTable
                              {...props.baseProps}
                              pagination={paginationFactory()}
                              hover
                              striped
                              condensed
                            />
                          </div>
                        )}
                      </ToolkitProvider>
                    </div>
                  )}

                  <div className="div_radio mt-3">
                    <h5>Price</h5>
                    <div className="mb-3">
                      <input type="number" name="chaos" />
                      <label htmlFor="chaos">Chaos</label>
                    </div>
                    <div>
                      <input type="number" name="exalted" />
                      <label htmlFor="exalted">Exalted</label>
                    </div>
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

export default Sell;
