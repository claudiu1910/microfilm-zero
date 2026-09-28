import { motion } from 'framer-motion';

import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Carriage change between routes: the outgoing page sinks and loses focus,
 * the incoming one rises into the gate. Reduced motion gets a plain cut.
 */
export default function PageTransition({ children }) {
  const reduced = useReducedMotion();

  if (reduced) return <div className="page">{children}</div>;

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      transition={{ duration: 0.34, ease: [0.16, 0.9, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
