import { useEffect, useState } from 'react';

import { useReducedMotion } from '../hooks/useReducedMotion';
import { useReveal } from '../hooks/useReveal';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/\\<>*+=-';
const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
const STRUCTURAL = /[\s—–/,.:#()[\]]/;

/**
 * Metadata decryption: cycles random glyphs for ~350ms, locking characters
 * left to right until the real string is exposed. Punctuation and spaces are
 * never scrambled, so the shape of the stamp holds steady while it resolves.
 */
export default function Scramble({
  text,
  as: Tag = 'span',
  duration = 350,
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion();
  const [ref, shown] = useReveal();
  // null means "settled" — the real text renders straight through.
  const [noise, setNoise] = useState(null);

  useEffect(() => {
    if (!shown || reduced) return undefined;

    const chars = [...text];
    const locked = chars.map((c) => STRUCTURAL.test(c));
    const start = performance.now();
    let raf = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const upTo = Math.floor(t * chars.length);
      if (t < 1) {
        setNoise(chars.map((c, i) => (locked[i] || i < upTo ? c : pick())).join(''));
        raf = requestAnimationFrame(tick);
      } else {
        setNoise(null);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, reduced, text, duration]);

  return (
    <Tag ref={ref} className={`scramble${className ? ` ${className}` : ''}`} {...rest}>
      {noise ?? text}
    </Tag>
  );
}
