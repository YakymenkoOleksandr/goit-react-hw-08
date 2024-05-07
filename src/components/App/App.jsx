import ContactForm from '../ContactForm/ContactForm.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';
import ContactList from '../ContactList/ContactList.jsx';
import initialsContacts from './ContactList.json';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
export default function App() {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : initialsContacts;
  });
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <h1>Phonebook </h1>
      <ContactForm
        addContact={addContact}
        validationSchema={validationSchema}
      />
      <SearchBox filter={filter} setFilter={setFilter} />
      <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
    </>
  );
}
