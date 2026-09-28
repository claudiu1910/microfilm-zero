import RedactionWipe from './RedactionWipe';
import Scramble from './Scramble';
import { withRedactions } from '../lib/redactions';
import { headingId } from '../lib/headings';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useReveal } from '../hooks/useReveal';

function Transcript({ block }) {
  const [ref, printing] = useReveal({ rootMargin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const instant = reduced || !printing;

  return (
    <aside className="tscript" ref={ref}>
      <p className="tscript__head mono">
        <Scramble text={block.title} />
      </p>
      <ol className={`tscript__list${printing || reduced ? ' is-printing' : ''}`}>
        {block.lines.map((line, i) => (
          <li
            key={`${line.time}-${i}`}
            style={instant ? undefined : { animationDelay: `${i * 220}ms` }}
          >
            <span className="tscript__time mono">{line.time}</span>
            <span className="tscript__who mono">{line.who}</span>
            <span className="tscript__x">{line.x}</span>
          </li>
        ))}
      </ol>
      <p className="tscript__foot mono">
        End of extract
        <span className="caret" aria-hidden="true">
          ▮
        </span>
      </p>
    </aside>
  );
}

function Evidence({ block }) {
  return (
    <aside className="evlog">
      <p className="evlog__head mono">
        <Scramble text={block.title} />
      </p>
      <dl className="evlog__rows">
        {/* index in the key: row labels are prose and may legitimately repeat */}
        {block.rows.map((row, i) => (
          <div key={`${row.k}-${i}`}>
            <dt className="mono">{row.k}</dt>
            <dd>{row.v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function Sidebar({ block }) {
  return (
    <aside className="sidebar">
      <p className="sidebar__label mono">{block.label}</p>
      <h3 className="sidebar__title">{block.title}</h3>
      {block.paras.map((x) => (
        <p className="sidebar__p" key={x.slice(0, 40)}>
          {withRedactions(x)}
        </p>
      ))}
    </aside>
  );
}

function Plate({ block }) {
  const [ref, shown] = useReveal();
  return (
    <figure className={`plate-fig${shown ? ' is-seated' : ''}`} ref={ref}>
      <div className="plate-fig__img">
        <img src={block.src} alt={block.caption} loading="lazy" decoding="async" />
      </div>
      <figcaption className="mono">{block.caption}</figcaption>
    </figure>
  );
}

export default function ArticleBody({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        const key = `${block.t}-${i}`;
        switch (block.t) {
          case 'h':
            return (
              <RedactionWipe as="h2" className="prose__h" id={headingId(block.x)} key={key}>
                {block.x}
              </RedactionWipe>
            );
          case 'pull':
            return (
              <blockquote className="prose__pull" key={key}>
                {block.x}
              </blockquote>
            );
          case 'note':
            return (
              <p className="prose__note mono" key={key}>
                <span className="prose__note-tag">Margin</span>
                {block.x}
              </p>
            );
          case 'side':
            return <Sidebar block={block} key={key} />;
          case 'transcript':
            return <Transcript block={block} key={key} />;
          case 'evidence':
            return <Evidence block={block} key={key} />;
          case 'plate':
            return <Plate block={block} key={key} />;
          case 'p':
          default:
            return (
              <p className="prose__p" key={key}>
                {withRedactions(block.x)}
              </p>
            );
        }
      })}
    </div>
  );
}
