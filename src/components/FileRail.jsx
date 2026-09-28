import { Link } from 'react-router-dom';

import Scramble from './Scramble';
import { useActiveSection } from '../hooks/useActiveSection';
import { useFlashTo } from '../lib/flashContext';

export default function FileRail({ file, sections, related }) {
  const active = useActiveSection(sections.map((s) => s.id));
  const flashTo = useFlashTo();

  return (
    <aside className="filerail" aria-label="File navigation">
      <nav className="railbox" aria-label="Sections in this file">
        <p className="railbox__head mono">In this file</p>
        <ol className="railtoc">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`railtoc__link${active === s.id ? ' is-active' : ''}`}
                aria-current={active === s.id ? 'true' : undefined}
              >
                <span className="railtoc__no mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="railtoc__label">{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="railbox">
        <p className="railbox__head mono">Key figures</p>
        <dl className="railfacts">
          {file.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>
                <Scramble text={f.v} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="railbox railbox--stamp">
        <p className="railbox__head mono">Release</p>
        <p className="railstamp">
          <span className={`tag tag--${file.header.tag.toLowerCase()}`}>{file.header.tag}</span>
        </p>
        <p className="railstamp__note mono">{file.header.status}</p>
        <p className="railstamp__note mono">{file.header.custody}</p>
      </div>

      {related.length > 0 && (
        <div className="railbox">
          <p className="railbox__head mono">Also in this reel</p>
          <ul className="railrel">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/files/${r.id.toLowerCase()}`}
                  className="railrel__link"
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                    event.preventDefault();
                    flashTo(`/files/${r.id.toLowerCase()}`);
                  }}
                >
                  <span className="railrel__id mono">{r.id}</span>
                  <span className="railrel__name">{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
