import css from './ModalWindowForApproveDeleting.module.css';

export default function ModalWindowForApproveDeleting  ({ show, onClose, onConfirm, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <div className={css.modalContent}>
          <p>{message}</p>
          <button className={css.btn} onClick={onConfirm}>Yes</button>
          <button className={css.btn} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

 