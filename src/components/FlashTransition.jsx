import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FlashContext } from '../lib/flashContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** 100ms optical exposure: a negative inversion over the page, then the route. */
export default function FlashProvider({ children }) {
  const [firing, setFiring] = useState(false);
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const busy = useRef(false);

  const flashTo = useCallback(
    (to) => {
      if (busy.current) return;

      if (reduced) {
        navigate(to);
        window.scrollTo(0, 0);
        return;
      }

      busy.current = true;
      setFiring(true);
      window.setTimeout(() => {
        navigate(to);
        window.scrollTo(0, 0);
        setFiring(false);
        busy.current = false;
      }, 100);
    },
    [navigate, reduced]
  );

  return (
    <FlashContext.Provider value={flashTo}>
      {children}
      <div className={`exposure${firing ? ' is-firing' : ''}`} aria-hidden="true" />
    </FlashContext.Provider>
  );
}
