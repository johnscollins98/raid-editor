import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const EditEncounter = ({ encounter, params }) => {
  const [label, setLabel] = useState(encounter.label);
  const [imageLink, setImageLink] = useState(encounter.imageLink);
  const [notes, setNotes] = useState(encounter.notes);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newEncounter = {
      label,
      imageLink,
      notes,
      id: label.toLowerCase().split(" ").join("-"),
    };

    const url = `/api/wings/${params.wing_id}/encounters/${encounter._id}`;
    const res = await axios.put(url, newEncounter);

    if (res) {
      alert("Succesfully updated encounter.");
    }
  };

  return (
    <div>
      <h3>Edit {encounter.label}</h3>
      <Form>
        <Form.Group>
          <Form.Label>Encounter Name:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={label}
            placeholder="Encounter name..."
            onChange={(e) => setLabel(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image Link:</Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={imageLink}
            placeholder="Image Link..."
            onChange={(e) => setImageLink(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes:</Form.Label>
          <Form.Control
            size="sm"
            as="textarea"
            rows="5"
            value={notes}
            placeholder="Notes..."
            style={{ fontFamily: "consolas, Courier New, Courier, monospace" }}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            size="sm"
            type="submit"
            onClick={onSubmit}
            value="Edit Encounter"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditEncounter;
