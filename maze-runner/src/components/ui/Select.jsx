import styles from "../../styles/Select.module.css";

export default function Select({ label, value, onChange, children }) {
  return (
    <div className={styles.field}>
      {label && <label>{label}</label>}
      <select value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}
