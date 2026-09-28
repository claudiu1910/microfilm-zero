import { useEffect, useRef, useState } from 'react';

const supported = () => typeof IntersectionObserver !== 'undefined';

/**
 * Adds a one-way "revealed" latch the moment any part of the element enters the
 * viewport, so wipes and teleprinter staggers fire as sections are reached
 * rather than all at once on mount. The threshold is deliberately zero: a
 * negative inset left headlines sitting just under the fold concealed at rest.
 */
export function useReveal({ rootMargin = '0px', delay = 0 } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => !supported());

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return undefined;

    let timer;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        timer = window.setTimeout(() => setShown(true), delay);
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [rootMargin, delay, shown]);

  return [ref, shown];
}
