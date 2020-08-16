import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WingList from "./WingList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await axios.get("http://localhost:5000/auth/authorization");
      setLoggedIn(user.data.loggedIn);
      setAuthorized(user.data.authorized);
      setUser(user.data.username);
    };
    checkLoggedIn();
  }, []);

  if (!loggedIn)
    return (
      <Container>
        <a href="http://localhost:5000/auth" className="btn btn-primary">
          Log In
        </a>
      </Container>
    );
  if (!authorized)
    return (
      <Container>
        <Alert variant="warning">FORBIDDEN! CONTACT ELOSIA#0520</Alert>
      </Container>
    );

  return (
    <Router>
      <Container>
        <h5>Logged in: {user}</h5>
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
