import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Member, { availableProfessions } from "./Member";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";

const SubgroupView = ({ setEncounter, subgroup, totalMembers, params }) => {
  const [label, setLabel] = useState(subgroup.label);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newProfession, setNewProfession] = useState("guardian");

  const createMember = async () => {
    const newMember = {
      name: newName,
      role: newRole,
      profession: newProfession,
    };
    const url = `/api/wings/${params.wing_id}/encounters/${params.encounter_id}/subgroups/${subgroup._id}/members`;
    const res = await axios.post(url, newMember);

    const postedEncounter = res.data.encounters.find(
      (e) => e._id === params.encounter_id
    );
    setEncounter(postedEncounter);
  };

  const getMembers = () => {
    return subgroup.members.map((member) => (
      <Member
        member={member}
        key={member._id}
        params={{ ...params, subgroup_id: subgroup._id }}
        setEncounter={setEncounter}
      />
    ));
  };

  const updateSubgroup = async () => {
    const url = `/api/wings/${params.wing_id}/encounters/${params.encounter_id}/subgroups/${subgroup._id}`;
    const res = await axios.put(url, { label });

    if (res) {
      window.alert("Successfully updated subgroup.");
    }

    const postedEncounter = res.data.encounters.find(
      (e) => e._id === params.encounter_id
    );
    setEncounter(postedEncounter);
  };

  const deleteSubgroup = async () => {
    if (window.confirm("Are you sure you want to delete this subgroup?")) {
      const url = `/api/wings/${params.wing_id}/encounters/${params.encounter_id}/subgroups/${subgroup._id}`;
      const res = await axios.delete(url);

      const postedEncounter = res.data.encounters.find(
        (e) => e._id === params.encounter_id
      );
      setEncounter(postedEncounter);
    }
  };

  return (
    <Col>
      <Row>
        <Col>
          <h5>{subgroup.label}</h5>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Form.Control
            size="sm"
            type="text"
            className="mb-2"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Col>
        <Col sm={8}>
          <Row>
            <Button
              className="btn btn-primary btn-sm ml-1 mb-2"
              onClick={updateSubgroup}
            >
              Rename
            </Button>
            <Button
              className="btn btn-danger btn-sm ml-1 mb-2"
              onClick={deleteSubgroup}
            >
              Delete
            </Button>
          </Row>
        </Col>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Profession</th>
              <th>Unsaved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getMembers()}
            {totalMembers < 10 ? (
              <tr>
                <td>
                  <Form.Control
                    size="sm"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    as="select"
                    value={newProfession}
                    onChange={(e) => setNewProfession(e.target.value)}
                  >
                    {availableProfessions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td></td>
                <td>
                  <Row>
                    <Button
                      className="btn btn-success btn-sm mr-1"
                      onClick={createMember}
                    >
                      Create
                    </Button>
                  </Row>
                </td>
              </tr>
            ) : null}
          </tbody>
        </Table>
      </Row>
    </Col>
  );
};

export default SubgroupView;
