import { useEffect, useRef, useState } from 'react';

const supported = () => typeof IntersectionObserver !== 'undefined';

/**
 * Latches true the first time the element intersects the viewport.
 * Each DitherVeil mounts its own WebGL context, so the archive grid waits
 * until a card is actually on screen before it spends one.
 */
export function useInView({ rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  // Without IntersectionObserver there is nothing to wait for, so start latched.
  const [seen, setSeen] = useState(() => !supported());

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, seen]);

  return [ref, seen];
}
