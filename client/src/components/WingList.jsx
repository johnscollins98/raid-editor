import React, { useState, useEffect } from "react";
import axios from "axios";
import NewWing from "./NewWing";
import WingLink from "./WingLink";
import Table from "react-bootstrap/Table";

const WingList = (props) => {
  const [wings, setWings] = useState([]);

  useEffect(() => {
    const fetchWings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wings/");
        setWings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWings();
  }, []);

  const deleteWing = async (id) => {
    if (window.confirm("Are you sure you want to delete this Wing?")) {
      const url = `http://localhost:5000/api/wings/${id}`;
      await axios.delete(url);
      setWings(wings.filter((wing) => wing._id !== id));
    }
  };

  const getWingLinks = () => {
    return wings.map((wing) => (
      <WingLink wing={wing} deleteWing={deleteWing} key={wing._id} />
    ));
  };

  return (
    <div>
      <h3>Existing Wings</h3>
      <Table>
        <tbody>{getWingLinks()}</tbody>
      </Table>
      <NewWing wings={wings} setWings={setWings} />
    </div>
  );
};

export default WingList;
