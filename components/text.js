import styles from '../styles/post.module.css';

export default function Text({ title }) {
  if (!title) {
    return null;
  }
  return title.map((value, index) => {
    if (!value) return null;

    const {
      annotations = {}, text, plain_text: plainText, href,
    } = value;
    const {
      bold, code, color, italic, strikethrough, underline,
    } = annotations;

    const content = text?.content ?? plainText ?? '';
    const link = text?.link?.url ?? href ?? null;

    return (
      <span
        className={[
          bold ? styles.bold : '',
          code ? styles.code : '',
          italic ? styles.italic : '',
          strikethrough ? styles.strikethrough : '',
          underline ? styles.underline : '',
        ].join(' ')}
        style={color && color !== 'default' ? { color } : {}}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      >
        {link ? <a href={link}>{content}</a> : content}
      </span>
    );
  });
}
