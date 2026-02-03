import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./chartSetup";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/history/", {
        // withCredentials: true,
        auth: {
          username: "adijain",
          password: "bittubadmosh",
        },
      })
      .then((res) => setHistory(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload History</h2>

      <ul>
        {history.map((item) => (
          <li key={item.id}>
            <strong>{item.file_name}</strong> — {item.upload_time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryPage;
