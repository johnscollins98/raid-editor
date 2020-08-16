import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WingList from "./WingList";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import WingView from "./WingView";
import Loading from "./Loading";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const user = await axios.get(
          "http://localhost:5000/auth/authorization"
        );
        setLoaded(true);
        setLoggedIn(user.data.loggedIn);
        setAuthorized(user.data.authorized);
        setUser(user.data.username);
      } catch (err) {
        console.log(err);
        setLoaded(true);
      }
    };
    checkLoggedIn();
  }, []);

  if (!loaded) return <Loading />;

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
        <Row className="mb-2">
          <Link to="/" className="btn btn-primary btn-sm">
            Home
          </Link>
          <h5 className="ml-2">Logged in: {user}</h5>
        </Row>
        <Row>
          <Route path="/" exact component={WingList} />
          <Route path="/wings/:wing_id" component={WingView} />
          {/* <Route
          path="/wings/:wing_id/encounters/:encounter_id"
          component={EncounterView}
        /> */}
        </Row>
      </Container>
    </Router>
  );
}

export default App;
