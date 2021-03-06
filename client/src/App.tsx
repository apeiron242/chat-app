import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./assets/main.css";
import FrontPage from "./components/FrontPage";
import Room from "./components/Room";

require("dotenv").config();

function App() {
  // const url = "http://localhost:4000";
  const url = "";
  // const socketUrl: string = "http://localhost:4000";
  const socketUrl: string = `https://simple-chatting-application.herokuapp.com`;
  return (
    <div>
      <Router>
        <Route path="/" exact>
          <FrontPage url={url} />
        </Route>
        <Route path="/chat">
          <Room url={url} socketUrl={socketUrl} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
