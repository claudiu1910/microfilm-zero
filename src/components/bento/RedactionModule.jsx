import Redacted from '../Redacted';
import { REDACTION_CHUNKS } from '../../data/bento';

export default function RedactionModule() {
  return (
    <article className="bento__module module module--redaction">
      <header className="module__head">
        <p className="module__kicker mono">REDACTED</p>
        <h3 className="module__title">{REDACTION_CHUNKS.title}</h3>
        <p className="module__meta mono">{REDACTION_CHUNKS.meta}</p>
      </header>

      <p className="module__intro">{REDACTION_CHUNKS.intro}</p>

      <ul className="chunks">
        {REDACTION_CHUNKS.chunks.map((c) => (
          <li key={c.label}>
            <span className="chunks__label mono">{c.label}</span>
            <Redacted>{c.hidden}</Redacted>
          </li>
        ))}
      </ul>
    </article>
  );
}
