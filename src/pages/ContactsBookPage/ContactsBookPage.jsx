import css from './ContactsBookPage.module.css';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import ContactList from '../../components/ContactList/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {addContact, deleteContact, fetchContacts} from "../../redux/contacts/operations.js"
import {selectContacts, selectIsLoading, selectError} from "../../redux/contacts/selectors.js"
import {selectNameFilter} from "../../redux/filters/selectors.js"
import { setNameFilter } from "../../redux/filters/slise.js"

export default function ContactsBookPage() {

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = contacts.filter(contact => {
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
        addContact={(name, number) =>
          dispatch(addContact({ name, number }))
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
