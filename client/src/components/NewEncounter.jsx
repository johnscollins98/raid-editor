import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const EditWing = ({ wing, setWing }) => {
  const [encounterName, setEncounterName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const newEncounter = {
      id: encounterName.toLowerCase().split(" ").join("-"),
      label: encounterName,
    };
    const res = await axios.post(
      `/api/wings/${wing._id}/encounters`,
      newEncounter
    );
    setWing(res.data);
  };

  return (
    <Form>
      <h3>New Encounter</h3>
      <Form.Group>
        <Form.Label>Encounter Name:</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          value={encounterName}
          placeholder="Encounter Name..."
          onChange={(e) => setEncounterName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="submit"
          size="sm"
          onClick={onSubmit}
          value="Add Encounter"
        />
      </Form.Group>
    </Form>
  );
};

export default EditWing;
