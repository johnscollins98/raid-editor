import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";

export const availableProfessions = [
  "guardian",
  "dragonhunter",
  "firebrand",
  "warrior",
  "berserker",
  "spellbreaker",
  "revenant",
  "renegade",
  "herald",
  "ranger",
  "druid",
  "soulbeast",
  "thief",
  "daredevil",
  "deadeye",
  "engineer",
  "scrapper",
  "holosmith",
  "mesmer",
  "mirage",
  "chronomancer",
  "elementalist",
  "tempest",
  "weaver",
  "necromancer",
  "scourge",
  "reaper",
];

const Member = ({ member, params, setEncounter }) => {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [profession, setProfession] = useState(member.profession);

  const updateMember = async () => {
    const newMember = {
      name,
      role,
      profession,
    };
    console.log(params.subgroup_id);
    const url = `/api/wings/${params.wing_id}/encounters/${params.encounter_id}/subgroups/${params.subgroup_id}/members/${member._id}`;
    const res = await axios.put(url, newMember);

    if (res) {
      window.alert("Successfully updated member.");
    }

    const postedEncounter = res.data.encounters.find(
      (e) => e._id == params.encounter_id
    );
    setEncounter(postedEncounter);
  };

  const deleteMember = async () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      const url = `/api/wings/${params.wing_id}/encounters/${params.encounter_id}/subgroups/${params.subgroup_id}/members/${member._id}`;
      const res = await axios.delete(url);

      const postedEncounter = res.data.encounters.find(
        (e) => e._id == params.encounter_id
      );
      setEncounter(postedEncounter);
    }
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </td>
      <td>
        <select
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        >
          {availableProfessions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </td>
      <td>
        <Row>
          <Button className="btn btn-primary mr-1" onClick={updateMember}>
            Update
          </Button>
          <Button className="btn btn-danger" onClick={deleteMember}>
            Delete
          </Button>
        </Row>
      </td>
    </tr>
  );
};

export default Member;