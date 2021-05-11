import React, { Component } from "react";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const pathname = window.location.pathname.substr(1);
    return (
      <nav className="bottom-navbar">
        <div className="container">
          <ul className="nav page-navigation">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                <span
                  className={
                    pathname === "dashboard"
                      ? "menu-title text-primary"
                      : "menu-title"
                  }
                >
                  Dashboard
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/sell">
                <span
                  className={
                    pathname === "sell"
                      ? "menu-title text-primary"
                      : "menu-title"
                  }
                >
                  Sell
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/buy" className="nav-link">
                <span
                  className={
                    pathname === "buy"
                      ? "menu-title text-primary"
                      : "menu-title"
                  }
                >
                  Buy
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="/security" className="nav-link">
                <span
                  className={
                    pathname === "security"
                      ? "menu-title text-primary"
                      : "menu-title"
                  }
                >
                  Security
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default MenuBar;
