import { useReveal } from '../hooks/useReveal';

/**
 * Headline concealed under a solid block that peels away horizontally,
 * like redaction tape being lifted off the page.
 */
export default function RedactionWipe({
  as: Tag = 'span',
  children,
  delay = 0,
  className = '',
  ...rest
}) {
  const [ref, shown] = useReveal({ delay });

  return (
    <Tag
      ref={ref}
      className={`wipe${shown ? ' is-lifted' : ''}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      <span className="wipe__text">{children}</span>
      <span className="wipe__tape" aria-hidden="true" />
    </Tag>
  );
}
