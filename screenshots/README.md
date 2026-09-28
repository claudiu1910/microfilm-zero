# Screenshots

Captured from the running dev server in headless Chrome (WebGL via SwiftShader),
so the dither, the HUD and the animations are genuine output.

```bash
npm run dev
SITE=http://localhost:5173 npm run shots     # regenerate these
SITE=http://localhost:5173 npm run verify    # 66 behavioural checks
```

| File | Shows |
| --- | --- |
| `01-home-masthead` | Ticker, wordmark, classification index, route nav |
| `02-hud-target-switcher` | Target selector, telemetry bar, exposure sliders |
| `02b-hero-contact-sheet` | The landscape target — spec strip and contact sheet under the gate |
| `03-home-hero-dithered` | Primary viewer at rest |
| `04-home-hero-unredacted` | Mid-reveal: cursor trail burned through to full colour |
| `05-field-note-marker` | Field note selected, reticle on the cited detail |
| `06-bento-grid` | Asymmetric bento: lead modules, audio log, timeline feed |
| `06b-bento-card-hover` | Hover affordance — underline, OPEN tab, brightened cue |
| `07-bento-targeting-loupe` | Module hover with live `REL-LOC` readout |
| `08-exposure-flash` | Navigation flash held at peak — full negative inversion |
| `09-file-header` | File page: pills, stamp sheet, custody chain |
| `10-file-plate-unredacted` | File plate mid-reveal |
| `11-file-prose-redaction-open` | A redacted passage lifted, rewrapped inline |
| `12-file-evidence-log` | Evidence log table |
| `13-file-transcript` | Teletype transcript with end-of-extract caret |
| `14-file-halftone-plate` | High-contrast halftone evidence plate |
| `15-file-sidebar` | Boxed sidebar — right of reply / method explainer |
| `15c-file-rail` | Sticky rail — contents, key figures, release stamp, related files |
| `15b-file-crossref` | Cross-referenced files and footer |
| `16-archive-ledger` | Master ledger: stat tiles, filters, sortable table |
| `17-home-full-page` / `18-file-full-page` | Whole pages, 1440px |
| `19-mobile-home` / `20-mobile-file` | 390px |

Section shots are 1440x900 at 2x; full-page shots are 1x. Mobile is 390x844 at 2x.

The exposure flash is frozen mid-animation for `08` — at 100ms it is too fast to
catch reliably, though `npm run verify` confirms it reaches opacity 1 in normal
playback. The CRT interference on a target switch is likewise too brief to still;
`verify` asserts it fires and clears.
