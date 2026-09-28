import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import Masthead from '../components/Masthead';
import RedactionWipe from '../components/RedactionWipe';
import Scramble from '../components/Scramble';
import { useFlashTo } from '../lib/flashContext';
import { CLASSES, LEDGER, LEDGER_STATS, TYPES } from '../data/ledger';

const COLUMNS = [
  { k: 'ref', label: 'Ref', w: '9rem' },
  { k: 'type', label: 'Class', w: '7rem' },
  { k: 'title', label: 'Record', w: 'minmax(0, 1fr)' },
  { k: 'date', label: 'Dated', w: '8rem' },
  { k: 'cls', label: 'Release', w: '9rem' },
  { k: 'frames', label: 'Frames', w: '6rem' }
];

const compare = (a, b, key) => {
  const x = a[key];
  const y = b[key];
  if (x === null || x === undefined) return 1;
  if (y === null || y === undefined) return -1;
  if (typeof x === 'number' && typeof y === 'number') return x - y;
  return String(x).localeCompare(String(y));
};

export default function Archive() {
  const flashTo = useFlashTo();
  const [q, setQ] = useState('');
  const [types, setTypes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });

  useEffect(() => {
    document.title = 'Master ledger — Microfilm Zero';
    return () => {
      document.title = 'MICROFILM ZERO — Reel 00-A94 / Declassified';
    };
  }, []);

  const toggle = (list, setList, v) =>
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = LEDGER.filter((r) => {
      if (types.length && !types.includes(r.type)) return false;
      if (classes.length && !classes.includes(r.cls)) return false;
      if (!needle) return true;
      return `${r.ref} ${r.title} ${r.note} ${r.held}`.toLowerCase().includes(needle);
    });
    const dir = sort.dir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => compare(a, b, sort.key) * dir);
  }, [q, types, classes, sort]);

  const setSortKey = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));

  const active = types.length + classes.length + (q ? 1 : 0);

  return (
    <div className="ledger-page">
      <Masthead compact />

      <section className="shell ledger">
        <div className="section-head">
          <RedactionWipe as="h1" className="section-head__title">
            Master ledger
          </RedactionWipe>
          <Scramble
            className="section-head__meta mono"
            text={`${LEDGER_STATS.records} RECORDS // ${LEDGER_STATS.frames} FRAMES // ${LEDGER_STATS.withheld} WITHHELD`}
          />
        </div>

        <div className="ledger__stats">
          {[
            ['Records', LEDGER_STATS.records],
            ['Reels', LEDGER_STATS.reels],
            ['Frames held', LEDGER_STATS.frames],
            ['Withheld in full', LEDGER_STATS.withheld]
          ].map(([k, v]) => (
            <div key={k} className="ledger__stat">
              <span className="ledger__stat-k mono">{k}</span>
              <span className="ledger__stat-v">
                <Scramble text={String(v)} />
              </span>
            </div>
          ))}
        </div>

        <div className="filters">
          <label className="filters__search">
            <span className="mono">Search ledger</span>
            <input
              type="search"
              value={q}
              placeholder="ref, title, custody…"
              onChange={(e) => setQ(e.target.value)}
            />
          </label>

          <fieldset className="filters__set">
            <legend className="mono">Record class</legend>
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={types.includes(t)}
                className={`chip mono${types.includes(t) ? ' is-on' : ''}`}
                onClick={() => toggle(types, setTypes, t)}
              >
                {t}
              </button>
            ))}
          </fieldset>

          <fieldset className="filters__set">
            <legend className="mono">Release</legend>
            {CLASSES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={classes.includes(c)}
                className={`chip mono${classes.includes(c) ? ' is-on' : ''}`}
                onClick={() => toggle(classes, setClasses, c)}
              >
                {c}
              </button>
            ))}
          </fieldset>

          <p className="filters__count mono" role="status">
            {rows.length} of {LEDGER.length} shown
            {active > 0 && (
              <button
                type="button"
                className="filters__clear mono"
                onClick={() => {
                  setQ('');
                  setTypes([]);
                  setClasses([]);
                }}
              >
                Clear {active}
              </button>
            )}
          </p>
        </div>

        <div className="table" role="table" aria-label="Master ledger">
          <div className="table__head" role="row">
            {COLUMNS.map((c) => (
              <button
                key={c.k}
                type="button"
                role="columnheader"
                aria-sort={
                  sort.key === c.k ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'
                }
                className={`table__th mono${sort.key === c.k ? ' is-sorted' : ''}`}
                onClick={() => setSortKey(c.k)}
              >
                {c.label}
                <span className="table__arrow" aria-hidden="true">
                  {sort.key === c.k ? (sort.dir === 'asc' ? '▲' : '▼') : '·'}
                </span>
              </button>
            ))}
          </div>

          {rows.length === 0 ? (
            <p className="table__empty mono">
              No records match. The ledger holds {LEDGER.length}.
            </p>
          ) : (
            rows.map((r) => {
              const to = r.slug ? `/files/${r.slug}` : null;
              return (
                <div className="table__row" role="row" key={r.ref}>
                  <span className="table__cell table__cell--ref mono" role="cell">{r.ref}</span>
                  <span className="table__cell mono" role="cell">
                    <span className={`type type--${r.type.toLowerCase()}`}>{r.type}</span>
                  </span>
                  <span className="table__cell table__cell--title" role="cell">
                    {to ? (
                      <Link
                        to={to}
                        className="table__link"
                        onClick={(e) => {
                          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                          e.preventDefault();
                          flashTo(to);
                        }}
                      >
                        {r.title}
                      </Link>
                    ) : (
                      r.title
                    )}
                    <span className="table__note">{r.note}</span>
                  </span>
                  <span className="table__cell mono" role="cell">{r.date}</span>
                  <span className="table__cell mono" role="cell">
                    <span className={`tag tag--${r.cls.toLowerCase()}`}>{r.cls}</span>
                  </span>
                  <span className="table__cell mono" role="cell">{r.frames ?? '—'}</span>
                </div>
              );
            })
          )}
        </div>

        <p className="ledger__foot mono">
          Custody chain held at MZ-ARCHIVE. Frames counted on release, not on deposit.
        </p>
      </section>
    </div>
  );
}
