import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const NewWing = ({ wings, setWings }) => {
  const [wingName, setWingName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const nextWingNum = wings.length + 1;
    const wing = {
      id: `w${nextWingNum}`,
      wingName,
      wingLabel: `Wing ${nextWingNum}`,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/wings", wing);
      setWings(wings.concat(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form>
      <h3>Add New Wing</h3>
      <Form.Group>
        <Form.Label>Wing Number: </Form.Label>
        <Form.Control type="number" value={wings.length + 1} disabled />
      </Form.Group>
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
        <Form.Control type="submit" onClick={onSubmit} value="Create Wing" />
      </Form.Group>
    </Form>
  );
};

export default NewWing;
