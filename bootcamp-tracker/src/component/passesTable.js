import React from 'react';

const PassesTable = ({ passes }) => {
  if (!passes || passes.length === 0) {
    return <p className="text-center text-gray-500">No passes available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Pass</th>
            <th className="px-4 py-2 text-left">Weapon</th>
            <th className="px-4 py-2 text-left">Target</th>
            <th className="px-4 py-2 text-left">Distance</th>
            <th className="px-4 py-2 text-left">Radial</th>
            <th className="px-4 py-2 text-left">Quality</th>
          </tr>
        </thead>
        <tbody>
          {passes.map((pass, index) => (
            <tr key={pass.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{pass.pass_attempt}</td>
              <td className="px-4 py-2">{pass.weapon}</td>
              <td className="px-4 py-2">{pass.player_target}</td>
                <td className="px-4 py-2">{pass.distance}</td>
                <td className="px-4 py-2">{pass.radial}</td>
                <td className="px-4 py-2">{pass.quality}</td>
              <td className="px-4 py-2 font-semibold text-blue-600">{pass.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassesTable;
