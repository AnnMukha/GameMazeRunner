import React from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/ModalBase.module.css";

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("modal-root")
  );
}
