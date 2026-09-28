import { EXPOSURE } from '../../data/targets';

/**
 * Live control over the dither. Both sliders start at the integration spec's
 * values (grain 2, radius 200) and drive DitherVeil's props directly — the
 * component re-reads its settings every render, so nothing remounts.
 */
export default function ExposureSlider({ pixelSize, revealRadius, onChange, onReset }) {
  const atDefault =
    pixelSize === EXPOSURE.pixelSize.default && revealRadius === EXPOSURE.revealRadius.default;

  return (
    <div className="exposure-ctl">
      <p className="exposure-ctl__label mono">
        Exposure control
        <button
          type="button"
          className="exposure-ctl__reset mono"
          onClick={onReset}
          disabled={atDefault}
        >
          {atDefault ? 'AT PLATE SPEC' : 'RESET TO SPEC'}
        </button>
      </p>

      <label className="slider">
        <span className="slider__name mono">Dither grain</span>
        <input
          type="range"
          min={EXPOSURE.pixelSize.min}
          max={EXPOSURE.pixelSize.max}
          step={EXPOSURE.pixelSize.step}
          value={pixelSize}
          onChange={(e) => onChange({ pixelSize: Number(e.target.value) })}
        />
        <output className="slider__val mono">{pixelSize} px/cell</output>
      </label>

      <label className="slider">
        <span className="slider__name mono">Reveal radius</span>
        <input
          type="range"
          min={EXPOSURE.revealRadius.min}
          max={EXPOSURE.revealRadius.max}
          step={EXPOSURE.revealRadius.step}
          value={revealRadius}
          onChange={(e) => onChange({ revealRadius: Number(e.target.value) })}
        />
        <output className="slider__val mono">{revealRadius} px</output>
      </label>
    </div>
  );
}
