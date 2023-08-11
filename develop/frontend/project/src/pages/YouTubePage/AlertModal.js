import React from 'react';
import Modal from 'react-modal';
import styles from './AlertModal.module.css';

const AlertModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles['modal-content']}
      overlayClassName={styles['modal-overlay']}
    >
      <div className={styles['modal-body']}>
        <h2>⚠️알림⚠️</h2>
        <p>{message}</p>
        <div className={styles['modal-button-container']}>
          <button className={styles['modal-check-button']} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AlertModal;
