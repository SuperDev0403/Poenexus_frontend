import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";

import { Button } from "react-bootstrap";

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <MenuBar />
        <div className="container">
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
                    <label for="stand">Standard Trade</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="league"
                      name="gamemode"
                      value="league"
                      required
                    />
                    <label for="league">league</label>
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
                      required
                    />
                    <label for="bench">Crafting Bench</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="syndicate"
                      name="service"
                      value="syndicate"
                      required
                    />
                    <label for="syndicate">Syndicate</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="harvest"
                      name="service"
                      value="harvest"
                      required
                    />
                    <label for="harvest">Harvest</label>
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
                    <label for="unsecured">Unsecured</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="collateral"
                      name="trade"
                      value="collateral"
                      required
                    />

                    <label for="collateral">
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
                    <label for="escrow">
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
                <div className="div_radio mt-3">
                  <h5>Item</h5>
                  <div>
                    <input
                      type="text"
                      name="search"
                      placeholder="Type Filter Search Here"
                      value=""
                    />
                  </div>
                  <div className="mt-3">
                    <select id="item" className="m-0 pt-1 pb-1">
                      <option value="1">ID1 from Service1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
                <div className="div_radio mt-3">
                  <h5>Price</h5>
                  <div className="mb-3">
                    <input type="number" name="chaos" />
                    <label for="chaos">Chaos</label>
                  </div>
                  <div>
                    <input type="number" name="exalted" />
                    <label for="exalted">Exalted</label>
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
        </div>
      </div>
    );
  }
}

export default Sell;
