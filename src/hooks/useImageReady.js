import { useEffect, useState } from 'react';

// If the network stalls, mount anyway and let the component deal with it —
// a permanent placeholder is worse than an empty gate that fills in late.
const FALLBACK_MS = 6000;

/**
 * Resolves once the image is sitting in the browser cache.
 *
 * DitherVeil only paints its photo if the image finishes loading while the
 * element is on screen — a load that lands while it is scrolled away leaves
 * the canvas blank until something else wakes it. Warming the cache first
 * means the component's own request resolves immediately on mount.
 *
 * Deliberately keyed on `load` rather than `decode()`: the decode promise was
 * observed hanging indefinitely for detached images in Chrome, which left the
 * frame stuck on its placeholder. `load` is enough to guarantee the cache hit.
 */
export function useImageReady(src) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src) return undefined;

    let settled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const done = () => {
      if (settled) return;
      settled = true;
      setReady(true);
    };

    img.onload = done;
    img.onerror = done;
    img.src = src;

    // Cached images can complete before the handlers are attached.
    if (img.complete) done();

    const fallback = window.setTimeout(done, FALLBACK_MS);

    return () => {
      settled = true;
      window.clearTimeout(fallback);
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return ready;
}
