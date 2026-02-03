import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UploadPage from "./UploadPage";
import HistoryPage from "./HistoryPage";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement
);

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 20, background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: 20 }}>Upload CSV</Link>
        <Link to="/history">History</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;