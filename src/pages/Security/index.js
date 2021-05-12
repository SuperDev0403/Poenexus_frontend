import React, { Component } from "react";
import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThanEqual,
  faLessThan,
  faLessThanEqual,
} from "@fortawesome/free-solid-svg-icons";

class Security extends Component {
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
            <h1>Security</h1>
            <div>
              <p className="mt-4">
                POEnexus will be offering 3 types of trade security to begin
                with:
              </p>
              <ul>
                <li>Trader Rating</li>
                <li>Unsecured</li>
                <li>Escrow</li>
              </ul>
              <h3>Trader Rating:</h3>
              <p className="mt-3">
                Is the rating system built into the site trade system. All
                trades will garner trader-rating points for any user of the
                site. <br />
                User ratings will be visible at time of purchase, and positive
                feedback from a trade will be automatically added to a user,
                once a trade is confirmed. <br />
                As users accumulate positive trader-rating points, they qualify
                for Trader Rep Tiers tiers:
              </p>
              <ul>
                <li>
                  Corrupted: denotes a trader rating{" "}
                  <FontAwesomeIcon icon={faLessThan} className="mr-2" /> 0 Avoid
                  trading with these individuals. Collateral Escrow Multiplier:
                  0
                </li>
                <li>
                  Tier I: denotes a trader rating{" "}
                  <FontAwesomeIcon icon={faLessThanEqual} /> 2499. All new users
                  start at this tier. Collateral Escrow Multiplier:: 1
                </li>
                <li>
                  Tier II: denotes a trader rating 2500 to 4999. This user has
                  performed dozens of successful trades using the system.
                  Collateral Escrow Multiplier:: 1.5
                </li>
                <li>
                  Tier III: denotes a trader rating 5000 to 9999. These users
                  are avid, trustworthy traders on the platform. Collateral
                  Escrow Multiplier: 2.0
                </li>
                <li>
                  Tier IV: denotes a trader rating{" "}
                  <FontAwesomeIcon icon={faGreaterThanEqual} /> 10000. These are
                  the bet traders on the platform, and have garnered a massive
                  amount of positive trades. Collateral Escrow Multiplier: 3.0
                  *requires Verified status*
                </li>
              </ul>
              <h3>Unsecured Trades:</h3>
              <p className="mt-3">
                Will be trades with no required form of trade security;
                generally used for services that don't require the buyer to hand
                over expensive items for the service to be performed.
              </p>
              <h3>Collateral Escrow System:</h3>
              <p className="mt-3">
                Unique to POEnexus will be our Trade Collateral Escrow system.
                This will provide a much needed means of security for high-value
                item services, allowing users to search for service posts from
                user that have provided backing currency and comfortably hand
                over their items without fear of losing the value of said item
                to a scam. Users electing to utilize the Escrow system will be
                able to deposit in-game currency with a POEnexus administrator.{" "}
                <br />
                Said deposit amount will be held for a selected amount of time,
                either 3 or 7 days, after which, it will be returned to said
                player, less a % service fee.
                <br />
                Current Fee rates are: 10% (of deposited amount) for 3 day
                escrow, or 5% (of deposited amount) for 7 day escrow, based on
                converted Chaos Orb rate from{" "}
                <a href="https://POE.NINJA">
                  <span>https://POE.NINJA</span>
                </a>{" "}
                at time of deposit return.
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Security;
