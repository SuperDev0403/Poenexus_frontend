import React, { Component } from "react";
import Header from "../../components/Header";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="mt-4 mb-5">
            <h1>Welcome info</h1>
          </div>
          <div className="mt-5">
            <h1>Registration</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
