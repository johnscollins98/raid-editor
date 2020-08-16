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
      console.log(res.data);
      console.log(wings);
      setWings(wings.concat(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form>
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
          required
          onChange={(e) => setWingName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control type="submit" onClick={onSubmit} value="Create Wing" />
      </Form.Group>
    </Form>
  );
};

export default NewWing;
