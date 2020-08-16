import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const EditWing = ({ wing, setWing }) => {
  const [wingName, setWingName] = useState(wing.wingName);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newWing = {
      ...wing,
      wingName,
    };
    const res = await axios.put(`/api/wings/${wing._id}`, newWing);
    setWing(res.data);
  };

  return (
    <Form>
      <h3>
        Edit {wing.wingLabel} - {wing.wingName}
      </h3>
      <Form.Group>
        <Form.Label>Wing Name:</Form.Label>
        <Form.Control
          type="text"
          value={wingName}
          placeholder="Wing Name..."
          onChange={(e) => setWingName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control type="submit" onClick={onSubmit} value="Edit Wing" />
      </Form.Group>
    </Form>
  );
};

export default EditWing;
