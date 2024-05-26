import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import css from './Contact.module.css';
import { BsPersonFill } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(contact.id));

  return (
    <div className={css.contactsList}>
      <ul className={css.info}>
        <li className={css.person}>
          <BsPersonFill /> {contact.name}
        </li>
        <li className={css.phone}>
          <FaPhoneAlt /> {contact.phoneNumber || contact.number}
        </li>
      </ul>
      <button className={css.btn} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
