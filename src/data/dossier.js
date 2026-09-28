export const HERO_SRC =
  'https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop';

// Intrinsic aspect of HERO_SRC. Used to reproduce the component's `contain`
// letterboxing so the field-note markers land on the right part of the frame.
export const HERO_ASPECT = 1400 / 1939;

export const MASTHEAD = {
  wordmark: 'Microfilm Zero',
  issue: 'VOL. IV',
  reel: 'REEL: 00-A94',
  classification: 'DECLASSIFIED // RESTRICTED ACCESS',
  dateStamp: '26 SEP 2026',
  custody: 'CUSTODY: MZ-ARCHIVE / BAY 7',
  index: [
    { id: 'frame', label: 'Reel View', to: '/' },
    { id: 'ledger', label: 'Master Ledger', to: '/archive' },
    { id: 'files', label: 'Case Files', href: '/#archive' },
    { id: 'colophon', label: 'Colophon', href: '/#colophon' }
  ]
};

export const TICKER = [
  'DECLASSIFIED // RESTRICTED ACCESS',
  'REEL: 00-A94',
  'ACCESSION 1994.11.07',
  'EMULSION: SILVER HALIDE / 16MM',
  'RELEASED UNDER ARCHIVE PETITION 44-B',
  'FRAMES 001-118 OF 118',
  'HANDLE VIA MICROFILM ZERO CHANNELS ONLY'
];

export const FEATURE = {
  caseNumber: 'CASE 00-A94',
  kicker: 'Featured Investigation',
  title: 'The Glass Witness',
  standfirst:
    'One frame survived the purge at the Vantage optical station. It shows a head cast in dispersive polymer — a calibration object, the disposal manifest said. The cast has an ear. Mannequin blanks do not.',
  byline: 'Field report by the Microfilm Zero desk',
  frameId: 'FRAME 001 / 118',
  meta: [
    { k: 'Origin', v: 'Vantage Station, Bay 7' },
    { k: 'Recovered', v: '07 NOV 1994' },
    { k: 'Emulsion', v: '16mm silver halide' },
    { k: 'Condition', v: 'Vinegar syndrome, arrested' },
    { k: 'Status', v: 'Released in full' }
  ]
};

// x/y are fractions of the photographed image, not the frame element.
export const FIELD_NOTES = [
  {
    id: 'A',
    time: '00:00:04',
    ref: 'REF A / CROWN',
    mark: { x: 0.47, y: 0.13 },
    text:
      'A single specular band runs the length of the crown. One hard key light, high and camera-left. The station logged no lighting rig in Bay 7.'
  },
  {
    id: 'B',
    time: '00:00:11',
    ref: 'REF B / AURICLE',
    mark: { x: 0.17, y: 0.42 },
    text:
      'The left ear is fully modelled — helix, tragus, the lobe. Calibration blanks are cast smooth. This was taken off a living head.'
  },
  {
    id: 'C',
    time: '00:00:19',
    ref: 'REF C / OCULAR',
    mark: { x: 0.55, y: 0.27 },
    text:
      'Both lids are closed and modelled shut, not merely lowered. The disposal manifest describes an "optical target". Optical targets are cast with open eyes.'
  },
  {
    id: 'D',
    time: '00:00:26',
    ref: 'REF D / SPECTRUM',
    mark: { x: 0.62, y: 0.52 },
    text:
      'Chromatic separation fans out across the jaw. The polymer is dispersive by formulation: photograph this face and the face is what you lose.'
  },
  {
    id: 'E',
    time: '00:00:33',
    ref: 'REF E / RUNNEL',
    mark: { x: 0.66, y: 0.7 },
    text:
      'One opaque runnel at the throat where pigment pooled and set. It is the only volume in the frame that does not transmit light.'
  },
  {
    id: 'F',
    time: '00:00:41',
    ref: 'REF F / FIELD',
    mark: { x: 0.14, y: 0.86 },
    text:
      'No horizon. No cast shadow, no falloff, no floor. The object was photographed inside a void box — the station had one, and it was not on the inventory.'
  }
];

export const ARCHIVE = [
  {
    id: 'MZ-0114',
    slug: 'observation-mast',
    title: 'Observation Mast',
    src: 'https://images.unsplash.com/photo-1618482914248-29272d021005?q=80&w=900&auto=format&fit=crop',
    reel: 'REEL: 02-C17',
    date: '14 MAR 1991',
    tag: 'DECLASSIFIED',
    status: 'Released in full',
    note:
      'Six housings on one mast at the Vantage perimeter. Four face the road. Two face the staff car park.'
  },
  {
    id: 'MZ-0231',
    slug: 'the-paper-trail',
    title: 'The Paper Trail',
    src: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=900&auto=format&fit=crop',
    reel: 'REEL: 02-D03',
    date: '02 JUN 1993',
    tag: 'PARTIAL',
    status: 'Redactions upheld',
    note:
      'Clipped submissions from the review board, photographed on the table before collection. Page one is a consent schedule.'
  },
  {
    id: 'MZ-0307',
    slug: 'relay-station',
    title: 'Relay Station',
    src: 'https://images.unsplash.com/photo-1557174360-3f4f7c724501?q=80&w=900&auto=format&fit=crop',
    reel: 'REEL: 03-A08',
    date: '19 SEP 1992',
    tag: 'DECLASSIFIED',
    status: 'Released in full',
    note:
      'The dish array above the treeline carried Bay 7 traffic. Bearing resolves to a facility the ministry has never named.'
  },
  {
    id: 'MZ-0442',
    slug: 'projection-test',
    title: 'Projection Test',
    src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=900&auto=format&fit=crop',
    reel: 'REEL: 00-A94',
    date: '07 NOV 1994',
    tag: 'RESTRICTED',
    status: 'Access by petition',
    note:
      'The recovered reel, run once for inspection. The haze in the beam is the emulsion outgassing under the lamp.'
  },
  {
    id: 'MZ-0519',
    slug: 'coverage-map',
    title: 'Coverage Map',
    src: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=900&auto=format&fit=crop',
    reel: 'REEL: 04-B22',
    date: 'UNDATED',
    tag: 'DECLASSIFIED',
    status: 'Provenance disputed',
    note:
      'Wall map from the Bay 7 briefing room. The pinholes cluster in places the programme was never authorised to operate.'
  },
  {
    id: 'MZ-0603',
    slug: 'sector-housing',
    title: 'Sector Housing',
    src: 'https://images.unsplash.com/photo-1714475099702-d8312928df29?q=80&w=900&auto=format&fit=crop',
    reel: 'REEL: 05-F01',
    date: '28 JAN 1995',
    tag: 'DECLASSIFIED',
    status: 'Released in full',
    note:
      'Staff blocks under the stacks, shot from the mast. The programme housed its subjects within sight of the station.'
  }
];

export const COLOPHON = {
  statement:
    'Microfilm Zero publishes primary material recovered from decommissioned state facilities. Frames are released as scanned, without retouching. Where a redaction survives, it survives because a court upheld it.',
  rows: [
    { k: 'Accession', v: '1994.11.07 / MZ-ARCHIVE' },
    { k: 'Petition', v: '44-B, granted 12 FEB 2026' },
    { k: 'Scanner', v: 'Flatbed transmissive, 4000 dpi' },
    { k: 'Frames held', v: '118' },
    { k: 'Frames withheld', v: '0' },
    { k: 'Last audit', v: '26 SEP 2026' }
  ]
};
