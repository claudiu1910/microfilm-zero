import { useTelemetry } from '../../hooks/useTelemetry';

const CHANNELS = [
  { k: 'density', label: 'Optical density', unit: 'D', digits: 2, range: [1.4, 3.0] },
  { k: 'decay', label: 'Silver halide decay', unit: '%', digits: 0, range: [0, 40] },
  { k: 'drift', label: 'Signal drift', unit: 'Hz', digits: 2, range: [-0.3, 0.3], signed: true },
  { k: 'lamp', label: 'Lamp temp', unit: '°C', digits: 0, range: [60, 110] }
];

const format = (v, c) => {
  const s = v.toFixed(c.digits);
  return c.signed && v >= 0 ? `+${s}` : s;
};

export default function TelemetryBar({ baseline, target }) {
  const { live, settled } = useTelemetry(baseline);

  return (
    <div className="telemetry" aria-label="Microfiche telemetry">
      <p className="telemetry__head mono">
        <span className="telemetry__dot" aria-hidden="true" />
        Microfiche telemetry
        <span className="telemetry__src">{target.code}</span>
      </p>

      <dl className="telemetry__row">
        {CHANNELS.map((c) => {
          const value = live[c.k];
          const pct = Math.min(100, Math.max(0,
            ((value - c.range[0]) / (c.range[1] - c.range[0])) * 100));
          return (
            <div className="telemetry__cell" key={c.k}>
              <dt>{c.label}</dt>
              <dd>
                {/* aria-live off: these drift continuously and would flood a screen reader */}
                <span className="telemetry__val" aria-live="off">
                  {format(value, c)}
                </span>
                <span className="telemetry__unit">{c.unit}</span>
              </dd>
              <span className="telemetry__meter" aria-hidden="true">
                <i style={{ width: `${pct}%` }} />
              </span>
            </div>
          );
        })}

        <div className="telemetry__cell telemetry__cell--static">
          <dt>Bearing / range</dt>
          <dd>
            <span className="telemetry__val">{target.bearing}</span>
            <span className="telemetry__unit">{target.range}</span>
          </dd>
          <span className="telemetry__meter" aria-hidden="true" />
        </div>
      </dl>

      <p className="telemetry__foot mono">
        {settled ? 'SAMPLING HELD — REDUCED MOTION' : 'SAMPLING 1.1 Hz — GATE OPEN'}
      </p>
    </div>
  );
}
