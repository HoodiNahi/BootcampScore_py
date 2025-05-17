import React, { useEffect, useState } from 'react';
import { fetchPilots } from '../api';

function PilotSelector({ onSelect }) {
  const [pilots, setPilots] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetchPilots().then((res) => setPilots(res.data));
  }, []);

  const handleSelect = (e) => {
    const name = e.target.value;
    setSelected(name);
    onSelect(name);
  };

  return (
    <div>
      <h3>Select Pilot</h3>
      <select onChange={handleSelect} value={selected}>
        <option value="">-- Select --</option>
        {pilots.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  );
}

export default PilotSelector;
