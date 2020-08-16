import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Loading = () => {
  return (
    <Container>
      <Row>
        <Col xs sm={{ span: 1, offset: 5 }} className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
