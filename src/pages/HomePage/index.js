import React, { Component } from "react";
import Header from "../../components/Header";
import Register from "../../components/Register";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="mt-4 mb-5">
            <div id="bodyDIV" class="flex">
              <div id="bodyText">
                <h1> Welcome to POENexus </h1>
                <p>
                  {" "}
                  This site was designed to facilitate a safer, more
                  organizable, searchable, database driven version of the trade
                  functionality you find in the Discord-based trade channels.
                </p>
                <p>
                  {" "}
                  To begin using the system, please register using the form
                  below. Once submitted, an email will be sent to the address
                  you registered with and will contain a link to authorize your
                  account.
                </p>
              </div>
            </div>
          </div>
          <Register />
        </div>
      </div>
    );
  }
}

export default HomePage;
