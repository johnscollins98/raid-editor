import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WingList from "./WingList";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import WingView from "./WingView";
import Loading from "./Loading";
import EncounterView from "./EncounterView";
import LoginForm from "./LoginForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const user = await axios.get("/auth/authorization");
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
        <LoginForm />
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
          <Col sm={8}>
            <Link to="/" className="btn btn-primary btn-sm">
              Home
            </Link>
          </Col>
          <Col sm={4}>
            <Row>
              <h5 className="ml-2">Logged in: {user}</h5>
              <a href="/auth/logout" className="btn btn-danger btn-sm ml-2">
                Log Out
              </a>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Route path="/" exact component={WingList} />
            <Route path="/wings/:wing_id" exact component={WingView} />
            <Route
              path="/wings/:wing_id/encounters/:encounter_id"
              exact
              component={EncounterView}
            />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
