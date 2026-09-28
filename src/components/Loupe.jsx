import { useCallback, useRef, useState } from 'react';

/**
 * Targeting loupe for the archive cards. Reports the cursor position in the
 * card's own pixel space, which is what an operator lining up a frame on a
 * reader would read off the stage.
 */
export default function Loupe({ children, className = '' }) {
  const hostRef = useRef(null);
  const loupeRef = useRef(null);
  const [live, setLive] = useState(false);
  const [loc, setLoc] = useState([0, 0]);
  const queued = useRef(0);

  const track = useCallback((event) => {
    const host = hostRef.current;
    const loupe = loupeRef.current;
    if (!host || !loupe) return;

    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    loupe.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    // Throttle the readout to one update per frame; the ring itself is
    // positioned every event so it never lags the cursor.
    if (queued.current) return;
    queued.current = requestAnimationFrame(() => {
      queued.current = 0;
      setLoc([Math.round(x), Math.round(y)]);
    });
  }, []);

  return (
    <div
      ref={hostRef}
      className={`loupe-host${className ? ` ${className}` : ''}`}
      onPointerMove={track}
      onPointerEnter={(event) => {
        track(event);
        setLive(true);
      }}
      onPointerLeave={() => setLive(false)}
    >
      {children}
      <span
        ref={loupeRef}
        className={`loupe${live ? ' is-live' : ''}`}
        aria-hidden="true"
      >
        <span className="loupe__ring" />
        <span className="loupe__readout">
          REL-LOC: [{loc[0]}, {loc[1]}]
        </span>
      </span>
    </div>
  );
}
