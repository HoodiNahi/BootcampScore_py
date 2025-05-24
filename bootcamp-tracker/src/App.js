import React, { useEffect, useRef, useState } from 'react';
//import Chart from 'chart.js/auto';
//import 'chartjs-chart-polar-scatter';
import './index.css';
import PilotSelector from './component/PliotSelector';
import Bullseye from './component/chart'
import { fetchPasses, fetchWeaponsForPilot} from './api';
//import PassesTable from "./component/passesTable";

function App() {
  const [dates, setDates] = useState([]);
  const [passes, setPasses] = useState([]);
  const [selectedPilot, setSelectedPilot] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handlePilotSelect = async (pilot) => {
    setSelectedPilot(pilot);
    const res = await fetchWeaponsForPilot(pilot);
    setDates(res?.data || []);
    setPasses([]);
  };

  const handleDateClick = async (pilot, weapon) => {
  try {
    const res = await fetchPasses(pilot, weapon);

    const passesArray = Array.isArray(res) ? res : res.data;
    setPasses(passesArray || []);
  } catch (err) {
    console.error('fetchPasses error', err);
    setPasses([]);
  }
};

//  const getColorByQuality = (quality) => {
//  switch (quality.toUpperCase()) {
//    case 'EXCELLENT':
//      return '#0984e3'; // green
//    case 'GOOD':
//      return '#00b894'; // yellow
//    case 'INEFFECTIVE':
//      return '#ffb400'; // red
//    case 'POOR':
//      return '#ff4d4f'
//    default:
//      return '#94a3b8'; // slate/gray for unknown
//  }
//};


//  useEffect(() => {
//  if (!passes.length) return;
//
//  // build [{ r: distance, t: radial }, ...]
//  const dataPoints = passes.map(p => ({
//    r: p.distance || 0,
//    t: p.radial   // Chart.js expects degrees here
//  }));
//
//  const dataset = {
//    label: 'Passes',
//    data: dataPoints,
//    backgroundColor: passes.map(p => getColorByQuality(p.quality)),
//  };
//
// if (chartInstance.current) {
//     chartInstance.current.destroy();
//   }
//  chartInstance.current = new Chart(chartRef.current, {
//    type: 'polarScatter',      // <-- special type
//    data: { datasets: [dataset] },
//    options: {
//      responsive: true,
//      scales: {
//        r: {
//          beginAtZero: true,
//          // optionals:
//          angleLines: { display: true },
//          suggestedMax: Math.max(...dataPoints.map(d => d.r)) * 1.1
//        }
//      },
//      plugins: {
//        legend: { position: 'bottom' }
//      }
//    }
//  });
//}, [passes]);

  return (
  <div className="app-container">
    <header className="header">
      <h1>Bootcamp Score Tracker</h1>
    </header>

    <section className="section">
      <h2 className="section-title">Select Pilot</h2>
      <PilotSelector onSelect={handlePilotSelect} />
    </section>

    <section className="section">
      <h2 className="section-title">Weapons Used</h2>
      <ul className="button-list">
        {dates.map(d => (
          <li key={d}>
            <div
              className="btn"
              onClick={() => handleDateClick(selectedPilot, d)}
            >
              {d}
            </div>
          </li>
        ))}
      </ul>
    </section>

    <section className="section">
      <h2 className="section-title">Passes</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Target</th>
              <th>Weapon</th>
              <th>Distance (m)</th>
              <th>Radial (°)</th>
              <th>Quality</th>
            </tr>
          </thead>
          <tbody>
            {passes.map((p, idx) => (
              <tr key={idx}>
                <td>{p.pass_number}</td>
                <td>{p.target}</td>
                <td>{p.weapon}</td>
                <td>{p.distance}</td>
                <td>{p.radial}</td>
                <td>{p.quality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="section">
      <h2 className="section-title">Bullseye Chart</h2>
      <div className="chart-container">
        <Bullseye passes={passes} />
      </div>
    </section>
  </div>
);
}

export default App;
