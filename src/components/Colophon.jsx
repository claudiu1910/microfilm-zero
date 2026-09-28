import RedactionWipe from './RedactionWipe';
import { COLOPHON, MASTHEAD } from '../data/dossier';

export default function Colophon() {
  return (
    <footer className="colophon" id="colophon">
      <div className="shell colophon__inner">
        <div className="colophon__statement">
          <RedactionWipe as="h2" className="section-head__title section-head__title--invert">
            Colophon
          </RedactionWipe>
          <p>{COLOPHON.statement}</p>
        </div>

        <dl className="colophon__rows mono">
          {COLOPHON.rows.map((row) => (
            <div key={row.k}>
              <dt>{row.k}</dt>
              <dd>{row.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="shell colophon__rule mono">
        <span>{MASTHEAD.wordmark.toUpperCase()}</span>
        <span>{MASTHEAD.classification}</span>
        <span>{MASTHEAD.reel}</span>
      </div>
    </footer>
  );
}
