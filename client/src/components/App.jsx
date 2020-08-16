import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WingList from "./WingList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await axios.get("http://localhost:5000/auth/authorization");
      setLoggedIn(user.data.loggedIn);
      setAuthorized(user.data.authorized);
    };
    checkLoggedIn();
  }, []);

  if (!loggedIn) return <a href="http://localhost:5000/auth">Log In</a>;
  if (!authorized) return "FORBIDDEN! CONTACT ELOSIA#0520";

  return (
    <Router>
      <Container>
        <Route path="/" component={WingList} />
        {/* <Route path="/wings/:wing_id" component={WingView} /> */}
        {/* <Route
          path="/wings/:wing_id/encounters/:encounter_id"
          component={EncounterView}
        /> */}
      </Container>
    </Router>
  );
}

export default App;
