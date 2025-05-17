import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './index.css';
import PilotSelector from './component/PliotSelector';
import { fetchPasses, fetchWeaponsForPilot} from './api';
import PassesTable from "./component/passesTable";

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
    const res = await fetchPasses(pilot, weapon);
    setPasses(res?.length > 0 ? res : []);
  };

  const getColorByQuality = (quality) => {
  switch (quality.toUpperCase()) {
    case 'EXCELLENT':
      return '#0984e3'; // green
    case 'GOOD':
      return '#00b894'; // yellow
    case 'INEFFECTIVE':
      return '#ffb400'; // red
    case 'POOR':
      return '#ff4d4f'
    default:
      return '#94a3b8'; // slate/gray for unknown
  }
};


  useEffect(() => {
    if (!passes.length) return;

    const labels = passes.map(p => p.target || `Pass ${p.pass_number}`);
    const data = passes.map(p => p.distance || 0);


    const chartData = {
      labels,
      datasets: [{
        label: 'Pass Distance (m)',
        data,
        backgroundColor: passes.map(p => getColorByQuality(p.quality)),
      }]
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const newChart = new Chart(chartRef.current, {
      type: 'polarArea',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    chartInstance.current = newChart;
  }, [passes]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bootcamp Score Tracker</h1>

      <PilotSelector onSelect={handlePilotSelect} />

      <hr className="my-4" />

      <h2 className="text-xl font-semibold mb-2">Weapons Used</h2>
      <ul className="mb-6">
        {dates.map((d) => (
          <li
            key={d}
            onClick={() => handleDateClick(selectedPilot, d)}
            className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            {d}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Passes</h2>
      <table className="table-auto w-full border mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Target</th>
            <th className="border px-4 py-2">Weapon</th>
            <th className="border px-4 py-2">Distance (m)</th>
            <th className="border px-4 py-2">Quality</th>
          </tr>
        </thead>
        <tbody>
          {passes.map((p, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{p.pass_number}</td>
              <td className="border px-4 py-2">{p.target}</td>
              <td className="border px-4 py-2">{p.weapon}</td>
              <td className="border px-4 py-2">{p.distance}</td>
              <td className="border px-4 py-2">{p.quality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={"chart"}>
        <h2 className="text-xl font-semibold mb-2">Bullseye Chart</h2>
      <canvas ref={chartRef} className="max-w-lg mx-auto mt-4" />
      </div>

    </div>

  );
}

export default App;
