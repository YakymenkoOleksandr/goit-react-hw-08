import css from './Contact.module.css'
import { BsPersonFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
export default function Contact({ contact, deleteContact }) {
    
    return (
        <div className={css.contactsList}>
            <ul className={css.info}>
                <li className={css.person}><BsPersonFill />   {contact.name} </li>
                <li className={css.phone}><FaPhoneAlt />   {contact.number}   </li>
            </ul>
            <button className={css.btn} onClick={() => deleteContact(contact.id)}>Delete</button>
        </div>
    );
}