import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const WingLink = ({ wing, deleteWing }) => (
  <tr>
    <td>
      <h5>
        {wing.wingLabel} - {wing.wingName}
      </h5>
    </td>
    <td>
      <Row>
        <Link
          to={`/wings/${wing._id}`}
          key={wing._id}
          className="btn btn-primary btn-sm mr-1"
        >
          Edit
        </Link>
        <Button
          className="btn btn-danger btn-sm"
          onClick={() => deleteWing(wing._id)}
        >
          Delete
        </Button>
      </Row>
    </td>
  </tr>
);

export default WingLink;
