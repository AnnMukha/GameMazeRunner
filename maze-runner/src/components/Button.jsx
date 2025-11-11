export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#00bcd4',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px'
      }}
    >
      {text}
    </button>
  );
}
