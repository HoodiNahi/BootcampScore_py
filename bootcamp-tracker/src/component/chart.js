// src/component/Bullseye.js
import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const qualityColor = {
  EXCELLENT:   '#0984e3',
  GOOD:        '#00b894',
  INEFFECTIVE: '#ffb400',
  POOR:        '#ff4d4f'
};

/**
 * props.passes is an array of:
 *   { distance: number, radial: number, pass_number, target, quality }
 *
 * We draw rings at [10, 20, 30, 40] meters, then map each pass:
 *   x = r·sin(θ), y = r·cos(θ)  (compass: 0°=up, 90°=right)
 */
export default function Bullseye({ passes }) {
  // 1) Find the maximum distance we care about (ensure at least 40m)
  const maxR = useMemo(() => {
    const dataMax = Math.max(...passes.map(p => Number(p.distance) || 0));
    return Math.max(dataMax, 40);
  }, [passes]);

  // 2) Build polar→Cartesian data
  const data = useMemo(() => {
    return passes.map(p => {
      const r = Number(p.distance) || 0;
      const b = Number(p.radial)   || 0;
      const br = (b * Math.PI) / 180;
      return {
        x:  r * Math.sin(br),
        y:  r * Math.cos(br),
        ...p,
        fill: qualityColor[p.quality.toUpperCase()] || '#94a3b8'
      };
    });
  }, [passes]);

  // 3) Fixed list of ring distances
  const rings = [10, 20, 30, 40];

  // 4) Chart domain (symmetrical so center=0,0)
  const domain = [-maxR, maxR];

  // 5) Container size in pixels
  const SIZE = 400;
  const CENTER = SIZE / 2;

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE, margin: '0 auto' }}>
      {/* SVG rings background */}
      <svg
        width={SIZE}
        height={SIZE}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {rings.map((rl, i) => {
          const px = (rl / maxR) * CENTER;
          return (
            <circle
              key={i}
              cx={CENTER}
              cy={CENTER}
              r={px}
              fill="none"
              stroke="#888"
              strokeWidth={1}
            />
          );
        })}
      </svg>

      {/* Recharts scatter overlaid */}
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="x" type="number" domain={domain} hide />
          <YAxis dataKey="y" type="number" domain={domain} hide />

          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(val, name, props) => {
              const p = props.payload;
              return [
                `#${p.pass_attempt} – ${p.target_name}`,
                `Dist: ${p.distance}m @ ${p.radial}°`
              ];
            }}
          />

          <Scatter data={data} shape="circle">
            {data.map((entry, i) => (
              <circle key={i} r={5} fill={entry.fill} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}