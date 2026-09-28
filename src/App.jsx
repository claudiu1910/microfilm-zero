import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';

import Archive from './pages/Archive';
import Article from './pages/Article';
import Home from './pages/Home';
import PageTransition from './components/PageTransition';
import FlashProvider from './components/FlashTransition';
import { legacySlugToId } from './data/articles';

/** Keeps the earlier /file/<slug> links working after the move to /files/<id>. */
function LegacyFileRedirect() {
  const { slug } = useParams();
  const id = legacySlugToId(slug);
  return <Navigate to={id ? `/files/${id}` : '/'} replace />;
}

export default function App() {
  const location = useLocation();

  return (
    <FlashProvider>
      <a className="skip" href="#frame">
        Skip to content
      </a>
      <div className="reader" aria-hidden="true" />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/archive"
            element={
              <PageTransition>
                <Archive />
              </PageTransition>
            }
          />
          <Route
            path="/files/:id"
            element={
              <PageTransition>
                <Article />
              </PageTransition>
            }
          />
          <Route path="/file/:slug" element={<LegacyFileRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </FlashProvider>
  );
}
