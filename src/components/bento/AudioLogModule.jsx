import { useEffect, useState } from 'react';

import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useReveal } from '../../hooks/useReveal';
import { AUDIO_LOG } from '../../data/bento';

const CHAR_MS = 22;
const LINE_GAP = 420;

/**
 * Transcript of the recovery-bench tape, typed out as if coming off the
 * printer. This is text only — there is no audio playback, deliberately:
 * nothing here should start making noise on its own.
 */
export default function AudioLogModule() {
  const [ref, started] = useReveal();
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(null);

  useEffect(() => {
    if (!started || reduced) return undefined;

    let line = 0;
    let char = 0;
    let timer;

    const step = () => {
      const current = AUDIO_LOG.lines[line];
      if (char < current.length) {
        char += 1;
        setTyped({ line, char });
        timer = window.setTimeout(step, CHAR_MS);
        return;
      }
      if (line < AUDIO_LOG.lines.length - 1) {
        line += 1;
        char = 0;
        setTyped({ line, char });
        timer = window.setTimeout(step, LINE_GAP);
      }
    };

    timer = window.setTimeout(step, 300);
    return () => window.clearTimeout(timer);
  }, [started, reduced]);

  const done = reduced || !typed;
  const visibleLines = done ? AUDIO_LOG.lines.length : typed.line + 1;

  return (
    <article className="bento__module module module--log" ref={ref}>
      <header className="module__head">
        <p className="module__kicker mono">{AUDIO_LOG.ref}</p>
        <h3 className="module__title">{AUDIO_LOG.title}</h3>
        <p className="module__meta mono">{AUDIO_LOG.meta}</p>
      </header>

      <ol className="log">
        {AUDIO_LOG.lines.slice(0, visibleLines).map((l, i) => {
          const last = !done && i === typed.line;
          return (
            <li key={l}>
              {last ? l.slice(0, typed.char) : l}
              {last && <span className="caret" aria-hidden="true">▮</span>}
            </li>
          );
        })}
      </ol>

      {done && (
        <p className="module__foot mono">
          End of tape
          <span className="caret" aria-hidden="true">▮</span>
        </p>
      )}
    </article>
  );
}
