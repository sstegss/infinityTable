import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

import iconClose from "./icon-close.svg";
import Form from "../Form/Form";

function Modal() {
  const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (modalInfoIsOpen) {
      setIsMounted(true);
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
  }, [modalInfoIsOpen]);

  const handleClose = () => {
    setIsMounted(false);
    setTimeout(() => setModalInfoIsOpen(false), 300);
  };
  const onWrapperClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  return (
    <>
      <button
        className={styles.addData}
        onClick={() => setModalInfoIsOpen(true)}
      >
        add data
      </button>
      {modalInfoIsOpen && (
        <div
          className={`${styles.modal} ${
            isMounted ? styles["modal-entered"] : ""
          }`}
        >
          <div className={styles.modalWrapper} onClick={onWrapperClick}>
            <div className={styles.modalContent}>
              <button className={styles.modalCloseButton}>
                <img src={iconClose} alt="X" onClick={() => handleClose()} />
              </button>
              <Form/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
