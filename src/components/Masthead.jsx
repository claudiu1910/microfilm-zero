import { Link, useLocation } from 'react-router-dom';

import { useFlashTo } from '../lib/flashContext';

import ClassificationTicker from './ClassificationTicker';
import RedactionWipe from './RedactionWipe';
import Scramble from './Scramble';
import { MASTHEAD } from '../data/dossier';

export default function Masthead({ compact = false }) {
  const flashTo = useFlashTo();
  const { pathname } = useLocation();

  return (
    <header className={`masthead${compact ? ' masthead--compact' : ''}`}>
      <ClassificationTicker />

      <div className="masthead__bar shell">
        <span className="stamp stamp--filled">
          <Scramble text={MASTHEAD.classification} />
        </span>
        <Scramble className="masthead__bar-meta" text={MASTHEAD.custody} />
        <span className="masthead__bar-meta masthead__bar-meta--end">
          <Scramble as="time" dateTime="2026-09-26" text={MASTHEAD.dateStamp} />
        </span>
      </div>

      <div className="masthead__title shell">
        <h1 className="wordmark">
          <Link to="/" className="wordmark__link">
            <RedactionWipe className="wordmark__line">Microfilm</RedactionWipe>
            <RedactionWipe className="wordmark__line wordmark__line--alt" delay={140}>
              Zero
            </RedactionWipe>
          </Link>
          <em className="wordmark__issue mono">{MASTHEAD.issue}</em>
        </h1>

        <dl className="masthead__index">
          <div>
            <dt>Reel</dt>
            <dd>
              <Scramble text={MASTHEAD.reel.replace('REEL: ', '')} />
            </dd>
          </div>
          <div>
            <dt>Classification</dt>
            <dd>
              <Scramble text="Declassified" />
            </dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>
              <Scramble text="Restricted" />
            </dd>
          </div>
          <div>
            <dt>Frames</dt>
            <dd>
              <Scramble text="118" />
            </dd>
          </div>
        </dl>
      </div>

      <nav className="masthead__nav shell" aria-label="Dossier index">
        <span className="masthead__nav-label">Dossier index</span>
        <ul>
          {MASTHEAD.index.map((item, i) => {
            const n = <i aria-hidden="true">{String(i + 1).padStart(2, '0')}</i>;
            const current = item.to && item.to === pathname;
            return (
              <li key={item.id}>
                {item.to ? (
                  <Link
                    to={item.to}
                    aria-current={current ? 'page' : undefined}
                    className={current ? 'is-current' : undefined}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                      event.preventDefault();
                      if (!current) flashTo(item.to);
                    }}
                  >
                    {n}
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href}>
                    {n}
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
