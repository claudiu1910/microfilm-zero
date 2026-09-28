import Redacted from '../components/Redacted';

const PATTERN = /\[\[(.+?)\]\]/g;

/** Splits `[[bracketed]]` passages in body copy into censor bars. */
export function withRedactions(text) {
  const out = [];
  let last = 0;
  let match;

  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(<Redacted key={`${match.index}-${match[1].length}`}>{match[1]}</Redacted>);
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
