import Scramble from '../Scramble';
import { TIMELINE } from '../../data/bento';

export default function TimelineModule() {
  return (
    <article className="bento__module module module--timeline">
      <header className="module__head">
        <p className="module__kicker mono">FEED</p>
        <h3 className="module__title">{TIMELINE.title}</h3>
      </header>

      <ol className="timeline">
        {TIMELINE.events.map((e) => (
          <li key={e.date} className={`timeline__row timeline__row--${e.cls}`}>
            <span className="timeline__dot" aria-hidden="true" />
            <Scramble className="timeline__date mono" text={e.date} />
            <span className="timeline__x">{e.x}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
