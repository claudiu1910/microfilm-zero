import Scramble from './Scramble';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useReveal } from '../hooks/useReveal';

const STEP = 260;

export default function FieldNotes({ notes, activeId, onSelect, frameId }) {
  const [ref, printing] = useReveal({ rootMargin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const instant = reduced || !printing;

  return (
    <section className="notes" id="notes" aria-labelledby="notes-title" ref={ref}>
      <div className="notes__head">
        <h3 id="notes-title">Field notes</h3>
        <p className="notes__lede mono">
          Select an entry to mark the detail it cites on the frame.
        </p>
      </div>

      <ol className={`notes__list${printing || reduced ? ' is-printing' : ''}`}>
        {notes.map((note, i) => {
          const isActive = note.id === activeId;
          return (
            <li
              key={note.id}
              className="notes__row"
              style={instant ? undefined : { animationDelay: `${i * STEP}ms` }}
            >
              <button
                type="button"
                className={`note${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => onSelect(isActive ? null : note.id)}
              >
                <span className="note__bar" aria-hidden="true" />
                <span className="note__meta mono">
                  <Scramble as="time" text={note.time} />
                  <Scramble className="note__ref" text={note.ref} />
                </span>
                <span className="note__text">{note.text}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="notes__foot mono">
        {activeId
          ? `Marked ${notes.find((n) => n.id === activeId).ref} on ${frameId}.`
          : `No marker set. ${notes.length} entries on this frame.`}
        <span className="caret" aria-hidden="true">
          ▮
        </span>
      </p>
    </section>
  );
}
