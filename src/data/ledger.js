// Master ledger backing /archive. Mixed record classes so the type filter has
// something to do: reels, petitions, disposal manifests and station logs.

export const TYPES = ['REEL', 'PETITION', 'MANIFEST', 'LOG'];
export const CLASSES = ['DECLASSIFIED', 'PARTIAL', 'RESTRICTED', 'WITHHELD'];

/** Files with a story page get `slug`; the ledger links those rows out. */
export const LEDGER = [
  { ref: '00-A94', type: 'REEL', title: 'Optical bay recovery reel', date: '1994-11-07', cls: 'RESTRICTED', frames: 118, held: 'Cold store 1', slug: 'mz-0442', note: 'Run once for inspection. Conservation hold.' },
  { ref: '02-C17', type: 'REEL', title: 'Perimeter mast survey', date: '1991-03-14', cls: 'DECLASSIFIED', frames: 61, held: 'Bay 3', slug: 'mz-0114', note: 'Six housings, mast 3. Duty logs attached.' },
  { ref: '02-D03', type: 'REEL', title: 'Review board table copy', date: '1993-06-02', cls: 'PARTIAL', frames: 44, held: 'Deposit 2', slug: 'mz-0231', note: 'Redactions upheld on personal-data grounds.' },
  { ref: '03-A08', type: 'REEL', title: 'Ridge signals survey', date: '1992-09-19', cls: 'DECLASSIFIED', frames: 42, held: 'Bay 3', slug: 'mz-0307', note: 'Dish array, bearing 041.' },
  { ref: '04-B22', type: 'REEL', title: 'Briefing room furniture lot', date: '1995-08-03', cls: 'DECLASSIFIED', frames: 12, held: 'Lot 11', slug: 'mz-0519', note: 'Provenance disputed by the ministry.' },
  { ref: '05-F01', type: 'REEL', title: 'Staff block condition survey', date: '1995-01-28', cls: 'DECLASSIFIED', frames: 12, held: 'Estates', slug: 'mz-0603', note: 'Twelve plates from mast 3 platform.' },
  { ref: '05-F02', type: 'REEL', title: 'Staff block condition survey, second pass', date: '1995-02-11', cls: 'WITHHELD', frames: 9, held: 'Estates', note: 'Withheld pending third-party consultation.' },
  { ref: '06-A11', type: 'REEL', title: 'Machine shop inventory', date: '1990-07-22', cls: 'DECLASSIFIED', frames: 28, held: 'Bay 3', note: 'Routine. Listed for completeness.' },
  { ref: '06-A12', type: 'REEL', title: 'Gatehouse apron, night', date: '1991-11-03', cls: 'PARTIAL', frames: 17, held: 'Bay 3', note: 'Two frames withheld; registrations legible.' },
  { ref: '07-C04', type: 'REEL', title: 'Void box calibration', date: '1993-02-18', cls: 'RESTRICTED', frames: 31, held: 'Cold store 1', note: 'Equipment absent from the station inventory.' },
  { ref: '08-B09', type: 'REEL', title: 'Forestry track, graded', date: '1992-10-02', cls: 'DECLASSIFIED', frames: 8, held: 'Bay 3', note: 'Track recorded as decommissioned 1984.' },
  { ref: '09-D17', type: 'REEL', title: 'Casting bench, unattributed', date: 'UNDATED', cls: 'WITHHELD', frames: 23, held: 'Cold store 2', note: 'Withheld in full. Appeal lodged.' },

  { ref: '44-B', type: 'PETITION', title: 'Archive petition, Vantage holdings', date: '2026-02-12', cls: 'DECLASSIFIED', frames: null, held: 'MZ-ARCHIVE', note: 'Granted in part. Basis for this release.' },
  { ref: '44-C', type: 'PETITION', title: 'Appeal against withholding, reel 09-D17', date: '2026-04-30', cls: 'PARTIAL', frames: null, held: 'MZ-ARCHIVE', note: 'Outstanding. No date listed for determination.' },
  { ref: '41-A', type: 'PETITION', title: 'Consent schedule disclosure', date: '2025-09-08', cls: 'WITHHELD', frames: null, held: 'MZ-ARCHIVE', note: 'Refused: records destroyed before the request.' },
  { ref: '39-K', type: 'PETITION', title: 'Staff allocation records, blocks 1–4', date: '2025-06-19', cls: 'PARTIAL', frames: null, held: 'MZ-ARCHIVE', note: 'Departmental codes released; names redacted.' },
  { ref: '38-F', type: 'PETITION', title: 'Signals occupancy summaries 1992', date: '2025-03-27', cls: 'DECLASSIFIED', frames: null, held: 'MZ-ARCHIVE', note: 'Granted in full. Billing records, unclassified.' },
  { ref: '46-A', type: 'PETITION', title: 'Bearing 041 far-end identification', date: '2026-07-14', cls: 'WITHHELD', frames: null, held: 'MZ-ARCHIVE', note: 'Refused on national security grounds.' },

  { ref: 'RB/93/114', type: 'MANIFEST', title: 'Disposal authority, consent schedules', date: '1993-04-14', cls: 'PARTIAL', frames: null, held: 'Deposit 2', slug: 'mz-0231', note: 'Class C-4 cited. Single signature. No witness.' },
  { ref: 'RB/95/007', type: 'MANIFEST', title: 'Furniture disposal, decommissioning', date: '1995-08-03', cls: 'DECLASSIFIED', frames: null, held: 'Lot 11', slug: 'mz-0519', note: 'Lot 11 includes the briefing room wall map.' },
  { ref: 'RB/94/220', type: 'MANIFEST', title: 'Optical bay clearance', date: '1994-10-29', cls: 'RESTRICTED', frames: null, held: 'Cold store 1', note: 'Describes reel 00-A94 as an "optical target" reel.' },
  { ref: 'RB/92/061', type: 'MANIFEST', title: 'Signals equipment transfer', date: '1992-12-01', cls: 'DECLASSIFIED', frames: null, held: 'Bay 3', note: 'Four dishes listed. Apertures not recorded.' },
  { ref: 'RB/91/033', type: 'MANIFEST', title: 'Mast 3 installation certificate', date: '1989-05-16', cls: 'DECLASSIFIED', frames: null, held: 'Bay 3', slug: 'mz-0114', note: 'Retrofit. Two years after commissioning.' },
  { ref: 'RB/96/002', type: 'MANIFEST', title: 'Terminal site clearance', date: '1996-01-09', cls: 'WITHHELD', frames: null, held: 'Unknown', note: 'Referenced in correspondence; not produced.' },

  { ref: 'DL/3-5', type: 'LOG', title: 'Duty log, housing unit 3/5', date: '1991-02-01', cls: 'DECLASSIFIED', frames: null, held: 'Bay 3', slug: 'mz-0114', note: 'Continuous recording, 744h. Car park, east bays.' },
  { ref: 'DL/3-6', type: 'LOG', title: 'Duty log, housing unit 3/6', date: '1991-02-01', cls: 'DECLASSIFIED', frames: null, held: 'Bay 3', slug: 'mz-0114', note: 'Continuous recording, 744h. Car park, west bays.' },
  { ref: 'SO/92/07', type: 'LOG', title: 'Channel occupancy, 041 link', date: '1992-07-23', cls: 'DECLASSIFIED', frames: null, held: 'Signals', slug: 'mz-0307', note: 'Eleven heavy days, eleven casting dates.' },
  { ref: 'SO/92/F', type: 'LOG', title: 'Signals fault book', date: '1992-07-23', cls: 'PARTIAL', frames: null, held: 'Signals', slug: 'mz-0307', note: 'Bearing column struck through and rewritten.' },
  { ref: 'CN/94/11', type: 'LOG', title: 'Conservation monitoring, reel 00-A94', date: '1994-11-07', cls: 'RESTRICTED', frames: null, held: 'Conservation', slug: 'mz-0442', note: 'A-D 1.8 on receipt, 2.6 current. Arrested.' },
  { ref: 'EO/91/02', type: 'LOG', title: 'Estates allocation sheet, block 2', date: '1991-02-11', cls: 'PARTIAL', frames: null, held: 'Estates', slug: 'mz-0603', note: 'Departmental flag added in a second hand.' },
  { ref: 'EO/90/14', type: 'LOG', title: 'Housing points register', date: '1990-09-30', cls: 'DECLASSIFIED', frames: null, held: 'Estates', note: 'Scheme documented. Not applied to upper floors.' },
  { ref: 'TH/95/01', type: 'LOG', title: 'Thermal anomaly report, blocks 1–4', date: '1995-02-02', cls: 'RESTRICTED', frames: null, held: 'Estates', slug: 'mz-0603', note: 'Roof-void readings above ambient, blocks 1 and 4.' },
  { ref: 'NL/94/11', type: 'LOG', title: 'Recovery team night log', date: '1994-11-07', cls: 'RESTRICTED', frames: null, held: 'Conservation', slug: 'mz-0442', note: 'Records the inspection run and its authority.' },
  { ref: 'GH/91/08', type: 'LOG', title: 'Gatehouse transcription sheets', date: '1991-08-01', cls: 'PARTIAL', frames: null, held: 'Bay 3', slug: 'mz-0114', note: 'Six ruled columns. The sixth is blank throughout.' },
  { ref: 'BR/93/04', type: 'LOG', title: 'Review board minute, item 4', date: '1993-04-26', cls: 'PARTIAL', frames: null, held: 'Deposit 2', slug: 'mz-0231', note: '"Discussed; no action." Eleven days before disposal.' }
];

export const LEDGER_STATS = {
  records: LEDGER.length,
  reels: LEDGER.filter((r) => r.type === 'REEL').length,
  frames: LEDGER.reduce((n, r) => n + (r.frames ?? 0), 0),
  withheld: LEDGER.filter((r) => r.cls === 'WITHHELD').length
};
