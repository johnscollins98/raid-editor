import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import SubgroupView from "./SubgroupView";
import EditEncounter from "./EditEncounter";
import axios from "axios";
import NewSubgroup from "./NewSubgroup";

const EncounterView = (props) => {
  const [encounter, setEncounter] = useState(null);

  useEffect(() => {
    const fetchEncounter = async (wing_id, encounter_id) => {
      const res = await axios.get(
        `/api/wings/${wing_id}/encounters/${encounter_id}`
      );
      setEncounter(res.data);
    };
    fetchEncounter(props.match.params.wing_id, props.match.params.encounter_id);
  }, [props.match.params.wing_id, props.match.params.encounter_id]);

  if (encounter === null) return <Loading />;

  const totalMembers = encounter.subgroups.reduce(
    (total, subgroup) => (total += subgroup.members.length),
    0
  );

  return (
    <div>
      <a href={`/wings/${props.match.params.wing_id}`} className="mb-2">
        Back to Wing
      </a>
      <EditEncounter
        params={props.match.params}
        encounter={encounter}
        setEncounter={setEncounter}
      />
      <h3>Existing Subgroups</h3>
      {encounter.subgroups.map((subgroup) => (
        <SubgroupView
          subgroup={subgroup}
          setEncounter={setEncounter}
          key={subgroup._id}
          totalMembers={totalMembers}
          params={props.match.params}
        />
      ))}
      {totalMembers < 10 ? (
        <NewSubgroup
          params={props.match.params}
          encounter={encounter}
          setEncounter={setEncounter}
        />
      ) : null}
    </div>
  );
};

export default EncounterView;
