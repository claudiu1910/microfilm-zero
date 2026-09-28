import { TICKER } from '../data/dossier';

const Run = ({ hidden }) => (
  <span className="ticker__run" aria-hidden={hidden ? 'true' : undefined}>
    {TICKER.map((item) => (
      <span className="ticker__item" key={item}>
        {item}
        <i className="ticker__sep" aria-hidden="true">
          ✷
        </i>
      </span>
    ))}
  </span>
);

export default function ClassificationTicker() {
  return (
    <div className="ticker" role="marquee" aria-label="Classification status">
      <div className="ticker__track">
        <Run />
        <Run hidden />
      </div>
    </div>
  );
}
