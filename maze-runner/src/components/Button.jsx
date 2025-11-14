export default function Button({ text, onClick }) {
  return (
    <button className="btn-runic" onClick={onClick}>
      <span className="btn-runic__text">{text}</span>
    </button>
  );
}

