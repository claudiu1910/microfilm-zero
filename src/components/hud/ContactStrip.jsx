/**
 * Contact sheet of the three targets on the reel, under the gate.
 * Doubles as a second way into the switcher and fills the column beside the
 * notes panel, which otherwise ran several hundred pixels short of it.
 *
 * Plain <img> with a CSS halftone treatment on purpose: these are thumbnails,
 * and each live DitherVeil would cost another WebGL context.
 */
export default function ContactStrip({ targets, activeId, pendingId, onSelect }) {
  return (
    <div className="strip">
      <p className="strip__label mono">
        Contact sheet
        <span className="strip__hint">Reel 00-A94 · 3 targets</span>
      </p>

      <ul className="strip__row">
        {targets.map((t, i) => {
          const active = t.id === activeId;
          return (
            <li key={t.id}>
              <button
                type="button"
                className={`strip__cell${active ? ' is-active' : ''}${
                  pendingId === t.id ? ' is-pending' : ''
                }`}
                aria-pressed={active}
                onClick={() => onSelect(t.id)}
              >
                <span className="strip__thumb">
                  <img src={t.src} alt="" loading="lazy" decoding="async" />
                  <span className="strip__sprockets" aria-hidden="true" />
                </span>
                <span className="strip__meta mono">
                  <span className="strip__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="strip__code">{t.code}</span>
                </span>
                <span className="strip__name">{t.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
