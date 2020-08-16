import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const EncounterLink = ({ wing, encounter, deleteEncounter }) => (
  <tr>
    <td>
      <h5>{encounter.label}</h5>
    </td>
    <td>
      <Link
        to={`/wings/${wing._id}/encounters/${encounter._id}`}
        key={encounter._id}
        className="btn btn-primary btn-sm"
      >
        Edit
      </Link>
    </td>
    <td>
      <Button
        className="btn btn-danger btn-sm"
        onClick={() => deleteEncounter(encounter._id)}
      >
        Delete
      </Button>
    </td>
  </tr>
);

export default EncounterLink;
