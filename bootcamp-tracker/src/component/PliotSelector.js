import React, { useState, useEffect } from 'react';
import { fetchPilots } from '../api'; // whatever your data source is

export default function PilotSelector({ onSelect }) {
  const [pilots, setPilots] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    async function load() {
      const res = await fetchPilots();
      setPilots(res.data || []);
    }
    load();
  }, []);

  const handleChange = e => {
    setValue(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <div className="pilot-dropdown">
      <select value={value} onChange={handleChange}>
        <option value="" disabled>
          Select a Pilot…
        </option>
        {pilots.map(p => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}