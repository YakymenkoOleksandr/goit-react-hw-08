import ContactForm from '../ContactForm/ContactForm.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import css from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from '../../redux/contactsSlice';
import { selectNameFilter, setNameFilter } from '../../redux/filtersSlice.js';
import { useEffect } from 'react';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from '../../redux/contactsOps.js';

export default function App() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = contacts.filter(contact => {
    // Перевірка структури об'єкта
    if (!contact || typeof contact.name !== 'string') {
      console.error('Invalid contact structure:', contact);
      return false;
    }
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <h1 className={css.nameOfApp}>Phonebook </h1>
      <ContactForm
        addContact={(name, phoneNumber) =>
          dispatch(addContact({ name, phoneNumber }))
        }
      />
      <SearchBox
        filter={filter}
        setFilter={value => dispatch(setNameFilter(value))}
      />
      {isLoading && !error && <p className={css.loading}>Loading...</p>}
      <ContactList
        contacts={visibleContacts}
        deleteContact={contactId => dispatch(deleteContact(contactId))}
      />
    </>
  );
}
