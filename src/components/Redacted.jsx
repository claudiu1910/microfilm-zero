import { useState } from 'react';

/**
 * A passage the censor blacked out. Click, or focus and press enter/space, to
 * lift it.
 *
 * Deliberately a <span role="button"> rather than a <button>: a button always
 * establishes its own formatting context, so a lifted passage could not rewrap
 * inside the paragraph and sat there as a centred block. A span participates in
 * the surrounding inline flow, and box-decoration-break paints the bar across
 * every line fragment. The text stays in the DOM throughout — this is a visual
 * censor bar, not a secret.
 */
export default function Redacted({ children }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <span
      role="button"
      tabIndex={0}
      className={`redacted${open ? ' is-open' : ''}`}
      aria-expanded={open}
      title={open ? 'Hide passage' : 'Reveal redacted passage'}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggle();
      }}
    >
      {children}
    </span>
  );
}
