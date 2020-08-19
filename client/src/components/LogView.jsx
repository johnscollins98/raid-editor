import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Table from "react-bootstrap/esm/Table";

const LogView = () => {
  const [log, setLog] = useState(null);
  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await axios.get("/api/log");
        const sortedLog = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setLog(sortedLog);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLog();
  }, []);

  const getLogEntries = () => {
    return log.map((entry) => (
      <tr key={entry._id}>
        <td>{entry.user}</td>
        <td>{entry.action}</td>
        <td>{entry.dataType}</td>
        <td>{entry.changedId}</td>
      </tr>
    ));
  };

  if (!log) return <Loading />;
  return (
    <Table>
      <tbody>{getLogEntries()}</tbody>
    </Table>
  );
};

export default LogView;
