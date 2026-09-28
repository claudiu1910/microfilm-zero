import { useEffect, useState } from 'react';

import { useReducedMotion } from './useReducedMotion';

const TICK = 900;

// Each reading drifts around its baseline by its own amount, so the bar does
// not pulse in lockstep and read as decorative.
const JITTER = { density: 0.03, decay: 0.4, drift: 0.015, lamp: 1.1 };

const wobble = (base, spread) => base + (Math.random() * 2 - 1) * spread;

/**
 * Instrument readings for the telemetry bar. Values wander around the active
 * target's baseline; when the user asks for reduced motion they hold still at
 * the baseline instead, because a flickering numeric readout is exactly the
 * kind of motion that request is about.
 *
 * The sample carries the baseline it was taken from, so switching target falls
 * back to the new baseline during render rather than through a reset effect.
 */
export function useTelemetry(baseline) {
  const reduced = useReducedMotion();
  const [sample, setSample] = useState(null);

  useEffect(() => {
    if (reduced) return undefined;

    const id = window.setInterval(() => {
      setSample({
        base: baseline,
        values: {
          density: wobble(baseline.density, JITTER.density),
          decay: wobble(baseline.decay, JITTER.decay),
          drift: wobble(baseline.drift, JITTER.drift),
          lamp: wobble(baseline.lamp, JITTER.lamp)
        }
      });
    }, TICK);

    return () => window.clearInterval(id);
  }, [baseline, reduced]);

  const live = !reduced && sample?.base === baseline ? sample.values : baseline;
  return { live, settled: reduced };
}
