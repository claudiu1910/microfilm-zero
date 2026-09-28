import { useCallback, useEffect, useRef, useState } from 'react';

import DitherVeil from './DitherVeil';
import FieldNotes from './FieldNotes';
import RedactionWipe from './RedactionWipe';
import Scramble from './Scramble';
import ContactStrip from './hud/ContactStrip';
import CrtGlitch from './hud/CrtGlitch';
import ExposureSlider from './hud/ExposureSlider';
import TargetSwitcher from './hud/TargetSwitcher';
import TelemetryBar from './hud/TelemetryBar';
import { useContainBox } from '../hooks/useContainBox';
import { useImageReady } from '../hooks/useImageReady';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DEFAULT_TARGET, EXPOSURE, TARGETS, getTarget } from '../data/targets';
import { FEATURE } from '../data/dossier';

// Long enough for the interference to register, short enough not to be a wait.
const GLITCH_MS = 420;

export default function Hero() {
  const frameRef = useRef(null);
  const promptRef = useRef(null);

  const [activeId, setActiveId] = useState(DEFAULT_TARGET);
  const [pendingId, setPendingId] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  // Guards against a second switch landing while the first is still running.
  const switchToken = useRef(0);
  const [probing, setProbing] = useState(false);
  const [exposure, setExposure] = useState({
    pixelSize: EXPOSURE.pixelSize.default,
    revealRadius: EXPOSURE.revealRadius.default
  });

  const reduced = useReducedMotion();
  const target = getTarget(activeId);

  const ready = useImageReady(target.src);

  const box = useContainBox(frameRef, target.aspect);
  const activeNote = target.notes.find((n) => n.id === activeNoteId) ?? null;

  const selectTarget = useCallback(
    (id) => {
      if (id === activeId || id === pendingId) return;
      setActiveNoteId(null);

      if (reduced) {
        setActiveId(id);
        return;
      }

      const token = ++switchToken.current;
      setPendingId(id);

      // Hold the switch until the interference has run *and* the incoming
      // plate is cached, so the gate never flashes empty. Capped so a dead
      // image cannot strand the viewer mid-switch.
      const warmed = new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = resolve;
        img.onerror = resolve;
        img.src = getTarget(id).src;
        if (img.complete) resolve();
      });
      const interference = new Promise((resolve) => window.setTimeout(resolve, GLITCH_MS));
      const ceiling = new Promise((resolve) => window.setTimeout(resolve, GLITCH_MS + 2600));

      Promise.all([interference, Promise.race([warmed, ceiling])]).then(() => {
        if (switchToken.current !== token) return;
        setActiveId(id);
        setPendingId(null);
      });
    },
    [activeId, pendingId, reduced]
  );

  // A switch in flight when the component unmounts must not commit.
  useEffect(() => () => { switchToken.current = -1; }, []);

  const trackPointer = useCallback((event) => {
    const frame = frameRef.current;
    const prompt = promptRef.current;
    if (!frame || !prompt) return;
    const rect = frame.getBoundingClientRect();
    prompt.style.transform = `translate3d(${event.clientX - rect.left}px, ${
      event.clientY - rect.top
    }px, 0)`;
  }, []);

  const switching = Boolean(pendingId);

  return (
    <section className="hero shell" id="frame">
      <div className="hero__head">
        <p className="hero__kicker">
          <span className="stamp stamp--filled">
            <Scramble text={FEATURE.kicker} />
          </span>
          <Scramble className="mono" text={target.caseNumber} />
        </p>
        <RedactionWipe as="h2" className="hero__title" delay={200} key={target.id}>
          {target.title}
        </RedactionWipe>
        <p className="hero__standfirst">{target.standfirst}</p>
        <p className="hero__byline mono">{FEATURE.byline}</p>
      </div>

      <div className="hero__hud">
        <TargetSwitcher
          targets={TARGETS}
          activeId={activeId}
          pendingId={pendingId}
          onSelect={selectTarget}
        />
        <TelemetryBar baseline={target.telemetry} target={target} />
      </div>

      <div className="hero__body">
        <div className="hero__main">
        <figure className={`plate${ready ? ' is-seated' : ''}`}>
          <div className="plate__rail plate__rail--top" aria-hidden="true" />

          <div
            className="plate__frame"
            ref={frameRef}
            onPointerMove={trackPointer}
            onPointerEnter={(event) => {
              trackPointer(event);
              setProbing(true);
            }}
            onPointerLeave={() => setProbing(false)}
          >
            {/* Exact configuration from the integration spec. Grain and radius
                start at the specified 2 / 200 and are driven live by the HUD
                exposure control. */}
            <div
              style={{
                width: '100%',
                height: '600px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {ready ? (
                <DitherVeil
                  inkColor="#120f17"
                  linger={1}
                  paperColor="#f4f1ea"
                  pattern="floyd"
                  pixelSize={exposure.pixelSize}
                  revealRadius={exposure.revealRadius}
                  softness={0.6}
                  src={target.src}
                />
              ) : (
                <span className="plate__loading mono">Winding reel…</span>
              )}
            </div>

            <CrtGlitch active={switching} />

            <div
              className={`prompt${probing && !switching ? ' is-live' : ''}`}
              ref={promptRef}
              aria-hidden="true"
            >
              <span className="prompt__ring" />
              <span className="prompt__label">Unredact Frame</span>
            </div>

            {box && activeNote && !switching ? (
              <div className="marks" aria-hidden="true">
                <span
                  className="mark"
                  style={{
                    left: `${box.left + activeNote.mark.x * box.width}px`,
                    top: `${box.top + activeNote.mark.y * box.height}px`
                  }}
                >
                  <span className="mark__crosshair" />
                  <span className="mark__label mono">{activeNote.ref}</span>
                </span>
              </div>
            ) : null}

            <span className="plate__corner plate__corner--tl" aria-hidden="true" />
            <span className="plate__corner plate__corner--tr" aria-hidden="true" />
            <span className="plate__corner plate__corner--bl" aria-hidden="true" />
            <span className="plate__corner plate__corner--br" aria-hidden="true" />
          </div>

          <div className="plate__rail plate__rail--bottom" aria-hidden="true" />

          <figcaption className="plate__caption">
            <Scramble className="mono" text={target.frameId} />
            <span className="plate__hint mono">across the frame to burn through the dither</span>
          </figcaption>
        </figure>

          <dl className="specsheet specsheet--strip">
            {target.meta.map((row) => (
              <div key={row.k}>
                <dt>{row.k}</dt>
                <dd>
                  <Scramble text={row.v} />
                </dd>
              </div>
            ))}
          </dl>

          <ContactStrip
            targets={TARGETS}
            activeId={activeId}
            pendingId={pendingId}
            onSelect={selectTarget}
          />
        </div>

        <div className="hero__aside">
          <ExposureSlider
            pixelSize={exposure.pixelSize}
            revealRadius={exposure.revealRadius}
            onChange={(patch) => setExposure((e) => ({ ...e, ...patch }))}
            onReset={() =>
              setExposure({
                pixelSize: EXPOSURE.pixelSize.default,
                revealRadius: EXPOSURE.revealRadius.default
              })
            }
          />

          <FieldNotes
            notes={target.notes}
            activeId={activeNoteId}
            onSelect={setActiveNoteId}
            frameId={target.frameId}
          />
        </div>
      </div>
    </section>
  );
}
