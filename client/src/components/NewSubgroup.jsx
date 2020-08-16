import React from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const NewSubgroup = ({ params, encounter, setEncounter }) => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const newEncounter = {
      label: `Subgroup ${encounter.subgroups.length + 1}`,
    };

    const url = `/api/wings/${params.wing_id}/encounters/${params.encounter_id}/subgroups`;
    const res = await axios.post(url, newEncounter);

    const postedEncounter = res.data.encounters.find(
      (e) => e._id === params.encounter_id
    );

    setEncounter(postedEncounter);
  };

  return (
    <Form>
      <h3>New Subgroup</h3>
      <Form.Group>
        <Form.Control type="submit" onClick={onSubmit} value="Add Subgroup" />
      </Form.Group>
    </Form>
  );
};

export default NewSubgroup;
