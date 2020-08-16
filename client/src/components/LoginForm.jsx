import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

const LoginForm = () => {
  return (
    <Jumbotron>
      <h3>Welcome!</h3>
      <p>
        This is an application to edit raid compositions for the{" "}
        <strong>Sunspear Order</strong> static.
      </p>
      <p>
        Before you can do any editing you'll need to log in using Discord below.
        This is just so that we can verify that you have the required
        permissions.
      </p>
      <a href="/auth" className="btn discord-btn">
        Login with
        <img
          src={require("../assets/images/Discord-Wordmark-White.png")}
          alt="discord-logo"
          height="30px"
          className="ml-1"
        />
      </a>
    </Jumbotron>
  );
};

export default LoginForm;
