import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Security from "./pages/Security";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/sell" component={Sell} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/security" component={Security} />
    </Router>
  );
}

export default App;
