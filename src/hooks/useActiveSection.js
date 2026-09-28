import { useEffect, useState } from 'react';

/**
 * Scroll-spy for the file rail. Marks whichever section heading most recently
 * crossed the top third of the viewport, so the contents list tracks the read.
 *
 * The effect reads the ids back out of the joined key rather than closing over
 * the array, because the caller builds a fresh array on every render and that
 * array's identity is not the real dependency — its contents are.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !key) return undefined;

    const nodes = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (nodes.length === 0) return undefined;

    const seen = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e));
        const passed = nodes
          .map((n) => seen.get(n.id))
          .filter((e) => e && e.boundingClientRect.top < window.innerHeight * 0.34);
        setActive(passed.length ? passed[passed.length - 1].target.id : null);
      },
      { rootMargin: '0px 0px -66% 0px', threshold: [0, 1] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
