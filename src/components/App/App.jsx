import ContactForm from '../ContactForm/ContactForm.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import css from './App.module.css';
// Імпортуємо екшени та селектори
import { useSelector, useDispatch } from 'react-redux';
import {
  addContact,
  deleteContact,
  selectContacts,
} from '../../redux/contactsSlice';
import { setNameFilter, selectNameFilter } from '../../redux/filtersSlice';
import * as yup from 'yup';

export default function App() {
  // Використовуємо селектори для доступу до стану
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  // Фільтруємо контакти згідно з фільтром
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  // Валідація форми
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must not exceed 50 characters'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .min(3, 'Phone number must be at least 3 characters')
      .max(50, 'Phone number must not exceed 50 characters'),
  });

  return (
    <>
      <h1 className={css.nameOfApp}>Phonebook </h1>
      <ContactForm
        addContact={(name, phoneNumber) =>
          dispatch(addContact(name, phoneNumber))
        }
        validationSchema={validationSchema}
      />
      <SearchBox
        filter={filter}
        setFilter={value => dispatch(setNameFilter(value))}
      />
      <ContactList
        contacts={visibleContacts}
        deleteContact={contactId => dispatch(deleteContact(contactId))}
      />
    </>
  );
}
