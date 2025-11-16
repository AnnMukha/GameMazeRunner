import styles from "../styles/Button.module.css";

export default function Button({ icon, text, onClick }) {
  return (
    <button className={styles.btnRunic} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
}
