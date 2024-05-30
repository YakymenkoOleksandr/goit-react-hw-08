
import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations.js';
import { useState } from 'react';
import css from './EditContact.module.css';

export default function EditContact ({ contact, onClose }) {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContact({ id: contact.id, name, number }));
    onClose();
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <form onSubmit={handleSubmit} className={css.form}>
          <label className={css.label}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={css.input}
            />
          </label>
          <label className={css.label}>
            Number:
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={css.input}
            />
          </label>
          <button type="submit" className={css.btn}>Save</button>
          <button type="button" onClick={onClose} className={css.btn}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
