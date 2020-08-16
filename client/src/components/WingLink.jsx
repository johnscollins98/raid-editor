import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const WingLink = ({ wing, deleteWing }) => (
  <tr>
    <td>
      <h5>
        {wing.wingLabel} - {wing.wingName}
      </h5>
    </td>
    <td>
      <Link
        to={`/wings/${wing._id}`}
        key={wing._id}
        className="btn btn-primary"
      >
        Edit
      </Link>
    </td>
    <td>
      <Button className="btn btn-danger" onClick={() => deleteWing(wing._id)}>
        Delete
      </Button>
    </td>
  </tr>
);

export default WingLink;
