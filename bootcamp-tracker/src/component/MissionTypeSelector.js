import React, { useState,useEffect } from 'react';
import { fetchMissionTypeForPilot } from '../api';

export default function MissionTypeSelector({ pilot, onSelect }) {
  const [value, setValue] = useState('');
  const [missionTypes, setMissionTypes] = useState([]);

  useEffect(() => {
    async function load() {
      if (!pilot) return;
      const res = await fetchMissionTypeForPilot(pilot);
      setMissionTypes(res || []);
      setValue(''); //  Reset dropdown selection when pilot changes
    }
    load();
  }, [pilot]); // refetch mission types if pilot changes

  const handleChange = e => {
    const selected = e.target.value;
    setValue(selected);
    onSelect(selected);
  };

  return (
    <div className="missionType-dropdown">
      <select value={value} onChange={handleChange}>
        <option value="" disabled>
          Select a mission type…
        </option>
        {missionTypes.map((m, i) => (
          <option key={i} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}

