/** Stable anchor id for a section heading, shared by the rail and the prose. */
export const headingId = (text) =>
  'sec-' +
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** The section headings of an article, in document order. */
export const sectionsOf = (blocks) =>
  blocks.filter((b) => b.t === 'h').map((b) => ({ id: headingId(b.x), label: b.x }));
