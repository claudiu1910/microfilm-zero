/**
 * Analog interference played over the viewer while the carriage re-points.
 * Purely decorative and never interactive, so it stays aria-hidden and
 * pointer-transparent; reduced motion collapses it to a single flat hold.
 */
export default function CrtGlitch({ active }) {
  return (
    <div className={`crt${active ? ' is-active' : ''}`} aria-hidden="true">
      <span className="crt__tear crt__tear--1" />
      <span className="crt__tear crt__tear--2" />
      <span className="crt__tear crt__tear--3" />
      <span className="crt__split" />
      <span className="crt__flare" />
    </div>
  );
}
