// Long-form file pages. `[[double brackets]]` mark passages that render as
// clickable redaction blocks and open on click.
//
// Block types: h (subhead), p (paragraph), pull (pull quote), note (margin
// annotation), side (boxed explainer), transcript, evidence (log table),
// plate (halftone figure).

const U = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const ARTICLES = [
  {
    id: 'MZ-0114',
    slug: 'observation-mast',
    title: 'Observation Mast',
    kicker: 'Perimeter Surveillance',
    standfirst:
      'Six camera housings on one mast at the Vantage perimeter. The station described them as intruder detection. The duty logs describe something else: four units that slept, and two that never did.',
    byline: 'Microfilm Zero desk',
    dateline: 'Vantage Station, perimeter post 3',
    src: U('photo-1618482914248-29272d021005'),
    srcAspect: 900 / 1353,
    header: {
      reel: '02-C17',
      date: '14 MAR 1991',
      tag: 'DECLASSIFIED',
      status: 'Released in full',
      accession: '1991.03.14 / MZ-ARCHIVE',
      custody: 'Bay 3 → petition 44-B → MZ-ARCHIVE',
      classification: 'DECLASSIFIED // RESTRICTED ACCESS'
    },
    facts: [
      { k: 'Housings on mast 3', v: '6' },
      { k: 'Aimed at the staff car park', v: '2' },
      { k: 'Continuous recording, one month', v: '1,488 h' },
      { k: 'Transcription sheets held', v: '194' },
      { k: 'Entries in the sixth column', v: '0' },
    ],
    blocks: [
      { t: 'p', x: 'The mast stands 11.4 metres inside the northern fence line, on a concrete pad poured two years after the station opened. It carries six housings. Four are aimed along the approach road. Two are aimed, at a depression of roughly twenty degrees, at the staff car park.' },
      { t: 'p', x: 'That asymmetry is the whole story. A perimeter system points outward. This one spent a third of its optical budget looking at where its own employees left their cars.' },
      { t: 'note', x: 'Mast pad poured 1989. Station commissioned 1987. The mast is a retrofit.' },
      { t: 'p', x: 'Vantage filed the installation under intruder detection, schedule 9. The schedule authorises coverage of "approaches, boundaries and points of ingress". A car park inside the fence is none of those things. When we put this to the ministry, the response was that the car park constituted [[an interior point of ingress by virtue of adjoining the Bay 7 service corridor]]. The car park does not adjoin the Bay 7 service corridor. It is separated from it by the machine shop and ninety metres of open ground.' },
      { t: 'h', x: 'The duty cycle' },
      { t: 'p', x: 'Recording capacity at the station was finite and the logs show it being rationed. The four road-facing units ran on a motion trigger with a sixty-second tail. Across the sample month they recorded 41 hours between them, which for a rural approach is unremarkable.' },
      { t: 'p', x: 'The two car-park units ran continuous. In the same month they recorded 1,488 hours — the entire month, both units, without a gap. Continuous recording was expensive enough that the station rationed it everywhere else, including at the main gate. Somebody decided this was worth the tape.' },
      { t: 'evidence', title: 'Housing register, mast 3', rows: [
        { k: 'Unit 3/1', v: 'Approach road, north. Motion trigger. 9h 12m' },
        { k: 'Unit 3/2', v: 'Approach road, centre. Motion trigger. 11h 40m' },
        { k: 'Unit 3/3', v: 'Approach road, south. Motion trigger. 8h 51m' },
        { k: 'Unit 3/4', v: 'Gatehouse apron. Motion trigger. 11h 17m' },
        { k: 'Unit 3/5', v: 'Staff car park, east bays. Continuous. 744h' },
        { k: 'Unit 3/6', v: 'Staff car park, west bays. Continuous. 744h' }
      ] },
      { t: 'p', x: 'Tape was the constraint. The station held a rolling stock of 180 cassettes and the stores ledger shows it reordering monthly, always to the same figure. Two units running continuous consume roughly 62 cassettes a month between them on the station\u2019s own recording standard. That is a third of the stock, committed permanently, to two cameras looking at parked cars.' },
      { t: 'pull', x: 'A perimeter system points outward. This one spent a third of its optical budget looking at where its own employees left their cars.' },
      { t: 'h', x: 'What the sweeps recorded' },
      { t: 'p', x: 'Sweep summaries survive for eleven months of 1990 and the first quarter of 1991. They are terse — a date, a unit, a count of events, an operator initial. The road units log what you would expect of a rural approach: delivery vehicles, a postal van, one recurring entry for deer.' },
      { t: 'p', x: 'The car-park summaries log arrivals and departures by registration. Not events. Registrations. Somebody sat and transcribed number plates off a continuous feed, every day, for at least sixteen months, and filed the result as a perimeter security product.' },
      { t: 'p', x: 'There is no equivalent record for the road units. Their sweep summaries give a count and nothing else \u2014 "14 events, no action" is a typical entry. The difference in treatment is not subtle. One set of cameras produced numbers; the other produced a list of named vehicles that could be matched, by anyone holding the staff register, to named people.' },
      { t: 'plate', src: U('photo-1615726719242-47aaf6305fa3'), caption: 'Northern fence line, 200m east of mast 3. The wire is original to the 1987 build; the mast pad is not. Nothing on this run carries a sensor loop.' },
      { t: 'plate', src: U('photo-1470880587080-599f3e4f0913'), caption: 'Covered parking of the period and construction. The Vantage staff car park was open-sided but structurally identical: two rows of bays under a poured deck, lit on a single circuit.' },
      { t: 'p', x: 'Transcription is slow work. At the rate the sheets suggest — around forty vehicles a day, both directions — somebody was spending the better part of an hour on this daily. The gatehouse establishment for 1990 was four operators across three shifts. None of their job descriptions mentions it.' },
      { t: 'transcript', title: 'Duty log, unit 3/5 — operator handover', lines: [
        { time: '06:00', who: 'OUTGOING', x: 'Nothing on three-five. Same as yesterday.' },
        { time: '06:00', who: 'INCOMING', x: 'Still continuous?' },
        { time: '06:01', who: 'OUTGOING', x: 'Still continuous. Don’t touch it, it’s not ours.' },
        { time: '06:01', who: 'INCOMING', x: 'Whose is it?' },
        { time: '06:02', who: 'OUTGOING', x: 'Seven.' }
      ] },
      { t: 'p', x: 'Bay 7 is the optical bay. It had no security remit, no perimeter role and, on the published organisational chart, no operational relationship to the gatehouse at all. It is also where the casting programme ran, and where reel 00-A94 was recovered four years later.' },
      { t: 'side', label: 'Right of reply', title: 'What the ministry says', paras: [
        'We put the duty-cycle disparity and the transcription sheets to the ministry in writing on 04 JUN 2026 and again on 21 JUL 2026. The response, in full, was that camera tasking at decommissioned establishments was "a matter for local management at the time" and that no central record of tasking authority is held.',
        'We also asked who instructed the gatehouse to transcribe registrations, and under what authority. That question was not answered. The ministry does not dispute that the transcription took place, or that the sheets are genuine.'
      ] },
      { t: 'h', x: 'The sixth column' },
      { t: 'p', x: 'The transcription sheets are ruled for six columns. Five are filled: date, time, direction, registration, operator initial. The sixth is headed [[BAY]] and is blank on every sheet we hold — one hundred and ninety-four of them.' },
      { t: 'p', x: 'A ruled column that is never filled is not an oversight. Somebody printed the sheets with that column on them, which means at the point of design there was an intention to record which bay a given vehicle belonged to. Either that intention was abandoned, or the column was filled on a copy we do not have.' },
      { t: 'p', x: 'We asked the ministry whether the column had ever been completed and whether a second copy of the sheets exists. The answer to both was that no such records are held. That is not the same as saying they never existed, and we put that distinction to them twice.' },
      { t: 'evidence', title: 'Transcription sheet analysis', rows: [
        { k: 'Sheets held', v: '194 (NOV 1989 – MAR 1991)' },
        { k: 'Sheets with gaps', v: '0' },
        { k: 'Mean entries per sheet', v: '38.6 vehicles' },
        { k: 'Column 6 completions', v: '0 of 194' },
        { k: 'Distinct operator initials', v: '4' },
        { k: 'Sheets initialled outside the gatehouse establishment', v: '0' }
      ] },
      { t: 'p', x: 'The four initials match the four gatehouse operators on the 1990 establishment. So the transcription was done by the people who worked there, on their own shifts, in addition to their listed duties, for sixteen months, into a form somebody else had designed.' },
      { t: 'transcript', title: 'Gatehouse supervisor, interviewed 09 MAY 2026', lines: [
        { time: 'Q', who: 'MZ', x: 'Who asked you to write down the registrations?' },
        { time: 'A', who: 'SUPERVISOR', x: 'It came down as a standing instruction. Paper, not verbal.' },
        { time: 'Q', who: 'MZ', x: 'Signed by whom?' },
        { time: 'A', who: 'SUPERVISOR', x: 'It wasn’t signed. It had the department code at the top.' },
        { time: 'Q', who: 'MZ', x: 'Do you remember the code?' },
        { time: 'A', who: 'SUPERVISOR', x: 'Three letters. I saw it on the stores dockets too. I’m not going to guess at it now.' }
      ] },
      { t: 'note', x: 'The same three-character code appears on the Bay 7 stores requisitions and on the estates allocation sheets for blocks 1, 2 and 4.' },
      { t: 'p', x: 'The mast is a small thing. It matters because it is the earliest dated object we hold that shows Bay 7 reaching outside its own walls and being obeyed — quietly, on paper, by people who were never told why, and who kept the sheets going for sixteen months because nobody told them to stop.' }
    ],
    related: ['MZ-0307', 'MZ-0603']
  },
  {
    id: 'MZ-0231',
    slug: 'the-paper-trail',
    title: 'The Paper Trail',
    kicker: 'Consent & Review',
    standfirst:
      'The consent schedules for the Vantage casting programme were destroyed on authority of a memo that was itself supposed to be destroyed. A reviewer kept his copy. This is what it says.',
    byline: 'Microfilm Zero desk',
    dateline: 'Review board archive, second deposit',
    src: U('photo-1562654501-a0ccc0fc3fb1'),
    srcAspect: 900 / 506,
    header: {
      reel: '02-D03',
      date: '02 JUN 1993',
      tag: 'PARTIAL',
      status: 'Redactions upheld',
      accession: '1993.06.02 / MZ-ARCHIVE',
      custody: 'Reviewer personal file → deposit 2 → MZ-ARCHIVE',
      classification: 'PARTIAL RELEASE // REDACTIONS UPHELD'
    },
    facts: [
      { k: 'Consent schedules surviving', v: '0' },
      { k: 'Age at disposal', v: '4 yrs of a 25-yr class' },
      { k: 'Signatures on the authority', v: '1 of 2 required' },
      { k: 'Classified burn, 14 APR 1993', v: '31.4 kg' },
      { k: 'Implied sheets against casts', v: '~7,130 v <400' },
    ],
    blocks: [
      { t: 'p', x: 'A consent schedule is a dull document. It lists a subject, a procedure, a date, and the signature of the person agreeing to the second on behalf of the first. The Vantage programme generated one for every cast taken. None of them survive.' },
      { t: 'p', x: 'They were destroyed on 14 April 1993 under a disposal authority signed by the chair of the internal review board. The authority cited routine schedule expiry. Schedules of that class expire after twenty-five years. These were four years old.' },
      { t: 'note', x: 'Disposal authority ref. RB/93/114. Cites schedule class C-4. C-4 retention is 25 years.' },
      { t: 'p', x: 'Class C-4 disposal also requires two signatures and a named witness. The authority carries one signature and no witness. On its own that is a procedural failure. In context it is the only way the document could have been produced at all, because a second signatory would have had to read what they were agreeing to.' },
      { t: 'h', x: 'The memo that survived' },
      { t: 'p', x: 'Two weeks before the disposal, the board circulated a memo to five named reviewers. Four returned their copies for destruction. The fifth did not. His copy reached this archive in the second deposit, inside a folder of unrelated expenses, which is very likely why it was never found.' },
      { t: 'p', x: 'The memo runs to a page and a half. Most of it is procedural. The operative paragraph reads: the board notes that the consent instrument in use since 1989 describes the procedure as [[a surface impression for calibration purposes]] and does not describe the retention, reproduction or onward transmission of the resulting article. The board is invited to consider whether the instrument is capable of being relied upon.' },
      { t: 'pull', x: 'The board is invited to consider whether the instrument is capable of being relied upon.' },
      { t: 'p', x: 'That sentence is the board asking itself, in writing, whether the consent it had been collecting for four years was worth anything. The minute of the meeting that followed records the item as [[discussed; no action]]. Eleven days later the schedules were in the incinerator.' },
      { t: 'p', x: 'Four reviewers returned their copies. We have written to all four. Two have died. One declined through a solicitor. The fourth replied in a single line: that he did not recall the memo and would not be commenting further. None of them disputes that it was circulated.' },
      { t: 'evidence', title: 'Disposal authority RB/93/114', rows: [
        { k: 'Signed', v: '14 APR 1993, board chair' },
        { k: 'Class cited', v: 'C-4 (25-year retention)' },
        { k: 'Age of records', v: '4 years' },
        { k: 'Items destroyed', v: 'Consent schedules, 1989–1993, quantity not stated' },
        { k: 'Countersignature', v: 'None. C-4 disposal requires two.' },
        { k: 'Witness', v: 'None recorded' }
      ] },
      { t: 'plate', src: U('photo-1768119997334-bc76e6f60e7d'), caption: 'Card index, second deposit. The consent schedules were held in drawers of this pattern, filed by subject number. The drawers survive; the contents do not.' },
      { t: 'h', x: 'What "surface impression" conceals' },
      { t: 'p', x: 'The phrase is doing heavy work. A surface impression for calibration purposes describes taking a mould. It does not describe casting that mould in a dispersive polymer, photographing the result under a hard key light, and retaining the photographs on a reel that the station later tried to destroy.' },
      { t: 'p', x: 'Nor does it describe the article outliving the consent. The cast recovered in frame 001 of reel 00-A94 has a fully modelled ear and closed, modelled lids. Whoever sat for it agreed to a surface impression. There is no instrument anywhere in this archive by which they agreed to the rest, and after 14 April 1993 there is no instrument by which anyone can show what they agreed to at all.' },
      { t: 'side', label: 'Method', title: 'How we know what the schedules said', paras: [
        'We have never seen a Vantage consent schedule. What we have is the blank: a printer’s proof of the 1989 form, held in the stationery file, which survived because it was filed as a purchasing record rather than as a consent record.',
        'The proof carries the wording quoted in the board memo, in the same order, and a signature block for one subject and one witness. It does not carry a retention clause, a reproduction clause, or any reference to photography. That is the basis on which we say the instrument was silent — not the board’s summary of it, but the form itself.'
      ] },
      { t: 'h', x: 'Weighing the ash' },
      { t: 'p', x: 'The destruction itself left a record, which the people who ordered it appear not to have considered. Disposal at Vantage was not a bin and a match. Classified waste went through a shredder, into sacks, onto a weighbridge, and then into the incinerator, and every stage of that produced paperwork for somebody else\u2019s budget.' },
      { t: 'p', x: 'The station incinerator kept a weight log, because disposal was billed by the kilo. On 14 April 1993 it records a single classified burn of 31.4kg against the review board cost centre.' },
      { t: 'p', x: 'Paper of the weight used for the schedules runs about 4.4 grams a sheet. That puts the burn somewhere near seven thousand sheets. The casting programme, on the station’s own figures, took fewer than four hundred casts.' },
      { t: 'evidence', title: 'Incinerator weight log, 14 APR 1993', rows: [
        { k: 'Burn reference', v: 'INC/93/0414-C' },
        { k: 'Cost centre', v: 'Review board' },
        { k: 'Classified weight', v: '31.4 kg' },
        { k: 'Sheet weight (80gsm A4)', v: '4.4 g' },
        { k: 'Implied sheets', v: '≈7,130' },
        { k: 'Casts recorded by the programme', v: '<400' },
        { k: 'Schedule length', v: '1 sheet per subject' }
      ] },
      { t: 'p', x: 'So either the schedules ran to eighteen sheets a subject, which nobody has ever suggested, or a great deal more than the consent schedules went into the incinerator that day under a single line in a ledger. The disposal authority names one class of record. The weight says otherwise.' },
      { t: 'plate', src: U('photo-1715522594847-67c90b5b8667'), caption: 'Cross-cut shred waste of the kind produced by the station’s pre-incineration shredder. Classified material was shredded before burning; the weight log records the combined load.' },
      { t: 'transcript', title: 'Review board, minute extract — 26 APR 1993', lines: [
        { time: 'ITEM 4', who: 'CHAIR', x: 'Item four, the consent instrument. Noted.' },
        { time: 'ITEM 4', who: 'MEMBER', x: 'Noted, or resolved?' },
        { time: 'ITEM 4', who: 'CHAIR', x: 'Noted.' },
        { time: 'ITEM 4', who: 'MEMBER', x: 'I’d like it recorded that I asked.' },
        { time: 'ITEM 4', who: 'CHAIR', x: 'It is recorded that you asked.' }
      ] },
      { t: 'p', x: 'The member who asked is the reviewer who kept his copy. He is now in his eighties. He spoke to us twice, on condition that we did not name him and did not describe where he lives.' },
      { t: 'transcript', title: 'Reviewer, interviewed 17 MAR 2026', lines: [
        { time: 'Q', who: 'MZ', x: 'Why did you keep the memo?' },
        { time: 'A', who: 'REVIEWER', x: 'Because I read it twice and it still said the same thing.' },
        { time: 'Q', who: 'MZ', x: 'Did you know the schedules were going to be destroyed?' },
        { time: 'A', who: 'REVIEWER', x: 'Not on the day. I knew within the month.' },
        { time: 'Q', who: 'MZ', x: 'Did you report it?' },
        { time: 'A', who: 'REVIEWER', x: 'To whom? The chair signed it.' }
      ] },
      { t: 'note', x: 'The redactions on this file are upheld on personal-data grounds. We do not contest them.' },
      { t: 'p', x: 'He is the reason the memo exists to be read. Everything else in this file is an absence: a form nobody kept, a countersignature nobody gave, a witness nobody named, and thirty-one kilos of something that was billed to the review board and never itemised.' }
    ],
    related: ['MZ-0442', 'MZ-0114']
  },
  {
    id: 'MZ-0307',
    slug: 'relay-station',
    title: 'Relay Station',
    kicker: 'Signals',
    standfirst:
      'The dish array above the treeline carried Bay 7 traffic on a bearing of 041 degrees. There is no ministry installation on that bearing. There is, however, a fenced compound that appears on no published list.',
    byline: 'Microfilm Zero desk',
    dateline: 'Ridge above Vantage, 2.1km NNE',
    src: U('photo-1557174360-3f4f7c724501'),
    srcAspect: 900 / 1350,
    header: {
      reel: '03-A08',
      date: '19 SEP 1992',
      tag: 'DECLASSIFIED',
      status: 'Released in full',
      accession: '1992.09.19 / MZ-ARCHIVE',
      custody: 'Signals office → petition 44-B → MZ-ARCHIVE',
      classification: 'DECLASSIFIED // RESTRICTED ACCESS'
    },
    facts: [
      { k: 'Dishes on the pad', v: '4' },
      { k: 'The odd one', v: '1.8 m, bearing 041°' },
      { k: 'Heavy days matching casting dates', v: '11 of 11' },
      { k: 'Track status on the register', v: 'Closed since 1984' },
      { k: 'Petition 46-A', v: 'Refused' },
    ],
    blocks: [
      { t: 'p', x: 'Microwave links are honest about geometry. A dish is a statement of intent: it points at exactly one thing, and anyone standing under it with a compass can work out what.' },
      { t: 'p', x: 'The Vantage array carries four dishes. Three are aligned on the regional trunk at bearings between 210 and 230 degrees, which is where the trunk is. The fourth sits on 041 degrees and is 1.8 metres across — larger than the other three, which is what you fit when the far end is either distant or deliberately low-powered.' },
      { t: 'note', x: 'Bearing measured from the pad datum, corrected for local declination (4.1° W, 1992).' },
      { t: 'p', x: 'The signals equipment transfer manifest of December 1992 lists four dishes and records no apertures at all. That omission is the only entry in the document that required a decision. Every other column is filled.' },
      { t: 'h', x: 'The far end' },
      { t: 'p', x: 'Projected out, 041 degrees clears the ridge at 2.1 kilometres and passes over open forestry for a further nine. The published list of ministry installations has nothing in that corridor. The forestry commission map has nothing in that corridor either, other than a service track marked as decommissioned in 1984.' },
      { t: 'p', x: 'The track is not decommissioned. Aerial survey from 1992 shows it graded, and shows at its end a compound of roughly 0.4 hectares with a fence, a hardstanding, and what the survey interpreter recorded as [[two single-storey structures and a lattice mast of approximately 30m]].' },
      { t: 'pull', x: 'A dish is a statement of intent: it points at exactly one thing, and anyone standing under it with a compass can work out what.' },
      { t: 'evidence', title: 'Dish register, Vantage pad', rows: [
        { k: 'Dish 1', v: '1.2m · bearing 214° · regional trunk · tracking mount' },
        { k: 'Dish 2', v: '1.2m · bearing 221° · regional trunk · tracking mount' },
        { k: 'Dish 3', v: '1.2m · bearing 229° · regional trunk · tracking mount' },
        { k: 'Dish 4', v: '1.8m · bearing 041° · unlisted · fixed pedestal' },
        { k: 'Apertures on the transfer manifest', v: 'Not recorded' },
        { k: 'Bearings on the transfer manifest', v: 'Not recorded' }
      ] },
      { t: 'plate', src: U('photo-1526666923127-b2970f64b422'), caption: 'Dish of comparable aperture, unrelated site, included for scale. The Vantage 041 unit is 1.8m against 1.2m for the three trunk dishes on the same pad.' },
      { t: 'p', x: 'A fixed pedestal matters more than the aperture. The three trunk dishes sit on tracking mounts, because a trunk link is realigned when the far end moves or a new hop is added. Dish 4 was aimed once and bolted. Whoever installed it knew the far end would never move, which means the far end already existed when the dish went up.' },
      { t: 'h', x: 'Traffic' },
      { t: 'p', x: 'The signals office kept a monthly channel-occupancy summary for billing. It is the least interesting document in the station and it is the one that gives the programme away.' },
      { t: 'p', x: 'Occupancy on the three trunk dishes is flat, as you would expect of administrative traffic — payroll, stores, the weekly returns, a predictable spike at month end. Occupancy on the 041 link is not flat. It sits near zero for weeks and then spikes, and the spikes are not random.' },
      { t: 'evidence', title: '041 link occupancy against Bay 7 casting dates, 1992', rows: [
        { k: '11 FEB', v: 'Casting session logged. Link occupancy termed "heavy".' },
        { k: '12 FEB', v: 'No session. Occupancy nil.' },
        { k: '19 MAR', v: 'Casting session logged. Occupancy "heavy".' },
        { k: '07 MAY', v: 'Casting session logged. Occupancy "heavy".' },
        { k: '08 MAY', v: 'No session. Occupancy nil.' },
        { k: '23 JUL', v: 'Casting session logged. Occupancy "heavy".' },
        { k: 'Correlation', v: '11 of 11 heavy days fall on a logged casting date.' }
      ] },
      { t: 'p', x: 'Eleven for eleven. Whatever came out of Bay 7 on a casting day went up the mast the same day, on a bearing that points at a compound the ministry has never named, over a track that was supposed to have been closed eight years earlier.' },
      { t: 'p', x: 'There is no heavy day in the record that does not correspond to a casting session, and no casting session that does not produce one. A link used for anything else — maintenance, testing, weather — would show noise. This one shows none.' },
      { t: 'p', x: 'The billing summaries were retained because they were unclassified. Nobody reviewing the station\u2019s holdings for release appears to have considered that an invoice for channel time is also a record of when the channel was used, and against what. Petition 38-F was granted in full without argument.' },
      { t: 'side', label: 'Method', title: 'How the bearing was fixed', paras: [
        'The bearing is not taken off the photograph. It is taken off the concrete. The pad survives, and so do the four bolt patterns; each dish sat on a flange whose orientation is fixed by the bolt circle and a keyway cast into the plinth.',
        'We surveyed the pad in April 2026 with a gyrotheodolite, referenced to two national grid marks 1.4km apart, and corrected for the 1992 declination rather than today’s. Dish 4’s keyway gives 041° ± 0.4°. The photograph is corroboration, not the measurement.'
      ] },
      { t: 'h', x: 'A track that was closed' },
      { t: 'p', x: 'We walked the corridor in May 2026. The track is metalled for the first 400 metres, then becomes graded hardcore, and it is maintained: the drainage is clear, the verges are cut back to a width that takes a lorry, and there are no windfalls across it in a stand of conifer that has not been thinned since the nineties.' },
      { t: 'p', x: 'At nine kilometres there is a gate, a fence in good order, and a sign giving a telephone number with no name against it. We called the number. It rang out. We wrote to the forestry commission asking who maintains a track they record as decommissioned, and received a reply stating that the section in question was [[transferred out of commission management in 1984 and is not held on our asset register]].' },
      { t: 'p', x: 'Transferred to whom is the question the reply does not answer, and the commission told us it does not know.' },
      { t: 'plate', src: U('photo-1621679613349-a842e155e97c'), caption: 'The approach, 1.6km from the gate. Metalled surface, cut verges, clear drainage — on a route the forestry commission records as closed since 1984.' },
      { t: 'transcript', title: 'Signals office, fault report — 23 JUL 1992', lines: [
        { time: '14:02', who: 'OPERATOR', x: 'Four-one is running hot again. Want me to log it?' },
        { time: '14:06', who: 'SUPERVISOR', x: 'Log it as trunk.' },
        { time: '14:06', who: 'OPERATOR', x: 'It isn’t trunk.' },
        { time: '14:09', who: 'SUPERVISOR', x: 'Log it as trunk.' }
      ] },
      { t: 'p', x: 'The fault was logged as trunk. It is the only entry in the fault book where the bearing column has been struck through and rewritten, and the rewriting is in a different hand from the entry.' },
      { t: 'transcript', title: 'Forestry commission, telephone note — 02 JUN 2026', lines: [
        { time: 'Q', who: 'MZ', x: 'Who cuts the verges on the section past the gate?' },
        { time: 'A', who: 'COMMISSION', x: 'Not us. It’s off our register.' },
        { time: 'Q', who: 'MZ', x: 'Somebody is cutting them.' },
        { time: 'A', who: 'COMMISSION', x: 'I can see that from the photographs you sent.' },
        { time: 'Q', who: 'MZ', x: 'Can you tell me who it was transferred to in 1984?' },
        { time: 'A', who: 'COMMISSION', x: 'The field is blank. I’ve looked twice.' }
      ] },
      { t: 'note', x: 'Petition 46-A, seeking identification of the 041 far end, was refused on national security grounds in July 2026.' },
      { t: 'p', x: 'A blank field, a struck-through column, a manifest with the apertures left out. Three separate offices, over thirty-four years, each declining to write down the one thing that would have made the link traceable.' }
    ],
    related: ['MZ-0519', 'MZ-0114']
  },
  {
    id: 'MZ-0442',
    slug: 'projection-test',
    title: 'Projection Test',
    kicker: 'Materials Analysis',
    standfirst:
      'Reel 00-A94 was run once, for inspection, under a reader lamp that should never have been allowed near it. The chemistry of that decision is documented here, and it is close to irreversible.',
    byline: 'Microfilm Zero desk',
    dateline: 'Conservation bench, MZ-ARCHIVE',
    src: U('photo-1478720568477-152d9b164e26'),
    srcAspect: 900 / 600,
    header: {
      reel: '00-A94',
      date: '07 NOV 1994',
      tag: 'RESTRICTED',
      status: 'Access by petition',
      accession: '1994.11.07 / MZ-ARCHIVE',
      custody: 'Bay 7 → recovery team → conservation → MZ-ARCHIVE',
      classification: 'RESTRICTED ACCESS // CONSERVATION HOLD'
    },
    facts: [
      { k: 'A-D on receipt → current', v: '1.8 → 2.6' },
      { k: 'Base shrinkage', v: '0.4% → 1.2%' },
      { k: 'Passes through a gate', v: '1' },
      { k: 'Frames illegible', v: '0 of 118' },
      { k: 'Held since 09 NOV 1994', v: '4°C, 35% RH' },
    ],
    blocks: [
      { t: 'p', x: 'Cellulose triacetate fails by hydrolysis. Water gets into the base, acetyl groups break off as acetic acid, and the acid catalyses more of the same. The reaction feeds itself. The smell of vinegar is the reaction announcing that it has already been running for years.' },
      { t: 'p', x: 'Heat accelerates it. A tungsten reader lamp at the gate of an inspection projector puts the base somewhere near 50°C for as long as the frame sits there. On 07 November 1994 the recovery team ran reel 00-A94 through such a projector, once, to establish what they had. The decision was taken [[on the authority of the recovery lead, without reference to the conservation bench]], which is recorded in the night log and nowhere else.' },
      { t: 'note', x: 'A-D strip reading on receipt: 1.8. Above 1.5 the autocatalytic phase is considered established.' },
      { t: 'p', x: 'An A-D strip is a dye-coated card that changes colour in the presence of acetic acid. It costs pennies and takes twenty-four hours. Nobody ran one before the reel went through the gate. The first reading in the file is dated the following morning.' },
      { t: 'h', x: 'What the run cost' },
      { t: 'p', x: 'Conservation measured the reel on arrival and again at six-month intervals. Free acidity rose fastest in the ninety days after the inspection run and then settled into a slower climb. The shape of that curve is the signature of a thermal insult on a base that was already unstable.' },
      { t: 'p', x: 'Shrinkage tells the same story from a different direction. Acetate contracts as it degrades, and it contracts unevenly: the base goes before the emulsion, so the emulsion has nowhere to go and lifts. A 1.2% shrinkage across a 16mm frame is not visible to the eye. It is catastrophic to a sprocket.' },
      { t: 'evidence', title: 'Conservation monitoring, reel 00-A94', rows: [
        { k: 'On receipt, 07 NOV 1994', v: 'A-D 1.8 · base shrinkage 0.4% · no channelling' },
        { k: '+90 days', v: 'A-D 2.3 · shrinkage 0.9% · channelling at core' },
        { k: '+12 months', v: 'A-D 2.5 · shrinkage 1.1% · emulsion lifting, frames 44–61' },
        { k: '+24 months', v: 'A-D 2.6 · shrinkage 1.2% · arrested after cold storage' },
        { k: 'Current', v: 'A-D 2.6 · stable at 4°C, 35% RH · scanned 4000 dpi' }
      ] },
      { t: 'pull', x: 'The smell of vinegar is the reaction announcing that it has already been running for years.' },
      { t: 'p', x: 'Cold storage arrested it. At 4\u00b0C the reaction rate falls by roughly an order of magnitude for every ten degrees, and the reel has not moved measurably since 1996. Arrest is not repair: the acid already in the base stays there, and every reading taken since is a record of damage that has stopped getting worse rather than damage that has gone away.' },
      { t: 'h', x: 'Frames 44 to 61' },
      { t: 'p', x: 'Those eighteen frames are the worst affected. The emulsion has lifted from the base in a band that runs across the sprocket side, which is where the gate held the film hardest against the heat. They are legible but the scan carries a visible tide line through all of them.' },
      { t: 'p', x: 'Frame 001 — the cast, the ear, the closed lids — is at the head of the reel and was in the gate longest while the operator focused. It is the sharpest frame on the reel and it also carries the highest measured shrinkage of any single frame. Both of those facts have the same cause.' },
      { t: 'evidence', title: 'Frame condition survey, 118 frames', rows: [
        { k: 'Grade A — no visible defect', v: '71 frames' },
        { k: 'Grade B — base fog or light silvering', v: '29 frames' },
        { k: 'Grade C — channelling, legible', v: '15 frames' },
        { k: 'Grade D — emulsion lift, tide line', v: '3 frames (44, 52, 61)' },
        { k: 'Illegible', v: '0 frames' },
        { k: 'Highest single-frame shrinkage', v: 'Frame 001, 1.4%' }
      ] },
      { t: 'p', x: 'Nothing on the reel is illegible, which is worth saying plainly. The inspection run cost the object a great deal of its remaining life and cost the record almost nothing. That is luck rather than judgement, and it is the reason the argument here is about stewardship rather than about lost evidence.' },
      { t: 'plate', src: U('photo-1602404454048-b0243398564e'), caption: 'Acetate strips at comparable A-D readings, conservation reference set. Channelling and emulsion lift of the kind seen in frames 44–61.' },
      { t: 'side', label: 'Method', title: 'Why it was scanned rather than printed', paras: [
        'An optical print would have meant a second pass through a gate and a second thermal load, on stock that had already taken one. The bench refused it.',
        'Everything the public will ever see of 00-A94 comes from a single transmissive flatbed pass at 4000 dpi, made in 1997 with the reel supported on a glass carrier so that no sprocket took any tension. The scan files are the archival record now. The reel itself is a backup that nobody intends to read again.'
      ] },
      { t: 'p', x: 'The tide line through frames 44, 52 and 61 sits across the sprocket margin rather than the image area, which is why the grading calls them legible. On a 16mm frame the margin is where the gate pressure plate bears. The damage is, quite precisely, the shape of the machine that caused it.' },
      { t: 'h', x: 'The haze in the beam' },
      { t: 'p', x: 'The inspection photograph from that day shows a projector throwing a hard cone of light through what looks like smoke. It was described at the time as dust in the room. It is not dust. It is the reel outgassing acetic acid under the lamp, visible because the beam is narrow and the room was dark.' },
      { t: 'p', x: 'That photograph is the only image we hold of reel 00-A94 as a physical object. It is also, in a literal sense, a photograph of the reel being damaged — the visible haze is base material leaving the film and entering the air of the room.' },
      { t: 'p', x: 'The conservator who took delivery the following morning has given us a statement. She describes opening the transit case and being able to smell the reel before she could see it, from about a metre away, which puts the concentration well into the range where the reaction is self-sustaining.' },
      { t: 'transcript', title: 'Recovery team, inspection note — 07 NOV 1994', lines: [
        { time: '19:40', who: 'TECH', x: 'It smells. Strong.' },
        { time: '19:41', who: 'LEAD', x: 'How many frames?' },
        { time: '19:41', who: 'TECH', x: 'A hundred and eighteen. Do you want the whole reel?' },
        { time: '19:42', who: 'LEAD', x: 'Whole reel. Once. Then it goes in the cold box.' },
        { time: '20:31', who: 'TECH', x: 'Done. I wouldn’t do that again.' }
      ] },
      { t: 'plate', src: U('photo-1771146077099-3998ca60a5a2'), caption: 'Bench equipment of the period. Inspection projectors of this class ran an unfiltered tungsten lamp at the gate with no heat-absorbing glass fitted as standard.' },
      { t: 'transcript', title: 'Conservator, statement — 21 APR 2026', lines: [
        { time: 'Q', who: 'MZ', x: 'Would you have authorised the run?' },
        { time: 'A', who: 'CONSERVATOR', x: 'No. I’d have run a strip first and then decided.' },
        { time: 'Q', who: 'MZ', x: 'Would the strip have changed the answer?' },
        { time: 'A', who: 'CONSERVATOR', x: 'At 1.8 it would have changed it to no.' },
        { time: 'Q', who: 'MZ', x: 'How much did the run cost the reel?' },
        { time: 'A', who: 'CONSERVATOR', x: 'Perhaps fifteen years of shelf life. Perhaps more. It is not a number I can stand behind.' }
      ] },
      { t: 'note', x: 'The reel has been held at 4°C and 35% RH since 09 NOV 1994. Degradation is arrested, not reversed.' },
      { t: 'p', x: 'They did not do it again. The reel went into cold storage that night and has been scanned rather than projected ever since. One pass, one lamp, ninety minutes — and the whole of the public record of what Bay 7 was doing rests on the frames that survived it.' }
    ],
    related: ['MZ-0231', 'MZ-0603']
  },
  {
    id: 'MZ-0519',
    slug: 'coverage-map',
    title: 'Coverage Map',
    kicker: 'Cartographic Intelligence',
    standfirst:
      'A wall map from the Bay 7 briefing room, carried out in a box of furniture. The pinholes are the document. They cluster in four external sectors where the programme had no authority to operate at all.',
    byline: 'Microfilm Zero desk',
    dateline: 'Bay 7 briefing room, recovered furniture',
    src: U('photo-1524661135-423995f22d0b'),
    srcAspect: 900 / 598,
    header: {
      reel: '04-B22',
      date: 'UNDATED',
      tag: 'DECLASSIFIED',
      status: 'Provenance disputed',
      accession: 'Undated / MZ-ARCHIVE',
      custody: 'Bay 7 briefing room → furniture lot 11 → MZ-ARCHIVE',
      classification: 'DECLASSIFIED // PROVENANCE DISPUTED'
    },
    facts: [
      { k: 'Pinholes on the map', v: '214' },
      { k: 'Outside the authorised area', v: '46, in 4 clusters' },
      { k: 'Across an international boundary', v: '3 clusters' },
      { k: 'Screw-centre discrepancy', v: '2 mm over 1.4 m' },
      { k: 'Ministry measurements to date', v: '0' },
    ],
    blocks: [
      { t: 'p', x: 'The map is a commercial wall chart, the kind sold to schools, mounted on hardboard and screwed to the briefing room wall. It has no markings, no legend, no annotation and no date. It is, on its face, worthless.' },
      { t: 'p', x: 'Held against a raking light it has 214 pinholes.' },
      { t: 'note', x: 'Photographed at 15° raking light, four azimuths, composited. Holes counted twice by separate readers.' },
      { t: 'p', x: 'Pinholes are a record of where pins were, which is a record of what somebody was tracking. They survive the removal of the pins, and of the labels, and of everyone who knew what the labels said. On a map that was stripped before disposal, they are the only thing left.' },
      { t: 'h', x: 'Where the pins were' },
      { t: 'p', x: 'The distribution is not uniform and it is not random. 168 of the 214 holes fall inside the authorised operating area, in a spread consistent with ordinary administrative use over several years — sites, suppliers, the regional trunk, the places any station pins on any wall map.' },
      { t: 'p', x: 'The remaining 46 fall in four tight clusters, all of them outside the authorised area, and three of them across an international boundary. The clusters are tight enough — under 4mm across, which at this scale is about eleven kilometres — that they read as repeated pinning of the same point rather than a spread of separate ones.' },
      { t: 'evidence', title: 'Cluster register', rows: [
        { k: 'Cluster A', v: '17 holes · external sector 2 · 3.1mm spread' },
        { k: 'Cluster B', v: '12 holes · external sector 4 · 2.8mm spread · cross-border' },
        { k: 'Cluster C', v: '11 holes · external sector 4 · 3.9mm spread · cross-border' },
        { k: 'Cluster D', v: '6 holes · external sector 7 · 2.2mm spread · cross-border' },
        { k: 'Inside authorised area', v: '168 holes · diffuse · no clustering' },
        { k: 'Mean hole diameter, clusters', v: '0.71mm' },
        { k: 'Mean hole diameter, elsewhere', v: '0.68mm' }
      ] },
      { t: 'pull', x: 'Pinholes survive the removal of the pins, and of the labels, and of everyone who knew what the labels said.' },
      { t: 'p', x: 'The diameters matter more than they look. A pin pushed into hardboard once leaves a hole the width of the shank. A pin pushed into the same spot repeatedly reams it. The cluster holes are measurably wider than the holes elsewhere on the map, and several of the widest have a slight oval to them, which is what you get when a pin is worked in and out at a shallow angle.' },
      { t: 'plate', src: U('photo-1619468129361-605ebea04b44'), caption: 'Pinning of the kind the holes record. Repeated pinning at one point reams the board; single pinning does not. The cluster holes are 0.71mm against 0.68mm elsewhere.' },
      { t: 'side', label: 'Method', title: 'How the holes were counted', paras: [
        'The map was photographed flat under a raking light at 15° from four azimuths, 90° apart, and the four exposures composited so that a hole casts a shadow in at least two. A surface blemish casts none.',
        'Two readers marked the composite independently without seeing each other’s work. They agreed on 209 holes. The eleven points of disagreement were re-examined under magnification; five were holes, six were paper defects. 214 is the agreed figure and the disputed points are listed in the working file.'
      ] },
      { t: 'h', x: 'Provenance' },
      { t: 'p', x: 'The ministry disputes the provenance of this object. Its position is that the map [[cannot be shown to have hung in Bay 7 rather than in any other room at the station]] and that the holes are [[consistent with ordinary use over an unknown period by unknown persons]].' },
      { t: 'p', x: 'Both statements are technically true. The map came out in furniture lot 11 with no paperwork. We cannot put it on a specific wall by documentation alone. What we can say is that the four screw holes in the hardboard match the four filled screw holes photographed in the Bay 7 briefing room during decommissioning, at the same centres, to within two millimetres.' },
      { t: 'p', x: 'We measured the wall from the decommissioning photographs rather than from the wall, which no longer exists. Each photograph carries a ranging rod, so the scale is recoverable; two independent rectifications gave figures within a millimetre of each other. The working is in the file and we will send it to anyone who asks.' },
      { t: 'evidence', title: 'Screw-centre comparison', rows: [
        { k: 'Map, top-left to top-right', v: '1,184mm' },
        { k: 'Wall, top-left to top-right', v: '1,183mm' },
        { k: 'Map, top-left to bottom-left', v: '742mm' },
        { k: 'Wall, top-left to bottom-left', v: '744mm' },
        { k: 'Diagonal, map', v: '1,397mm' },
        { k: 'Diagonal, wall', v: '1,396mm' },
        { k: 'Maximum discrepancy', v: '2mm across four centres' }
      ] },
      { t: 'p', x: 'Two millimetres across a span of nearly a metre and a half is within the error of a tape measure and a hand drill. It does not prove the map hung there. It does mean that if it hung anywhere else, that room had a fixing pattern identical to Bay 7’s to within the width of a pencil line.' },
      { t: 'plate', src: U('photo-1736117704452-46670dd0c81f'), caption: 'Contour detail at the scale of cluster B. Eleven kilometres is roughly the width of this frame; the whole cluster sits inside it.' },
      { t: 'h', x: 'What it would mean' },
      { t: 'p', x: 'Vantage was authorised to operate inside one area. Three of the four clusters sit outside the state. If the pins recorded operations rather than interests — and a briefing room wall map is not where you track interests — then the programme was running collection in places where it had no legal existence at all.' },
      { t: 'p', x: 'We cannot prove the pins were operations. Nobody can, now. The labels went in a skip with the pins in 1995, and the people who could read them have not answered a letter in three years.' },
      { t: 'p', x: 'The four clusters also sit where you would put a pin if you were tracking something that moved and came back — a route, a vehicle, a person with an address. A supplier gets one pin. A site gets one pin. Seventeen holes reamed into one point over some number of years is a different kind of record.' },
      { t: 'transcript', title: 'Decommissioning, furniture disposal — 03 AUG 1995', lines: [
        { time: 'LOT 11', who: 'CLERK', x: 'There’s a map screwed to the wall in the briefing room.' },
        { time: 'LOT 11', who: 'OFFICER', x: 'Strip it and put it in the lot.' },
        { time: 'LOT 11', who: 'CLERK', x: 'Strip what? It’s covered in pins.' },
        { time: 'LOT 11', who: 'OFFICER', x: 'The pins.' },
        { time: 'LOT 11', who: 'CLERK', x: 'And the labels?' },
        { time: 'LOT 11', who: 'OFFICER', x: 'Especially the labels.' }
      ] },
      { t: 'p', x: 'The clerk who stripped it is the reason the map survived at all. An officer who wanted it gone would have put the hardboard in the skip with the pins. Instead it went into a furniture lot, was sold, and reached this archive thirty-one years later with its holes intact.' },
      { t: 'transcript', title: 'Ministry, written response — 08 AUG 2026', lines: [
        { time: 'Q', who: 'MZ', x: 'Does the department accept the map hung in the Bay 7 briefing room?' },
        { time: 'A', who: 'MINISTRY', x: 'The department is not able to confirm the provenance of items sold at auction.' },
        { time: 'Q', who: 'MZ', x: 'Does it dispute the screw-centre measurements?' },
        { time: 'A', who: 'MINISTRY', x: 'The department has not carried out its own measurements.' },
        { time: 'Q', who: 'MZ', x: 'Will it?' },
        { time: 'A', who: 'MINISTRY', x: 'There are no plans to do so.' }
      ] },
      { t: 'note', x: 'The wall itself was demolished in 1998. The decommissioning photographs are the only surviving record of the fixing centres.' },
      { t: 'p', x: 'So the dispute cannot now be settled by anyone, which is a convenient position to hold and also, on the ministry’s part, an entirely honest one. The wall is gone. The labels are gone. What is left is a school map with 214 holes in it and a measurement nobody is willing to repeat.' }
    ],
    related: ['MZ-0307', 'MZ-0231']
  },
  {
    id: 'MZ-0603',
    slug: 'sector-housing',
    title: 'Sector Housing',
    kicker: 'Photographic Survey',
    standfirst:
      'Four staff blocks under the stacks, shot from the observation mast. Every window in the survey has line of sight to Bay 7. That is not an accident of planning — the blocks were built after the bay.',
    byline: 'Microfilm Zero desk',
    dateline: 'Mast 3, elevation 14m',
    src: U('photo-1714475099702-d8312928df29'),
    srcAspect: 900 / 1350,
    header: {
      reel: '05-F01',
      date: '28 JAN 1995',
      tag: 'DECLASSIFIED',
      status: 'Released in full',
      accession: '1995.01.28 / MZ-ARCHIVE',
      custody: 'Estates office → petition 44-B → MZ-ARCHIVE',
      classification: 'DECLASSIFIED // RESTRICTED ACCESS'
    },
    facts: [
      { k: 'Blocks surveyed', v: '4' },
      { k: 'Upper floors seeing Bay 7', v: 'All four blocks' },
      { k: 'Allocated outside the scheme', v: 'Blocks 1, 2 and 4' },
      { k: 'Roof voids above ambient', v: '2 (blocks 1 and 4)' },
      { k: 'Hatch surveys carried out', v: '0' },
    ],
    blocks: [
      { t: 'p', x: 'The survey is twelve plates, shot in one afternoon from the platform on mast 3, covering four residential blocks on the southern side of the station. It was commissioned by the estates office for a condition report and it does its job: you can count the cracked panels.' },
      { t: 'p', x: 'It also, without meaning to, documents a sight line.' },
      { t: 'h', x: 'The geometry' },
      { t: 'p', x: 'The blocks are four storeys, arranged in a shallow arc. The arc opens toward the works — toward the stacks, and past them, toward the low north range that contains Bay 7. From the upper two floors of all four blocks, the bay roof and its service door are directly visible at a range of between 240 and 410 metres.' },
      { t: 'p', x: 'Residential blocks are normally turned away from an industrial range. Noise, smell, light at night, and the simple fact that nobody wants to look at a stack from their kitchen. These are turned toward it. The estates file gives the reason as [[orientation determined by existing services and the line of the access road]], which would be a good reason if the access road had been there first. It was cut in 1988.' },
      { t: 'note', x: 'Bay 7 commissioned 1987. Blocks 1–4 occupied 1990. Access road cut 1988. The bay predates all of it.' },
      { t: 'evidence', title: 'Line-of-sight register, blocks 1–4', rows: [
        { k: 'Block 1, floors 3–4', v: 'Bay 7 roof and service door visible. 240m.' },
        { k: 'Block 2, floors 3–4', v: 'Bay 7 roof and service door visible. 295m.' },
        { k: 'Block 3, floors 3–4', v: 'Bay 7 roof visible; door obscured by stack 2. 350m.' },
        { k: 'Block 4, floors 3–4', v: 'Bay 7 roof and service door visible. 410m.' },
        { k: 'Floors 1–2, all blocks', v: 'Obscured by boundary planting.' },
        { k: 'Allocation', v: 'Upper floors allocated by department, not by seniority.' }
      ] },
      { t: 'pull', x: 'Residential blocks are normally turned away from an industrial range. These are turned toward it.' },
      { t: 'p', x: 'The boundary planting is the detail that turns this from coincidence into design. Floors 1 and 2 are screened by a belt of poplar along the southern edge. Floors 3 and 4 clear it. The planting schedule dates the belt to 1989 — after the blocks were designed and before they were occupied — and specifies a species that tops out at about nine metres.' },
      { t: 'p', x: 'Nine metres against a four-storey block puts the screen line almost exactly at the second-floor ceiling. Plant poplar for privacy and you plant it in front of the windows you want screened. This belt screens the two floors that cannot see Bay 7 and stops short of the two that can.' },
      { t: 'h', x: 'Allocation' },
      { t: 'p', x: 'The last line of that register is the one that took longest to establish. Housing at Vantage was allocated on a points system — length of service, dependants, distance from previous address. The scheme is documented, it is unremarkable, and it was applied across the estate.' },
      { t: 'p', x: 'It was not applied to the upper floors of blocks 1, 2 and 4. Those flats were allocated by department. The department is not named in the estates file; it is entered as a three-character code, and the code is the same one that appears on the Bay 7 stores requisitions and on the standing instruction the gatehouse supervisor remembers.' },
      { t: 'plate', src: U('photo-1585669670790-bc8848a498fc'), caption: 'Residential blocks of the same period and height at night. Which windows are lit, and when, is the kind of thing a camera on a 14m platform records without anyone deciding that it should.' },
      { t: 'p', x: 'So: people who worked in Bay 7 were housed, by their department rather than by the scheme everyone else used, in the specific flats from which Bay 7 can be seen. Whether that was so they could be reached quickly or so they could be watched is not something the estates file will ever answer.' },
      { t: 'side', label: 'Right of reply', title: 'What residents were told', paras: [
        'We traced eleven former residents of the upper floors and spoke to four. None was told that their flat had been allocated outside the points scheme. Two assumed they had been lucky. One had queried it at the time and been told the allocation was "departmental" with no further explanation.',
        'None reported being asked to observe anything, report anything, or keep any particular hours. Whatever the arrangement was for, it does not appear to have been explained to the people living inside it.'
      ] },
      { t: 'plate', src: U('photo-1625390711106-3728815ebcd9'), caption: 'Concrete of the same period and specification. Blocks 1–4 were poured in situ with the shuttering pattern visible here, and the roof voids were formed the same way.' },
      { t: 'h', x: 'The roof voids' },
      { t: 'p', x: 'In February 1995, three weeks after the photographic survey, the estates office commissioned a thermal report on blocks 1 to 4. The stated reason was a complaint about heating costs. The report is two pages and it is the strangest document in this file.' },
      { t: 'p', x: 'It records roof-void temperatures in blocks 1 and 4 running between 4 and 6 degrees above ambient, sustained, in unheated spaces with no plant in them. Blocks 2 and 3 read at ambient. The surveyor notes the discrepancy, recommends an inspection hatch survey, and the file ends there.' },
      { t: 'evidence', title: 'Thermal anomaly report TH/95/01', rows: [
        { k: 'Block 1, roof void', v: '+5.2°C above ambient, sustained' },
        { k: 'Block 2, roof void', v: 'At ambient' },
        { k: 'Block 3, roof void', v: 'At ambient' },
        { k: 'Block 4, roof void', v: '+4.1°C above ambient, sustained' },
        { k: 'Plant recorded in voids', v: 'None, all four blocks' },
        { k: 'Recommended hatch survey', v: 'Not carried out' },
        { k: 'Blocks with departmental allocation', v: '1, 2 and 4' }
      ] },
      { t: 'p', x: 'We are careful here. A warm roof void has ordinary explanations: a hot-water run in the wrong place, insulation laid short, a flue passing through. We have not been inside these voids, and the buildings came down in 2001.' },
      { t: 'p', x: 'What we will say is that the two warm blocks are two of the three with departmental allocation, that no plant was recorded, that the recommended survey was never done, and that a report which found nothing would normally be closed with a line saying so. This one simply stops.' },
      { t: 'transcript', title: 'Estates office, allocation query — 11 FEB 1991', lines: [
        { time: '—', who: 'CLERK', x: 'Block 2, flat 3/4. Points say it goes to the Hendry family.' },
        { time: '—', who: 'OFFICER', x: 'Not that one. Departmental.' },
        { time: '—', who: 'CLERK', x: 'There’s no departmental flag on the file.' },
        { time: '—', who: 'OFFICER', x: 'Put one on.' }
      ] },
      { t: 'p', x: 'The flag went on. It is still there, in the margin of the allocation sheet, in a different hand and a different ink from the rest of the page.' },
      { t: 'transcript', title: 'Former resident, block 4, interviewed 02 JUN 2026', lines: [
        { time: 'Q', who: 'MZ', x: 'Did you ever go up into the roof void?' },
        { time: 'A', who: 'RESIDENT', x: 'There was a hatch on the landing. It was screwed shut.' },
        { time: 'Q', who: 'MZ', x: 'Screwed, or locked?' },
        { time: 'A', who: 'RESIDENT', x: 'Screwed. Four screws, painted over.' },
        { time: 'Q', who: 'MZ', x: 'Did you ask about it?' },
        { time: 'A', who: 'RESIDENT', x: 'You didn’t, there. You worked out quite quickly what you didn’t ask about.' }
      ] },
      { t: 'note', x: 'Blocks 1–4 were demolished in 2001. No hatch survey was ever carried out.' },
      { t: 'p', x: 'The survey was commissioned to count cracked panels and it did that. Everything else in this file is what the estates office recorded by accident, filed correctly, and never read again — a sight line, an allocation flag in the wrong ink, and four degrees of heat in a space that was screwed shut.' }
    ],
    related: ['MZ-0114', 'MZ-0519']
  }
];

/** Routes address files by id (`mz-0114`); slugs remain for legacy links. */
export const getArticle = (routeId) =>
  ARTICLES.find((a) => a.id.toLowerCase() === String(routeId).toLowerCase());

export const articleById = (id) => ARTICLES.find((a) => a.id === id);

export const legacySlugToId = (slug) => {
  const hit = ARTICLES.find((a) => a.slug === slug);
  return hit ? hit.id.toLowerCase() : null;
};
