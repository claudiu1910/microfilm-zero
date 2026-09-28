import Scramble from '../Scramble';

/**
 * HUD selector for the primary viewer. Renders as a radio group so arrow keys
 * move between targets the way a physical selector would.
 */
export default function TargetSwitcher({ targets, activeId, pendingId, onSelect }) {
  return (
    <div className="switcher" role="radiogroup" aria-label="Optical target">
      <p className="switcher__label mono">
        Optical target
        <span className="switcher__state">
          {pendingId ? 'RE-POINTING' : 'LOCKED'}
        </span>
      </p>

      <div className="switcher__row">
        {targets.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              className={`switcher__btn${active ? ' is-active' : ''}${
                pendingId === t.id ? ' is-pending' : ''
              }`}
              onClick={() => onSelect(t.id)}
            >
              <span className="switcher__code mono">{t.code}</span>
              <span className="switcher__name">{t.label}</span>
              <span className="switcher__bearing mono">
                BRG {t.bearing} · {t.range}
              </span>
              <span className="switcher__lamp" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <p className="switcher__hint mono">
        <Scramble text="CARRIAGE SLAVED TO SELECTOR // 3 TARGETS ON REEL" />
      </p>
    </div>
  );
}
