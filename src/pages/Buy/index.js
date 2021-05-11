import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";

class Buy extends Component {
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
            <h1>Buy</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Buy;
