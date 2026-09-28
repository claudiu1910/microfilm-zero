// Optical targets for the HUD switcher. Each carries its own reticle marks,
// spec sheet and telemetry baseline, so switching re-points the whole viewer
// rather than just swapping a photograph.
//
// `mark` coordinates are fractions of the photographed image, not of the frame.

export const TARGETS = [
  {
    id: 'A',
    code: 'TGT-A',
    label: 'Vantage Head Cast',
    caseNumber: 'CASE 00-A94',
    frameId: 'FRAME 001 / 118',
    title: 'The Glass Witness',
    standfirst:
      'One frame survived the purge at the Vantage optical station. It shows a head cast in dispersive polymer — a calibration object, the disposal manifest said. The cast has an ear. Mannequin blanks do not.',
    src: 'https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop',
    aspect: 1400 / 1939,
    bearing: '—',
    range: 'BENCH',
    telemetry: { density: 2.14, decay: 14, drift: -0.04, lamp: 84 },
    meta: [
      { k: 'Origin', v: 'Vantage Station, Bay 7' },
      { k: 'Recovered', v: '07 NOV 1994' },
      { k: 'Emulsion', v: '16mm silver halide' },
      { k: 'Condition', v: 'Vinegar syndrome, arrested' },
      { k: 'Status', v: 'Released in full' }
    ],
    notes: [
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
    ]
  },

  {
    id: 'B',
    code: 'TGT-B',
    label: 'Bay 7 Perimeter',
    caseNumber: 'CASE 02-C17',
    frameId: 'FRAME 014 / 061',
    title: 'The Fence That Wasn’t Wired',
    standfirst:
      'The perimeter schedule bills for a sensor loop and security mesh along the northern line. The photograph shows stock agricultural chain-link on a scaffold rail, carrying nothing at all.',
    src: 'https://images.unsplash.com/photo-1593617056478-fcf0db0a5f20?q=80&w=1400&auto=format&fit=crop',
    aspect: 1400 / 2100,
    bearing: '004°',
    range: '11.4 M',
    telemetry: { density: 1.87, decay: 9, drift: 0.02, lamp: 79 },
    meta: [
      { k: 'Origin', v: 'Northern fence line, post 3' },
      { k: 'Recovered', v: '14 MAR 1991' },
      { k: 'Emulsion', v: '35mm panchromatic' },
      { k: 'Condition', v: 'Sound, light silvering' },
      { k: 'Status', v: 'Released in full' }
    ],
    notes: [
      {
        id: 'A',
        time: '00:00:02',
        ref: 'REF A / TOP RAIL',
        mark: { x: 0.54, y: 0.19 },
        text:
          'The top rail is scaffold tube, rusted through at the sleeve joint. The schedule bills for galvanised security section. Scaffold tube is what you use when the fence is not expected to stop anyone.'
      },
      {
        id: 'B',
        time: '00:00:09',
        ref: 'REF B / BARB PITCH',
        mark: { x: 0.33, y: 0.24 },
        text:
          'The barbs above the rail are twisted on one at a time and spaced between 90 and 140mm. Machine-drawn wire is uniform to within 5mm. This was strung by hand, off a drum.'
      },
      {
        id: 'C',
        time: '00:00:16',
        ref: 'REF C / MESH GAUGE',
        mark: { x: 0.28, y: 0.55 },
        text:
          'Chain-link on a 50mm diamond — stock agricultural fencing. Security mesh is 25mm or tighter, because a 50mm diamond takes the toe of a boot. Nothing here is insulated, so nothing here carries a sensor loop.'
      },
      {
        id: 'D',
        time: '00:00:23',
        ref: 'REF D / DEAD GROUND',
        mark: { x: 0.72, y: 0.52 },
        text:
          'The ground beyond runs open to the ridge with no dead ground and no cover for two hundred metres. There is nothing on this line for a camera to watch, which is consistent with the mast pointing the other way.'
      },
      {
        id: 'E',
        time: '00:00:31',
        ref: 'REF E / SKY',
        mark: { x: 0.74, y: 0.11 },
        text:
          'Broken cloud with a low sun off frame left, throwing the rail shadow down the mesh. The duty book records continuous overcast for the whole of that morning.'
      },
      {
        id: 'F',
        time: '00:00:38',
        ref: 'REF F / STANCE',
        mark: { x: 0.22, y: 0.87 },
        text:
          'The camera is inside the wire, low, angled out and slightly up. Nothing of the station is in frame. Whoever took this was documenting the fence itself and was careful not to document anything behind it.'
      }
    ]
  },

  {
    id: 'C',
    code: 'TGT-C',
    label: 'Relay Dish Array',
    caseNumber: 'CASE 03-A08',
    frameId: 'FRAME 007 / 042',
    title: 'Bearing 041',
    standfirst:
      'The fourth dish is larger than the three that carry the regional trunk, and it points at a compound that appears on no published list of ministry installations.',
    src: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=1400&auto=format&fit=crop',
    aspect: 900 / 599,
    bearing: '041°',
    range: '2.1 KM',
    telemetry: { density: 2.42, decay: 21, drift: -0.11, lamp: 91 },
    meta: [
      { k: 'Origin', v: 'Ridge above Vantage, NNE' },
      { k: 'Recovered', v: '19 SEP 1992' },
      { k: 'Emulsion', v: '35mm panchromatic' },
      { k: 'Condition', v: 'Base fog, edge flare' },
      { k: 'Status', v: 'Released in full' }
    ],
    notes: [
      {
        id: 'A',
        time: '00:00:03',
        ref: 'REF A / APERTURE',
        mark: { x: 0.63, y: 0.46 },
        text:
          'Measured against the mount, the aperture is 1.8m. The three trunk dishes on the same pad are 1.2m. You fit the larger dish when the far end is distant or deliberately quiet.'
      },
      {
        id: 'B',
        time: '00:00:10',
        ref: 'REF B / AZIMUTH',
        mark: { x: 0.68, y: 0.38 },
        text:
          'The face is turned well off the trunk alignment. Projected out, the boresight clears the ridge and runs nine kilometres over forestry to a compound with a fence and a lattice mast.'
      },
      {
        id: 'C',
        time: '00:00:18',
        ref: 'REF C / PEDESTAL',
        mark: { x: 0.63, y: 0.67 },
        text:
          'A fixed pedestal, not a tracking mount. This dish was aimed once, bolted, and never expected to move again.'
      },
      {
        id: 'D',
        time: '00:00:25',
        ref: 'REF D / HORIZON',
        mark: { x: 0.21, y: 0.75 },
        text:
          'The treeline sits below the boresight by roughly two degrees. Clearance was surveyed. Somebody chose this pad for the geometry.'
      },
      {
        id: 'E',
        time: '00:00:33',
        ref: 'REF E / TWILIGHT',
        mark: { x: 0.16, y: 0.2 },
        text:
          'Civil twilight, sun below the horizon. The signals office logged this link as running "heavy" that evening and logged the fault as trunk.'
      },
      {
        id: 'F',
        time: '00:00:40',
        ref: 'REF F / HARDSTANDING',
        mark: { x: 0.86, y: 0.84 },
        text:
          'Graded hardstanding to the right of the pad, wide enough for a vehicle. The site plan shows grass.'
      }
    ]
  }
];

export const DEFAULT_TARGET = TARGETS[0].id;
export const getTarget = (id) => TARGETS.find((t) => t.id === id) ?? TARGETS[0];

// Slider stops. The midpoint is the integration spec's configuration exactly.
export const EXPOSURE = {
  pixelSize: { min: 1, max: 6, step: 1, default: 2 },
  revealRadius: { min: 80, max: 360, step: 10, default: 200 }
};
