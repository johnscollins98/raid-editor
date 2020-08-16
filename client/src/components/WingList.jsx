import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewWing from "./NewWing";

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
    const url = `http://localhost:5000/api/wings/${id}`;
    const res = await axios.delete(url);
  };

  const getWingLinks = () => {
    console.log(wings);
    return wings.map((wing) => (
      <li key={wing._id}>
        <Link to={`/wings/${wing._id}`} key={wing._id}>
          {wing.wingLabel}
        </Link>
        -
        <a href="#" onClick={() => deleteWing(wing._id)}>
          Delete
        </a>
      </li>
    ));
  };

  return (
    <div>
      <ul>{getWingLinks()}</ul>
      <NewWing wings={wings} setWings={setWings} />
    </div>
  );
};

export default WingList;
