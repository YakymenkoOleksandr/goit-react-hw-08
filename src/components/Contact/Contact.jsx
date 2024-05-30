import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations.js';
import css from './Contact.module.css';
import { BsPersonFill } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import ModalWindowForApproveDeleting from '../ModalWindowForApproveDeleting/ModalWindowForApproveDeleting';
import EditContact from '../EditContact/EditContact';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(contact.id));
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className={css.contactsList}>
      <ul className={css.info}>
        <li className={css.person}>
          <BsPersonFill /> {contact.name}
        </li>
        <li className={css.phone}>
          <FaPhoneAlt /> {contact.number}
        </li>
      </ul>
      <ul className={css.buttons}>
        <li>
          <button className={css.btn} onClick={handleEdit}>
            Edit
          </button>
        </li>
        <li>
          <button className={css.btn} onClick={handleDelete}>
            Delete
          </button>
        </li>
      </ul>

      <ModalWindowForApproveDeleting
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this contact?"
      />
      {showEditModal && (
        <EditContact contact={contact} onClose={handleCloseEditModal} />
      )}
    </div>
  );
}
