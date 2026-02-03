import React, { useState } from "react";
import axios from "axios";

import { Bar, Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// REGISTER ALL NECESSARY CHART ELEMENTS ONCE
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,   // required for pie chart
  Title,
  Tooltip,
  Legend
);


function UploadPage() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/upload/",
      formData,
      {
        auth: {
          username: "adijain",
          password: "bittubadmosh",
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    setSummary(response.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload CSV File</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: 10 }}>
        Upload
      </button>

      {summary && (
        <div style={{ marginTop: 30,  width: "350px", height: "200px" }}>
          <h3>Summary</h3>
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              style={{ padding: 20, background: "#f0f0f0", borderRadius: 8 }}
            >
              <h4>Avg Flowrate</h4>
              <p>{summary.avg_flowrate}</p>
            </div>

            <div
              style={{ padding: 20, background: "#f0f0f0", borderRadius: 8 }}
            >
              <h4>Avg Pressure</h4>
              <p>{summary.avg_pressure}</p>
            </div>

            <div
              style={{ padding: 20, background: "#f0f0f0", borderRadius: 8 }}
            >
              <h4>Avg Temperature</h4>
              <p>{summary.avg_temperature}</p>
            </div>
          </div>
          <p>Total Count: {summary.total_count}</p>
          <p>Avg Flowrate: {summary.avg_flowrate}</p>
          <p>Avg Pressure: {summary.avg_pressure}</p>
          <p>Avg Temperature: {summary.avg_temperature}</p>

          <h3>Type Distribution</h3>
          <Bar
            data={{
              labels: Object.keys(summary.type_distribution),
              datasets: [
                {
                  label: "Count",
                  data: Object.values(summary.type_distribution),
                  backgroundColor: "rgba(54,162,235,0.6)",
                },
              ],
            }}
          />

          <h3>Flowrate Trend</h3>
          <Line
            data={{
              labels: summary.flowrate_list.map((_, i) => `Item ${i + 1}`),
              datasets: [
                {
                  label: "Flowrate",
                  data: summary.flowrate_list,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.3,
                },
              ],
            }}
          />

          <h3>Type Distribution (Pie Chart)</h3>
          <Pie
            data={{
              labels: Object.keys(summary.type_distribution),
              datasets: [
                {
                  data: Object.values(summary.type_distribution),
                  backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                    "rgba(153,102,255,0.6)",
                    "rgba(255,159,64,0.6)",
                  ],
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadPage;
