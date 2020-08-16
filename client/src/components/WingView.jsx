import React, { useEffect, useState } from "react";
import EditWing from "./EditWing";
import Loading from "./Loading";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import EncounterLink from "./EncounterLink";
import NewEncounter from "./NewEncounter";

const WingView = (props) => {
  const [wing, setWing] = useState(null);
  useEffect(() => {
    const fetchWing = async () => {
      try {
        const fetchedWing = await axios.get(
          `http://localhost:5000/api/wings/${props.match.params.wing_id}`
        );
        setWing(fetchedWing.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWing();
  }, [props.match.params.wing_id]);

  const deleteEncounter = async (id) => {
    if (window.confirm("Are you sure you want to delete this Wing?")) {
      const url = `http://localhost:5000/api/wings/${props.match.params.wing_id}/encounters/${id}`;
      const res = await axios.delete(url);
      setWing(res.data);
    }
  };

  const getEncounterLinks = () => {
    return wing.encounters.map((encounter) => (
      <EncounterLink
        wing={wing}
        encounter={encounter}
        deleteEncounter={deleteEncounter}
        key={encounter._id}
      />
    ));
  };

  if (wing == null) return <Loading />;
  return (
    <div>
      <EditWing wing={wing} setWing={setWing} />
      <Table>
        <tbody>{getEncounterLinks()}</tbody>
      </Table>
      <NewEncounter wing={wing} setWing={setWing} />
    </div>
  );
};

export default WingView;
