// Non-file modules that sit between the case cards in the bento grid.

export const AUDIO_LOG = {
  ref: 'AL/94-11-07',
  title: 'Recovery bench, audio log',
  meta: 'DAT cassette 3 · transcribed 12 FEB 2026',
  lines: [
    '> reel is out of the can. it smells, strongly.',
    '> counting frames. one hundred and eighteen.',
    '> lead says run it once. once only.',
    '> lamp on. there is haze coming off the gate.',
    '> that is not dust. that is the stock.',
    '> frame one. there is a face in frame one.',
    '> it has an ear. write that down.'
  ]
};

export const TIMELINE = {
  title: 'Declassification feed',
  events: [
    { date: '12 FEB 2026', x: 'Petition 44-B granted in part.', cls: 'ok' },
    { date: '02 MAR 2026', x: 'Reels 02-C17, 03-A08, 05-F01 released in full.', cls: 'ok' },
    { date: '19 MAR 2026', x: 'Reel 02-D03 released; redactions upheld.', cls: 'warn' },
    { date: '30 APR 2026', x: 'Appeal lodged against withholding of 09-D17.', cls: 'warn' },
    { date: '14 JUL 2026', x: 'Bearing 041 far-end identification refused.', cls: 'bad' },
    { date: '26 SEP 2026', x: 'Holdings audit completed. 0 frames withheld from released reels.', cls: 'ok' }
  ]
};

export const REDACTION_CHUNKS = {
  title: 'Concealed transcript',
  meta: 'Bay 7 stores requisition · counter-signature block',
  intro: 'Four passages were blacked out before release. Lift them.',
  chunks: [
    { label: 'LINE 04', hidden: 'requisition raised by the optical bay, not by stores' },
    { label: 'LINE 07', hidden: 'delivered to the void box, Bay 7, out of hours' },
    { label: 'LINE 11', hidden: 'counter-signed with the same three-character department code' },
    { label: 'LINE 16', hidden: 'no return of surplus recorded against any of the four orders' }
  ]
};
