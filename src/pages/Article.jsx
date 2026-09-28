import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import ArticleBody from '../components/ArticleBody';
import FileRail from '../components/FileRail';
import ClassificationTicker from '../components/ClassificationTicker';
import DitherVeil from '../components/DitherVeil';
import RedactionWipe from '../components/RedactionWipe';
import Scramble from '../components/Scramble';
import { useFlashTo } from '../lib/flashContext';
import { useImageReady } from '../hooks/useImageReady';
import { ARTICLES, articleById, getArticle } from '../data/articles';
import { sectionsOf } from '../lib/headings';
import { MASTHEAD } from '../data/dossier';

export default function Article() {
  const { id } = useParams();
  const file = getArticle(id);
  const flashTo = useFlashTo();
  const ready = useImageReady(file?.src);

  useEffect(() => {
    if (file) document.title = `${file.id} — ${file.title} / Microfilm Zero`;
    return () => {
      document.title = 'MICROFILM ZERO — Reel 00-A94 / Declassified';
    };
  }, [file]);

  if (!file) return <Navigate to="/" replace />;

  const related = (file.related ?? []).map(articleById).filter(Boolean);
  const position = ARTICLES.findIndex((a) => a.id === file.id);

  return (
    <div className="file">
      <ClassificationTicker />

      <div className="file__bar shell">
        <Link
          to="/"
          className="backlink mono"
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey) return;
            event.preventDefault();
            flashTo('/');
          }}
        >
          ← Return to dossier index
        </Link>
        <Scramble className="file__bar-meta" text={file.header.classification} />
        <Scramble
          className="file__bar-meta file__bar-meta--end"
          text={`FILE ${position + 1} OF ${ARTICLES.length}`}
        />
      </div>

      <article>
        <header className="file__head shell">
          <p className="file__pills">
            <span className={`tag tag--${file.header.tag.toLowerCase()}`}>
              <Scramble text={file.header.tag} />
            </span>
            <span className="pill mono">
              <Scramble text={file.id} />
            </span>
            <span className="pill pill--ghost mono">
              <Scramble text={file.kicker} />
            </span>
          </p>

          <RedactionWipe as="h1" className="file__title" delay={120}>
            {file.title}
          </RedactionWipe>

          <p className="file__standfirst">{file.standfirst}</p>

          <p className="file__byline mono">
            {file.byline}
            <span aria-hidden="true"> // </span>
            {file.dateline}
          </p>

          <dl className="stampsheet">
            {[
              ['Reel', file.header.reel],
              ['Dated', file.header.date],
              ['Accession', file.header.accession],
              ['Custody', file.header.custody],
              ['Status', file.header.status]
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>
                  <Scramble text={v} />
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="shell">
          <figure className={`plate plate--file${ready ? ' is-seated' : ''}`}>
            <div className="plate__rail plate__rail--top" aria-hidden="true" />
            <div className="plate__frame plate__frame--file">
              <div style={{ width: '100%', height: '520px', position: 'relative' }}>
                {ready ? (
                  <DitherVeil
                    src={file.src}
                    fit="cover"
                    pattern="floyd"
                    pixelSize={2}
                    inkColor="#120f17"
                    paperColor="#f4f1ea"
                    revealRadius={180}
                    softness={0.6}
                    linger={1}
                  />
                ) : (
                  <span className="plate__loading mono">Winding reel…</span>
                )}
              </div>
              <span className="plate__corner plate__corner--tl" aria-hidden="true" />
              <span className="plate__corner plate__corner--tr" aria-hidden="true" />
              <span className="plate__corner plate__corner--bl" aria-hidden="true" />
              <span className="plate__corner plate__corner--br" aria-hidden="true" />
            </div>
            <div className="plate__rail plate__rail--bottom" aria-hidden="true" />
            <figcaption className="plate__caption">
              <Scramble className="mono" text={`${file.id} / PLATE 01`} />
              <span className="plate__hint mono">across the frame to burn through the dither</span>
            </figcaption>
          </figure>
        </div>

        <div className="shell file__body">
          <ArticleBody blocks={file.blocks} />
          <FileRail file={file} sections={sectionsOf(file.blocks)} related={related} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="shell crossref">
          <h2 className="section-head__title crossref__title">Cross-referenced</h2>
          <ul className="crossref__list">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/files/${r.id.toLowerCase()}`}
                  className="crossref__link"
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                    event.preventDefault();
                    flashTo(`/files/${r.id.toLowerCase()}`);
                  }}
                >
                  <span className="mono crossref__id">{r.id}</span>
                  <span className="crossref__name">{r.title}</span>
                  <span className="mono crossref__go">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="colophon colophon--file">
        <div className="shell colophon__rule mono">
          <span>{MASTHEAD.wordmark.toUpperCase()}</span>
          <span>{file.header.classification}</span>
          <span>REEL: {file.header.reel}</span>
        </div>
      </footer>
    </div>
  );
}
