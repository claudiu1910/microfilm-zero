import { useEffect, useState } from 'react';

/**
 * Mirrors the `contain` fit DitherVeil applies to its photo, so overlay markers
 * sit on the image rather than on the letterboxed frame around it.
 * Returns the image rect in element-local pixels.
 */
export function useContainBox(ref, aspect) {
  const [box, setBox] = useState(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const measure = () => {
      const w = node.clientWidth;
      const h = node.clientHeight;
      if (!w || !h) return;

      const width = w / h > aspect ? h * aspect : w;
      const height = w / h > aspect ? h : w / aspect;
      setBox({ left: (w - width) / 2, top: (h - height) / 2, width, height });
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, aspect]);

  return box;
}
