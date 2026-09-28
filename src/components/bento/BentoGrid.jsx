import { motion } from 'framer-motion';

import AudioLogModule from './AudioLogModule';
import FileModule from './FileModule';
import RedactionModule from './RedactionModule';
import TimelineModule from './TimelineModule';
import RedactionWipe from '../RedactionWipe';
import Scramble from '../Scramble';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ARCHIVE } from '../../data/dossier';

export default function BentoGrid() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    shown: { transition: { staggerChildren: reduced ? 0 : 0.07 } }
  };
  const item = reduced
    ? { hidden: { opacity: 1 }, shown: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18, filter: 'blur(3px)' },
        shown: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.42, ease: [0.16, 0.9, 0.24, 1] }
        }
      };

  // Telemetry modules are slotted between the cases so the grid reads as one
  // instrument panel rather than a row of cards followed by a row of widgets.
  // Spans are explicit so each row of the 4-column grid closes exactly:
  // 2+1+1, then 1+2+1, then 1+2+1.
  const slots = [
    { key: 'f0', span: 'lead', el: <FileModule file={ARCHIVE[0]} index={0} lead /> },
    { key: 'f1', span: 'unit', el: <FileModule file={ARCHIVE[1]} index={1} /> },
    { key: 'log', span: 'unit', el: <AudioLogModule /> },
    { key: 'f2', span: 'unit', el: <FileModule file={ARCHIVE[2]} index={2} /> },
    { key: 'f3', span: 'lead', el: <FileModule file={ARCHIVE[3]} index={3} lead /> },
    { key: 'timeline', span: 'unit', el: <TimelineModule /> },
    { key: 'f4', span: 'unit', el: <FileModule file={ARCHIVE[4]} index={4} /> },
    { key: 'redaction', span: 'wide', el: <RedactionModule /> },
    { key: 'f5', span: 'unit', el: <FileModule file={ARCHIVE[5]} index={5} /> }
  ];

  return (
    <section className="archive shell" id="archive">
      <div className="section-head">
        <RedactionWipe as="h2" className="section-head__title">
          Secondary files
        </RedactionWipe>
        <Scramble
          className="section-head__meta mono"
          text={`${ARCHIVE.length} OF 41 RELEASED // BALANCE HELD UNDER PETITION`}
        />
      </div>

      <motion.div
        className="bento"
        variants={container}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      >
        {slots.map((s) => (
          <motion.div
            className={`bento__slot bento__slot--${s.span}`}
            key={s.key}
            variants={item}
          >
            {s.el}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
