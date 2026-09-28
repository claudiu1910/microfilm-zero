import { Link } from 'react-router-dom';

import DitherVeil from '../DitherVeil';
import Loupe from '../Loupe';
import RedactionWipe from '../RedactionWipe';
import Scramble from '../Scramble';
import { useFlashTo } from '../../lib/flashContext';
import { useImageReady } from '../../hooks/useImageReady';
import { useInView } from '../../hooks/useInView';

/** `lead` modules span 2x2 and carry a taller live preview. */
export default function FileModule({ file, index, lead = false }) {
  const [ref, seen] = useInView();
  const ready = useImageReady(seen ? file.src : null);
  const flashTo = useFlashTo();
  const to = `/files/${file.id.toLowerCase()}`;

  return (
    <article
      className={`bento__module module module--file${lead ? ' module--lead' : ''}`}
      ref={ref}
    >
      <Loupe className="module__frame">
        {seen && ready ? (
          <DitherVeil
            src={file.src}
            fit="cover"
            pattern="floyd"
            pixelSize={2}
            inkColor="#120f17"
            paperColor="#f4f1ea"
            revealRadius={lead ? 190 : 130}
            softness={0.6}
            linger={1}
          />
        ) : (
          <span className="card__placeholder" aria-hidden="true" />
        )}
        <span className="card__index mono" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        {lead && <span className="module__span mono" aria-hidden="true">LEAD</span>}
      </Loupe>

      <div className="module__body">
        <p className="module__meta mono">
          <Scramble className="card__id" text={file.id} />
          <span className={`tag tag--${file.tag.toLowerCase()}`}>
            <Scramble text={file.tag} />
          </span>
        </p>

        <h3 className="module__title module__title--file">
          <RedactionWipe delay={60 + index * 40}>
            <Link
              to={to}
              className="card__link"
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                event.preventDefault();
                flashTo(to);
              }}
            >
              {file.title}
              <span className="card__hit" aria-hidden="true" />
            </Link>
          </RedactionWipe>
        </h3>

        <p className="module__note">{file.note}</p>

        <p className="module__foot mono">
          <span>{file.reel}</span>
          <span>{file.date}</span>
        </p>
        <p className="card__open mono" aria-hidden="true">Open file →</p>
      </div>
    </article>
  );
}
